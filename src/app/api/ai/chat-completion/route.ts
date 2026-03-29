import { NextRequest, NextResponse } from 'next/server';
import { completion } from '@rocketnew/llm-sdk';
import OpenAI from 'openai';

const API_KEYS: Record<string, string | undefined> = {
  OPEN_AI: process.env.OPENAI_API_KEY,
  ANTHROPIC: process.env.ANTHROPIC_API_KEY,
  GEMINI: process.env.GEMINI_API_KEY,
  PERPLEXITY: process.env.PERPLEXITY_API_KEY,
  NVIDIA: process.env.NVIDIA_API_KEY,
};

const NVIDIA_BASE_URL = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';

const PORTFOLIO_DATA = `
Abhinash is a Full Stack Developer & AI/ML Enthusiast from India.
Skills: Python, TypeScript, React, Next.js, Node.js, ML.
Contact: Connect via the 'Contact' section below or visit github.com/abhinashp25!
`;

const TIMEOUT_FALLBACK_MESSAGE = `I am currently experiencing high traffic and operating in offline mode. \n\nHere is a quick overview:\n${PORTFOLIO_DATA}`;

function isTimeoutError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.toLowerCase().includes('timeout');
}

function formatErrorResponse(error: unknown, provider?: string) {
  const statusCode = (error as any)?.statusCode || (error as any)?.status || 500;
  const providerName = (error as any)?.llmProvider || provider || 'Unknown';
  const message = error instanceof Error ? error.message : String(error);

  let userMessage = `${providerName.toUpperCase()} API error: ${statusCode}`;
  if (message.toLowerCase().includes('timeout')) {
    userMessage = 'Request timeout - service is temporarily slow';
  }

  return {
    error: userMessage,
    details: message,
    statusCode,
  };
}

export async function POST(request: NextRequest) {
  let body: any = {};

  try {
    body = await request.json();
    const { provider, model, messages, stream = false, parameters = {} } = body;
    const normalizedProvider = String(provider || '').toUpperCase();

    if (!provider || !model || !messages?.length) {
      return NextResponse.json(
        { error: 'Missing required fields: provider, model, messages', details: 'Request validation failed' },
        { status: 400 }
      );
    }

    const apiKey = API_KEYS[normalizedProvider];
    if (!apiKey) {
      return NextResponse.json(
        { error: `${normalizedProvider} API key is not configured`, details: 'The API key for this provider is missing in environment variables' },
        { status: 400 }
      );
    }

    if (normalizedProvider === 'NVIDIA') {
      const client = new OpenAI({
        apiKey,
        baseURL: NVIDIA_BASE_URL,
        timeout: 30000,
        maxRetries: 0,
      });

      if (stream) {
        const response = (await client.chat.completions.create({
          model,
          messages,
          stream: true,
          ...parameters,
        })) as unknown as AsyncIterable<unknown>;

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
          async start(controller) {
            try {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start' })}\n\n`));

              for await (const chunk of response) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'chunk', chunk })}\n\n`));
              }

              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
              controller.close();
            } catch (error) {
              const formatted = formatErrorResponse(error, normalizedProvider);
              console.error('API Route Error:', { error: formatted.error, details: formatted.details });

              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: 'chunk',
                    chunk: {
                      choices: [{ delta: { content: TIMEOUT_FALLBACK_MESSAGE } }],
                    },
                  })}\n\n`
                )
              );
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
              controller.close();
            }
          },
        });

        return new NextResponse(readable, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        });
      }

      try {
        const response = await client.chat.completions.create({
          model,
          messages,
          stream: false,
          ...parameters,
        });

        return NextResponse.json(response);
      } catch (error) {
        const formatted = formatErrorResponse(error, normalizedProvider);
        console.error('API Route Error:', { error: formatted.error, details: formatted.details });

        return NextResponse.json({
          id: 'fallback-timeout',
          object: 'chat.completion',
          created: Math.floor(Date.now() / 1000),
          model,
          choices: [
            {
              index: 0,
              message: { role: 'assistant', content: TIMEOUT_FALLBACK_MESSAGE },
              finish_reason: 'stop',
            },
          ],
        });
      }
    }

    if (stream) {
      const response = await completion({
        model,
        messages,
        stream: true,
        api_key: apiKey,
        ...parameters,
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start' })}\n\n`));

            for await (const chunk of response as unknown as AsyncIterable<unknown>) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'chunk', chunk })}\n\n`));
            }

            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
            controller.close();
          } catch (error) {
            const formatted = formatErrorResponse(error, normalizedProvider);
            console.error('API Route Error:', { error: formatted.error, details: formatted.details });
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: formatted.error, details: formatted.details })}\n\n`));
            controller.close();
          }
        },
      });

      return new NextResponse(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    const response = await completion({
      model,
      messages,
      stream: false,
      api_key: apiKey,
      ...parameters,
    });

    return NextResponse.json(response);
  } catch (error) {
    const formatted = formatErrorResponse(error, body?.provider);
    console.error('API Route Error:', { error: formatted.error, details: formatted.details });
    return NextResponse.json(
      { error: formatted.error, details: formatted.details },
      { status: formatted.statusCode }
    );
  }
}
