import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zu', label: 'isiZulu', flag: '🇿🇦' },
  { code: 'st', label: 'Sesotho', flag: '🇿🇦' },
  { code: 'tn', label: 'Setswana', flag: '🇿🇦' },
  { code: 'xh', label: 'isiXhosa', flag: '🇿🇦' },
]

export const CATEGORY_COLORS = {
  'Workplace Basics': 'bg-purple-100 text-purple-700',
  'Customer Service': 'bg-blue-100 text-blue-700',
  'Interview Skills': 'bg-amber-100 text-amber-700',
  'Safety': 'bg-red-100 text-red-700',
  'Teamwork': 'bg-green-100 text-green-700',
  'Problem Solving': 'bg-orange-100 text-orange-700',
}

export const LEVEL_COLORS = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
}
