import { useState } from 'react'
import type { FormEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import type { AuthResult } from '../hooks/useParentAuth'

interface ParentLoginProps {
  open: boolean
  onClose: () => void
  user: User | null
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

export function ParentLogin({ open, onClose, user, signIn, signUp, signOut }: ParentLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (!open) return null

  async function submit(action: 'signin' | 'signup') {
    setBusy(true)
    setMessage(null)
    const { error } = action === 'signin' ? await signIn(email, password) : await signUp(email, password)
    if (error) {
      setMessage(error.message)
    } else {
      setPassword('')
      setMessage(action === 'signup' ? 'Account created! Your child\u2019s progress will now save to the cloud.' : null)
    }
    setBusy(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    void submit('signin')
  }

  async function handleSignOut() {
    setBusy(true)
    await signOut()
    setBusy(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Parent login"
      onClick={onClose}
    >
      <div className="card-chunky animate-pop-in w-full max-w-md rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold text-ink">🔒 For Parents</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-bounce card-chunky tap-target flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-extrabold text-ink"
            aria-label="Close parent login"
          >
            ✕
          </button>
        </div>

        {user ? (
          <div className="mt-4 text-center">
            <p className="font-medium text-ink">
              Signed in as <strong>{user.email}</strong>
            </p>
            <p className="mt-1 text-sm font-medium text-ink-soft">
              Your child&apos;s Super-Stars save to this account on every device.
            </p>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={busy}
              className="btn-bounce tap-target mt-5 rounded-full px-8 py-3 font-display text-lg font-extrabold text-white shadow-btn"
              style={{ backgroundColor: 'var(--coral)' }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <label className="block">
              <span className="font-display text-sm font-bold text-ink">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tap-target mt-1 w-full rounded-2xl border-2 border-borderline bg-surface px-4 py-3 font-body text-base font-medium text-ink outline-none focus:border-grape"
                placeholder="parent@example.com"
              />
            </label>
            <label className="block">
              <span className="font-display text-sm font-bold text-ink">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tap-target mt-1 w-full rounded-2xl border-2 border-borderline bg-surface px-4 py-3 font-body text-base font-medium text-ink outline-none focus:border-grape"
                placeholder="••••••••"
              />
            </label>
            {message && (
              <p className="rounded-2xl bg-coral-soft px-4 py-2 text-sm font-semibold text-ink">{message}</p>
            )}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={busy}
                className="btn-bounce tap-target flex-1 rounded-full px-6 py-3 font-display text-lg font-extrabold text-white shadow-btn"
                style={{ backgroundColor: 'var(--mint)' }}
              >
                Sign in
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void submit('signup')}
                className="btn-bounce tap-target flex-1 rounded-full px-6 py-3 font-display text-lg font-extrabold text-white shadow-btn"
                style={{ backgroundColor: 'var(--grape)' }}
              >
                Create account
              </button>
            </div>
            <p className="text-center text-xs font-medium text-ink-soft">
              No child names or photos are collected — only completed lessons and stars.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
