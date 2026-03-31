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
            <span className="text-white">Next</span><span className="text-blue-500">Body</span>
          </span>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-600/10 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Only 200 free spots available
          </span>
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
        <p className="text-center text-white/50 text-base leading-relaxed mb-10 max-w-sm mx-auto">
          AI analyzes your current body and shows your future transformation — before you even start.
        </p>

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
