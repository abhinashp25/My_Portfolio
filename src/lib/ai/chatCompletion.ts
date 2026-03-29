import { callAIEndpoint } from './aiClient';

const ENDPOINT = '/api/ai/chat-completion';
const STREAM_TIMEOUT_MS = 35000;

export async function getChatCompletion(
  provider: string,
  model: string,
  messages: object[],
  parameters: object = {}
) {
  return callAIEndpoint(ENDPOINT, {
    provider,
    model,
    messages,
    stream: false,
    parameters,
  });
}

export async function getStreamingChatCompletion(
  provider: string,
  model: string,
  messages: object[],
  onChunk: (chunk: any) => void,
  onComplete: () => void,
  onError: (error: Error) => void,
  parameters: object = {}
) {
  let completed = false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model, messages, stream: true, parameters }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `HTTP error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Response body is not readable');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'chunk' && data.chunk) {
              onChunk(data.chunk);
            } else if (data.type === 'done') {
              completed = true;
              onComplete();
            }
            else if (data.type === 'error') {
              console.error('API Route Error:', {
                error: data.error,
                details: data.details,
              });
              onError(new Error(data.error));
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }

    // Handle a final SSE line if it did not end with a trailing newline.
    if (buffer.startsWith('data: ')) {
      try {
        const data = JSON.parse(buffer.slice(6));
        if (data.type === 'done') {
          completed = true;
          onComplete();
        }
      } catch {
        // Ignore trailing invalid JSON.
      }
    }

    if (!completed) {
      completed = true;
      onComplete();
    }
  } catch (error) {
    console.error('Streaming error:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      onError(new Error('Request timed out while waiting for AI response. Please try again.'));
      return;
    }

    onError(error instanceof Error ? error : new Error('Streaming error'));
  }
}
