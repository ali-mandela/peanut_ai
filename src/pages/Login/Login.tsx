import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom' 
import { requestPermission } from '../../services/notifications'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

const handleLogin = async () => {
  setError('')
  if (!email || !password) {
    setError('Email and password are required.')
    return
  }
  try {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
    await requestPermission()
    navigate('/dashboard')
    //ts-ignore
  } catch {
    setError('Invalid email or password.')
    setLoading(false)
  } finally {
    setLoading(false)
  }
}

  return ( 
  <div className="min-h-screen bg-surface flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-surface-light border border-border rounded-md p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">
          RAGA Health
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Sign in to your account
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-md px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">

        <div>
          <label className="text-xs text-text-secondary block mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="doctor@hospital.com"
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

      </div>

      {/* Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full mt-5 bg-primary hover:bg-primary-strong text-white text-sm font-medium py-2.5 rounded-md transition disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Footer */}
      <p className="text-center text-xs text-text-secondary mt-5">
        Secure healthcare platform
      </p>
    </div>
  </div>
) 
}