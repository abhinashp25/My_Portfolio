import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend is initialized lazily so the server doesn't crash if key is absent
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 1) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const safeName = name.trim().slice(0, 200);
    const safeEmail = email.trim().slice(0, 200);
    const safeMessage = message.trim().slice(0, 4000);

    // ── Send via Resend ───────────────────────────────────────────────────────
    const resend = getResend();

    const { data, error } = await resend.emails.send({
      // onboarding@resend.dev is Resend's sandbox sender — works without a
      // verified domain, but the "to" address must be the account owner's
      // verified email in test mode.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['abhinashpradhan7658@gmail.com'],
      replyTo: safeEmail,
      subject: `📬 New message from ${safeName} — Portfolio`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; background: #0f0f12; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
          
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%); padding: 32px 32px 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">New Contact Message</h1>
            <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0; font-size: 13px;">From your portfolio contact form</p>
          </div>

          <div style="padding: 28px 32px;">
            
            <div style="display: flex; gap: 12px; margin-bottom: 20px;">
              <div style="flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 16px;">
                <p style="color: rgba(255,255,255,0.45); font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">From</p>
                <p style="color: white; font-size: 15px; font-weight: 600; margin: 0;">${safeName}</p>
              </div>
              <div style="flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 16px;">
                <p style="color: rgba(255,255,255,0.45); font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Reply To</p>
                <p style="color: #818cf8; font-size: 13px; font-weight: 500; margin: 0; word-break: break-all;">${safeEmail}</p>
              </div>
            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.45); font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Message</p>
              <p style="color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${safeMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>

            <a href="mailto:${safeEmail}?subject=Re: Your message&body=Hi ${encodeURIComponent(safeName)},%0D%0A%0D%0A" 
               style="display: block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-align: center; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: 0.2px;">
              Reply to ${safeName}
            </a>
          </div>

          <div style="padding: 16px 32px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="color: rgba(255,255,255,0.25); font-size: 11px; font-family: monospace; margin: 0;">
              Abhinash Pradhan · Portfolio · abhinashpradhan7658@gmail.com
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend] email send error:', JSON.stringify(error));
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 502 },
      );
    }

    console.log('[Resend] email sent successfully, id:', data?.id);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Contact API] error:', message);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 },
    );
  }
}
