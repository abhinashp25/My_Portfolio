import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// ─── Provider API Keys ────────────────────────────────────────────────────────
const GROQ_API_KEY    = process.env.GROQ_API_KEY ?? '';
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY ?? '';
const NVIDIA_API_KEY  = process.env.NVIDIA_API_KEY ?? '';
const OPENAI_API_KEY  = process.env.OPENAI_API_KEY ?? '';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY ?? '';

// ─── Fallback message ─────────────────────────────────────────────────────────
const FALLBACK = `I'm in offline mode right now, but here's a quick overview:
Abhinash Pradhan — Full Stack Developer & AI/ML Enthusiast from India.
Skills: React, Next.js, TypeScript, Node.js, Python, TensorFlow, MongoDB.
GitHub: github.com/abhinashp25 | Feel free to explore the portfolio sections!`;

// ─── Build an OpenAI-compatible client per provider ───────────────────────────
function buildClient(provider: string): { client: OpenAI; apiKey: string } | null {
  switch (provider) {
    case 'GROQ':
      if (!GROQ_API_KEY) return null;
      return {
        apiKey: GROQ_API_KEY,
        client: new OpenAI({
          apiKey: GROQ_API_KEY,
          baseURL: 'https://api.groq.com/openai/v1',
          timeout: 45_000,
          maxRetries: 1,
        }),
      };

    case 'GEMINI':
      if (!GEMINI_API_KEY) return null;
      return {
        apiKey: GEMINI_API_KEY,
        client: new OpenAI({
          apiKey: GEMINI_API_KEY,
          baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai',
          timeout: 25_000,
          maxRetries: 0,
        }),
      };

    case 'NVIDIA':
      if (!NVIDIA_API_KEY) return null;
      return {
        apiKey: NVIDIA_API_KEY,
        client: new OpenAI({
          apiKey: NVIDIA_API_KEY,
          baseURL: process.env.NVIDIA_BASE_URL ?? 'https://integrate.api.nvidia.com/v1',
          timeout: 30_000,
          maxRetries: 0,
        }),
      };

    case 'OPEN_AI':
      if (!OPENAI_API_KEY) return null;
      return {
        apiKey: OPENAI_API_KEY,
        client: new OpenAI({ apiKey: OPENAI_API_KEY, timeout: 30_000, maxRetries: 0 }),
      };

    case 'DEEPSEEK':
      if (!DEEPSEEK_API_KEY) return null;
      return {
        apiKey: DEEPSEEK_API_KEY,
        client: new OpenAI({
          apiKey: DEEPSEEK_API_KEY,
          baseURL: 'https://api.deepseek.com/v1',
          timeout: 30_000,
          maxRetries: 0,
        }),
      };

    default:
      return null;
  }
}

// ─── SSE Helpers ──────────────────────────────────────────────────────────────
const enc = new TextEncoder();
const sse = (data: object) => enc.encode(`data: ${JSON.stringify(data)}\n\n`);

const sseHeaders = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache, no-transform',
  'Connection': 'keep-alive',
  'X-Accel-Buffering': 'no',
};

// ─── Build an instant fallback SSE stream ─────────────────────────────────────
function fallbackStream(): NextResponse {
  const stream = new ReadableStream({
    start(ctrl) {
      ctrl.enqueue(sse({ type: 'start' }));
      ctrl.enqueue(sse({ type: 'chunk', chunk: { choices: [{ delta: { content: FALLBACK } }] } }));
      ctrl.enqueue(sse({ type: 'done' }));
      ctrl.close();
    },
  });
  return new NextResponse(stream, { headers: sseHeaders });
}

interface ChatRequest {
  provider?: string;
  model?: string;
  messages?: any[];
  stream?: boolean;
  parameters?: {
    max_tokens?: number;
    temperature?: number;
  };
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    provider = '',
    model = '',
    messages = [],
    stream = true,
    parameters = {},
  } = body;

  const P = String(provider).toUpperCase();

  if (!P || !model || !messages.length) {
    return NextResponse.json({ error: 'Missing provider, model, or messages' }, { status: 400 });
  }

  const built = buildClient(P);
  if (!built) {
    return NextResponse.json(
      { error: `Provider "${P}" is not configured or API key is missing.` },
      { status: 400 }
    );
  }

  const { client } = built;
  const params = {
    model,
    messages,
    max_tokens: parameters?.max_tokens ?? 350,
    temperature: parameters?.temperature ?? 0.7,
  };

  // ── Streaming path ────────────────────────────────────────────────────────
  if (stream) {
    let openaiStream: AsyncIterable<any>;

    try {
      openaiStream = (await client.chat.completions.create({
        ...params,
        stream: true,
      })) as AsyncIterable<any>;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[${P}] Stream setup failed:`, errorMsg);
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    const readable = new ReadableStream({
      async start(ctrl) {
        ctrl.enqueue(sse({ type: 'start' }));
        try {
          for await (const chunk of openaiStream) {
            ctrl.enqueue(sse({ type: 'chunk', chunk }));
          }
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error(`[${P}] Mid-stream error:`, errorMsg);
        }
        ctrl.enqueue(sse({ type: 'done' }));
        ctrl.close();
      },
      cancel() {
        console.warn(`[${P}] Client cancelled stream.`);
      }
    });

    return new NextResponse(readable, { headers: sseHeaders });
  }

  // ── Non-streaming path ────────────────────────────────────────────────────
  try {
    const result = await client.chat.completions.create({ ...params, stream: false });
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[${P}] Non-stream error:`, errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
