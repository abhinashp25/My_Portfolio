import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['abhinashpradhan7658@gmail.com'],
      replyTo: email,
      subject: `📬 New message from ${name} — Portfolio`,
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
                <p style="color: white; font-size: 15px; font-weight: 600; margin: 0;">${name}</p>
              </div>
              <div style="flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 16px;">
                <p style="color: rgba(255,255,255,0.45); font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Reply To</p>
                <p style="color: #818cf8; font-size: 13px; font-weight: 500; margin: 0; word-break: break-all;">${email}</p>
              </div>
            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.45); font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Message</p>
              <p style="color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <a href="mailto:${email}?subject=Re: Your message&body=Hi ${name},%0D%0A%0D%0A" 
               style="display: block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-align: center; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: 0.2px;">
              Reply to ${name}
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
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
