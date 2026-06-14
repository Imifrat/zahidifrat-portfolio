import { useState, useEffect } from 'react'
import { Phone, Check } from 'lucide-react'

export default function PhoneReveal() {
  const [stage, setStage] = useState('hidden') // hidden | verifying | done

  useEffect(() => {
    if (stage !== 'verifying') return
    const t = setTimeout(() => setStage('done'), 1800)
    return () => clearTimeout(t)
  }, [stage])

  if (stage === 'done') {
    return (
      <div>
        <div className="captcha-box mb-2" style={{ maxWidth: 268 }}>
          <div className="captcha-checkbox checked">
            <Check size={12} strokeWidth={3} style={{ color: 'var(--text-1)' }} />
          </div>
          <div>
            <p className="open-sans" style={{ fontSize: '0.72rem', color: 'var(--text-2)' }}>I'm not a robot</p>
            <p className="open-sans" style={{ fontSize: '0.6rem', color: 'var(--text-4)', marginTop: 2 }}>reCAPTCHA · Privacy · Terms</p>
          </div>
          <div className="ml-auto flex-shrink-0">
            <div style={{ width: 32, height: 32, borderRadius: 6, background: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', fontWeight: 900 }}>✓</div>
          </div>
        </div>
        <a
          href="tel:+491624749479"
          className="open-sans font-semibold transition-colors duration-200"
          style={{ fontSize: '0.78rem', color: 'var(--text-2)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.textShadow = 'var(--text-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.textShadow = 'none' }}
        >
          +49 162 474 9479
        </a>
      </div>
    )
  }

  if (stage === 'verifying') {
    return (
      <div className="captcha-box" style={{ maxWidth: 268 }}>
        <div className="captcha-checkbox checking" />
        <div>
          <p className="open-sans" style={{ fontSize: '0.72rem', color: 'var(--text-2)' }}>Verifying…</p>
          <p className="open-sans" style={{ fontSize: '0.6rem', color: 'var(--text-4)', marginTop: 2 }}>reCAPTCHA · Privacy · Terms</p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', fontWeight: 900 }}>G</div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setStage('verifying')}
      className="flex items-center gap-2 open-sans font-medium transition-colors duration-200"
      style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.textShadow = 'var(--text-glow)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.textShadow = 'none' }}
    >
      <Phone size={13} />
      Click to reveal phone number
    </button>
  )
}
