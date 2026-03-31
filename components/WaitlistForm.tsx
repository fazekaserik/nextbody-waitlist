'use client'

import { useState } from 'react'

type Goal = 'fat_loss' | 'muscle_gain'
type Gender = 'male' | 'female'
type Step = 1 | 2 | 'success'

interface Props {
  onSubmitSuccess: () => void
}

export default function WaitlistForm({ onSubmitSuccess }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [email, setEmail] = useState('')
  const [goal, setGoal] = useState<Goal | null>(null)
  const [gender, setGender] = useState<Gender | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!goal || !gender) {
      setError('Please select your goal and gender.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, goal, gender }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
      } else {
        onSubmitSuccess()
        setStep('success')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          You&apos;re on the list!
        </h3>
        <p className="text-white/60 text-sm">
          We&apos;ll notify you at <span className="text-white font-medium">{email}</span> when your spot is ready.
        </p>
      </div>
    )
  }

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleStep1} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ colorScheme: 'dark' }}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#03ac13] focus:ring-1 focus:ring-[#03ac13] transition-colors text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap text-sm cursor-pointer"
          >
            Get early access →
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-medium">Your goal</p>
            <div className="grid grid-cols-2 gap-3">
              {(['fat_loss', 'muscle_gain'] as Goal[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`py-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    goal === g
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {g === 'fat_loss' ? 'Fat Loss' : 'Muscle Gain'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-medium">Gender</p>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    gender === g
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {g === 'male' ? 'Male' : 'Female'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !goal || !gender}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm cursor-pointer"
          >
            {loading ? 'Joining…' : 'Join the waitlist →'}
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-white/30 hover:text-white/60 text-xs transition-colors cursor-pointer"
          >
            ← Back
          </button>
        </form>
      )}

      {error && (
        <p className="mt-3 text-red-400 text-xs text-center">{error}</p>
      )}
    </div>
  )
}
