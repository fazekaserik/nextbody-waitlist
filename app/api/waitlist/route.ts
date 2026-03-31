import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase, WaitlistEntry } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)
const notificationEmail = process.env.NOTIFICATION_EMAIL!

export async function POST(req: NextRequest) {
  const body: WaitlistEntry = await req.json()
  const { email, goal, gender } = body

  if (!email || !goal || !gender) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await supabase
    .from('waitlist')
    .insert([{ email, goal, gender }])

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }

  await resend.emails.send({
    from: 'NextBody Waitlist <onboarding@resend.dev>',
    to: notificationEmail,
    subject: `New waitlist signup: ${email}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 16px;font-size:20px;">🎉 New Waitlist Signup</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#666;width:80px;">Email</td>
            <td style="padding:10px 0;font-weight:600;">${email}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#666;">Goal</td>
            <td style="padding:10px 0;font-weight:600;">${goal === 'fat_loss' ? 'Fat Loss' : 'Muscle Gain'}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#666;">Gender</td>
            <td style="padding:10px 0;font-weight:600;">${gender === 'male' ? 'Male' : 'Female'}</td>
          </tr>
        </table>
      </div>
    `,
  })

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ count: 0 }, { status: 200 })
  }

  return NextResponse.json({ count: count ?? 0 })
}
