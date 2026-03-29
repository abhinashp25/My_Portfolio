import { callAIEndpoint } from './aiClient';

const ENDPOINT = '/api/ai/chat-completion';
const STREAM_TIMEOUT_MS = 35000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

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
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await streamWithTimeout(
        provider,
        model,
        messages,
        onChunk,
        onComplete,
        parameters
      );
      return; // Success
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Stream attempt ${attempt}/${MAX_RETRIES} failed:`, lastError.message);

      const isAbort = error instanceof Error && error.name === 'AbortError';
      const isServerError = error instanceof Error && (error.message.includes('500') || error.message.includes('HTTP'));

      // Retry on abort (timeout) or server errors, but not on final attempt
      if ((isAbort || isServerError) && attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * attempt;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // No retry left or non-retryable error
      if (isAbort) {
        onError(new Error('AI service is currently unavailable. Please try again in a moment.'));
      } else {
        onError(lastError);
      }
      return;
    }
  }

  // Fallback error if all retries exhausted
  if (lastError) {
    onError(lastError);
  }
}

async function streamWithTimeout(
  provider: string,
  model: string,
  messages: object[],
  onChunk: (chunk: any) => void,
  onComplete: () => void,
  parameters: object = {}
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

  try {
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
    let completed = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;

        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'chunk' && data.chunk) {
            onChunk(data.chunk);
          } else if (data.type === 'done') {
            completed = true;
            onComplete();
          } else if (data.type === 'error') {
            throw new Error(data.error || 'API error');
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }

    // Handle trailing buffer
    if (buffer.startsWith('data: ')) {
      try {
        const data = JSON.parse(buffer.slice(6));
        if (data.type === 'done') {
          completed = true;
        }
      } catch {
        // Ignore
      }
    }

    if (!completed) {
      onComplete();
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
