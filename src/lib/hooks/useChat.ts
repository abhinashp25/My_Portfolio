'use client';

import { useState, useCallback, useRef } from 'react';
import { getChatCompletion, getStreamingChatCompletion } from '@/lib/ai/chatCompletion';

export function useChat(provider: string, modelOrModels: string | string[], streaming: boolean = true) {
  const [response, setResponse] = useState('');
  const [fullResponse, setFullResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const activeRequestRef = useRef<symbol | null>(null);

  const sendMessage = useCallback(
    async (messages: object[], parameters: object = {}) => {
      setResponse('');
      setFullResponse(streaming ? [] : null);
      setIsLoading(true);
      setError(null);

      const models = Array.isArray(modelOrModels) ? modelOrModels : [modelOrModels];
      const requestId = Symbol('request');
      activeRequestRef.current = requestId;

      let winnerFound = false;
      let completedCount = 0;
      let errors: Error[] = [];

      try {
        if (streaming) {
          const runModel = async (model: string) => {
            let hasVisibleContent = false;
            
            await getStreamingChatCompletion(
              provider,
              model,
              messages,
              (chunk) => {
                if (activeRequestRef.current !== requestId) return;
                if (!winnerFound) winnerFound = true; // First to chunk wins

                setFullResponse((prev: any) => Array.isArray(prev) ? [...prev, chunk] : [chunk]);
                const content = chunk?.choices?.[0]?.delta?.content;
                const reasoning = chunk?.choices?.[0]?.delta?.reasoning_content;

                if (content) {
                  hasVisibleContent = true;
                  setResponse((prev) => prev + content);
                } else if (!hasVisibleContent && reasoning) {
                  setResponse((prev) => prev + reasoning);
                }
              },
              () => {
                if (activeRequestRef.current !== requestId) return;
                completedCount++;
                if (winnerFound || completedCount === models.length) {
                  setResponse((prev) => (prev.trim() ? prev : 'I could not generate a response this time. Please try again.'));
                  setIsLoading(false);
                  activeRequestRef.current = null;
                }
              },
              (err) => {
                if (activeRequestRef.current !== requestId) return;
                errors.push(err);
                completedCount++;
                if (completedCount === models.length && !winnerFound) {
                  setError(errors[0] || new Error('All models failed.'));
                  setIsLoading(false);
                  activeRequestRef.current = null;
                }
              },
              parameters
            );
          };

          // Race all models
          models.forEach(runModel);

        } else {
          try {
            // Race standard JSON completions
            const result = await Promise.any(
              models.map(m => getChatCompletion(provider, m, messages, parameters))
            );
            if (activeRequestRef.current === requestId) {
              setFullResponse(result);
              setResponse(result?.choices?.[0]?.message?.content || '');
              setIsLoading(false);
              activeRequestRef.current = null;
            }
          } catch (aggErr) {
            if (activeRequestRef.current === requestId) {
              setError(new Error('All models failed to respond.'));
              setIsLoading(false);
              activeRequestRef.current = null;
            }
          }
        }
      } catch (err) {
        if (activeRequestRef.current === requestId) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoading(false);
          activeRequestRef.current = null;
        }
      }
    },
    [provider, modelOrModels, streaming]
  );

  return { response, fullResponse, isLoading, error, sendMessage };
}
