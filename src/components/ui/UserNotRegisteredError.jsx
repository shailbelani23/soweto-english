import { useState } from 'react'
import { UserProgress } from 'entities/UserProgress'

export default function UserNotRegisteredError({ onRegister }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    UserProgress.setName(name.trim())
    onRegister?.(name.trim())
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          👋
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome to SowetoEnglish</h1>
        <p className="text-gray-500 text-sm mb-6">
          Practice job skills for free. No WiFi needed once you have loaded this page.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="What is your first name?"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-brand-700 transition-colors"
          >
            Get started →
          </button>
        </form>
      </div>
    </div>
  )
}
