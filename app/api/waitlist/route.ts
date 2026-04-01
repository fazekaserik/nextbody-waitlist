import { NextRequest, NextResponse } from 'next/server'
import { supabase, WaitlistEntry } from '@/lib/supabase'

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
