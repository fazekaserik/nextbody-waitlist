'use client'

import { useState } from 'react'
import WaitlistForm from './WaitlistForm'

interface Props {
  signupCount: number
  totalSpots: number
}

export default function WaitlistPage({ signupCount: initialCount, totalSpots }: Props) {
  const [signupCount, setSignupCount] = useState(initialCount)

  const progressPct = Math.min((signupCount / totalSpots) * 100, 100)

  const handleSubmitSuccess = () => {
    setSignupCount((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <span
            className="text-2xl font-black tracking-[0.15em] uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.18em' }}
          >
            <span className="text-white">Next</span><span className="text-white">Body</span>
          </span>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 100%)',
              border: '1px solid rgba(99,130,246,0.35)',
              boxShadow: '0 0 18px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ background: 'linear-gradient(90deg, #93c5fd, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Launching Soon · Apply For Free Access Now
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="text-center text-4xl sm:text-5xl font-black leading-[1.08] tracking-tight mb-5"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          SEE YOUR BODY
          <br />
          <span className="text-blue-500">IN 3 MONTHS</span>
          <br />
          FROM NOW
        </h1>

        {/* Subtext */}
        <div className="mb-10 max-w-md mx-auto space-y-2.5">
          {[
            'AI analyzes your body and gives you a personalized workout & diet plan',
            'Rates your physique potential and shows exactly what you can achieve',
            'Generates your future transformation at 1, 3 and 6 months — before you even start',
          ].map((line) => (
            <div key={line} className="flex items-start gap-2.5">
              <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full bg-blue-600/20 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-white/55 text-sm leading-relaxed">{line}</p>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 sm:p-8">
          {/* Slot counter */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Spots taken</span>
              <span className="text-white text-sm font-semibold tabular-nums">
                {signupCount} <span className="text-white/30">/ {totalSpots}</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-white/25 text-xs mt-2 text-right">
              {totalSpots - signupCount} spots remaining
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mb-7" />

          {/* Form */}
          <WaitlistForm onSubmitSuccess={handleSubmitSuccess} />
        </div>

        {/* Footer note */}
        <p className="text-center text-white/20 text-xs mt-6">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </main>
  )
}
