'use client';

import { useState, useCallback } from 'react';
import { getChatCompletion, getStreamingChatCompletion } from '@/lib/ai/chatCompletion';

export function useChat(provider: string, model: string, streaming: boolean = true) {
  const [response, setResponse] = useState('');
  const [fullResponse, setFullResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    async (messages: object[], parameters: object = {}) => {
      setResponse('');
      setFullResponse(streaming ? [] : null);
      setIsLoading(true);
      setError(null);

      try {
        if (streaming) {
          let hasVisibleContent = false;

          await getStreamingChatCompletion(
            provider,
            model,
            messages,
            (chunk) => {
              setFullResponse((prev: any[]) => [...prev, chunk]);
              const content = chunk?.choices?.[0]?.delta?.content;
              const reasoning = chunk?.choices?.[0]?.delta?.reasoning_content;

              if (content) {
                hasVisibleContent = true;
                setResponse((prev) => prev + content);
              } else if (!hasVisibleContent && reasoning) {
                // If the model emits only reasoning tokens, show them so the user sees progress.
                setResponse((prev) => prev + reasoning);
              }
            },
            () => {
              setResponse((prev) => (prev.trim() ? prev : 'I could not generate a response this time. Please try again.'));
              setIsLoading(false);
            },
            (err) => {
              setError(err);
              setIsLoading(false);
            },
            parameters
          );
        } else {
          const result = await getChatCompletion(provider, model, messages, parameters);
          setFullResponse(result);
          setResponse(result?.choices?.[0]?.message?.content || '');
          setIsLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    },
    [provider, model, streaming]
  );

  return { response, fullResponse, isLoading, error, sendMessage };
}
