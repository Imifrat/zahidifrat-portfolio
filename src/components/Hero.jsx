import { useState, useEffect } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

const ROLES = [
  'Automotive Software Engineer',
  'AUTOSAR Developer',
  'Test Automation Expert',
  'Embedded Systems Engineer',
  'MSc Student @ TU Chemnitz',
]

function TypeWriter() {
  const [idx,      setIdx]      = useState(0)
  const [text,     setText]     = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = ROLES[idx]

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIdx(i => (i + 1) % ROLES.length)
      return
    }

    const speed = deleting ? 35 : 65
    const t = setTimeout(() => {
      setText(s => deleting ? s.slice(0, -1) : full.slice(0, s.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, idx])

  return (
    <div className="flex items-center gap-3 mb-7">
      <div style={{ width: 28, height: 1, background: 'var(--accent)', flexShrink: 0, opacity: 0.7 }} />
      <h2
        className="poppins font-semibold uppercase"
        style={{
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
          color: 'var(--text-2)',
          letterSpacing: '0.16em',
          minHeight: '1.2em',
        }}
      >
        {text}
        <span className="cursor-blink" style={{ color: 'var(--accent)', marginLeft: 1 }}>|</span>
      </h2>
    </div>
  )
}

export default function Hero({ onAbout, onContact }) {
  return (
    <div
      className="h-full flex flex-col items-start justify-center relative overflow-hidden"
      style={{ background: 'var(--bg)', paddingLeft: 'clamp(2rem, 6vw, 4.5rem)', paddingRight: '5rem' }}
    >
      {/* Decorative blobs */}
      <div className="blob" style={{ width: 400, height: 400, top: -80, right: -80, opacity: 0.5 }} />
      <div className="blob" style={{ width: 280, height: 280, bottom: 60, left: 20, opacity: 0.3 }} />

      <div className="relative z-10 max-w-lg w-full">
        {/* Mobile: profile photo */}
        <div
          className="lg:hidden mb-6 overflow-hidden"
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            border: '1px solid var(--border-avatar)',
            boxShadow: '0 0 0 4px var(--bg-card)',
          }}
        >
          <img
            src="/assets/profile.jpg"
            alt="MD Zahidul Islam"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>

        {/* Eyebrow */}
        <p
          className="poppins font-semibold uppercase mb-4"
          style={{ fontSize: '0.75rem', letterSpacing: '0.42em', color: 'var(--text-4)' }}
        >
          Hello, I Am
        </p>

        {/* Name */}
        <h1
          className="poppins font-black uppercase leading-none mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.02em', color: 'var(--text-1)', whiteSpace: 'nowrap' }}
          data-hover
        >
          MD Zahidul Islam
        </h1>

        {/* Typewriter role */}
        <TypeWriter />

        {/* Bio */}
        <p
          className="open-sans leading-[1.95] mb-9"
          style={{ fontSize: '0.95rem', color: 'var(--text-3)', maxWidth: 460 }}
        >
          Passionate about building robust software for the automotive domain.
          Specialising in{' '}
          <span style={{ color: 'var(--text-2)' }}>AUTOSAR</span>,{' '}
          <span style={{ color: 'var(--text-2)' }}>embedded systems</span>, and{' '}
          <span style={{ color: 'var(--text-2)' }}>test automation</span>.
          Currently pursuing an MSc at TU Chemnitz, Germany.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <button onClick={onAbout} className="btn-main">
            More About Me
            <span className="btn-icon"><ArrowRight size={13} /></span>
          </button>
          <button onClick={onContact} className="btn-main">
            Contact Me
            <span className="btn-icon"><Mail size={13} /></span>
          </button>
        </div>
      </div>

      {/* Left edge accent line */}
      <div
        className="absolute bottom-10 left-0"
        style={{ width: 2, height: 60, background: 'linear-gradient(to bottom, transparent, var(--border-hover))' }}
      />
    </div>
  )
}
