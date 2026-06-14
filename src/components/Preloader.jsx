import { useState, useEffect } from 'react'

export default function Preloader() {
  const [fading,  setFading]  = useState(false)
  const [gone,    setGone]    = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true),  1300)
    const t2 = setTimeout(() => setGone(true),    2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background:  'var(--bg)',
        opacity:     fading ? 0 : 1,
        transition:  'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Spinner */}
      <div className="relative w-[60px] h-[60px] mb-5">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid var(--border)' }}
        />
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border:         '2px solid transparent',
            borderTopColor: 'var(--accent)',
          }}
        />
        <div
          className="absolute inset-[6px] rounded-full"
          style={{ border: '1px solid var(--border)' }}
        />
      </div>

      {/* Label */}
      <p
        className="poppins text-[10px] font-semibold tracking-[0.45em] uppercase"
        style={{ color: 'var(--accent)' }}
      >
        Loading
      </p>
    </div>
  )
}
