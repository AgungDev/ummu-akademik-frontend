import type { ReactNode } from 'react'

export type IconName =
  | 'grid'
  | 'code'
  | 'wallet'
  | 'settings'
  | 'student'
  | 'lecturer'
  | 'search'
  | 'bell'
  | 'arrow'
  | 'eye'
  | 'eyeOff'
  | 'logout'
  | 'check'
  | 'spark'

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
  code: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m14 5-4 14" /></>,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 9h18" /><path d="M16 14h2" /><path d="M6 6V4a1 1 0 0 1 1-1h11" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" transform="translate(-1 -1) scale(1.08)" /></>,
  student: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3.5 3 8.5 3 12 0v-5" /><path d="M22 9v6" /></>,
  lecturer: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M9 7h7M9 11h7" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
  eyeOff: <><path d="m3 3 18 18" /><path d="M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.1 3.6" /><path d="M6.2 6.3C3.5 8 2 12 2 12s3.5 6 10 6c1 0 1.9-.1 2.7-.4" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.1L12 19l-1.9-5.9L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14Z" /></>,
}

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}
