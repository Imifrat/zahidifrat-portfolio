import { useState, useEffect } from 'react'
import { MapPin, Send, Phone, CheckCircle, X } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XingIcon, TwitterIcon, ResearchGateIcon } from './Icons'
import EmailReveal from './EmailReveal'
import PhoneReveal from './PhoneReveal'
import { CloseBtn, SectionHead } from './About'

const W3F_KEY = 'c7025c1f-44e2-43d0-83c4-afcdabe97587'

/* ── Success popup ── */
function SuccessPopup({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="glass rounded-2xl flex flex-col items-center text-center relative"
        style={{ padding: '3rem 3.5rem', maxWidth: 360, width: '90%' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center rounded-full glass"
          style={{ width: 30, height: 30, color: 'var(--text-3)' }}
        >
          <X size={13} />
        </button>

        {/* Animated checkmark circle */}
        <div
          className="flex items-center justify-center rounded-full mb-5"
          style={{
            width: 72, height: 72,
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
          }}
        >
          <CheckCircle size={34} style={{ color: '#22c55e' }} strokeWidth={1.5} />
        </div>

        <h3 className="poppins font-black uppercase mb-2" style={{ fontSize: '1.1rem', color: 'var(--text-1)', letterSpacing: '0.04em' }}>
          Message Sent!
        </h3>
        <p className="open-sans leading-relaxed mb-1" style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <p className="open-sans" style={{ fontSize: '0.68rem', color: 'var(--text-4)' }}>
          This popup closes automatically…
        </p>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl overflow-hidden"
          style={{ height: 3 }}
        >
          <div
            style={{
              height: '100%',
              background: '#22c55e',
              animation: 'shrink 4s linear forwards',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ContactRow({ Icon, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass" style={{ color: 'var(--text-3)' }}>
        <Icon size={14} />
      </div>
      <div>
        <p className="section-label mb-1" style={{ fontSize: '0.58rem' }}>{label}</p>
        <div className="open-sans font-semibold" style={{ fontSize: '0.78rem', color: 'var(--text-2)' }}>
          {children}
        </div>
      </div>
    </li>
  )
}

const SOCIALS = [
  { Icon: GitHubIcon,       url: 'https://github.com/Imifrat',                                label: 'GitHub'       },
  { Icon: LinkedInIcon,     url: 'https://www.linkedin.com/in/zahid-ifrat/',                  label: 'LinkedIn'     },
  { Icon: XingIcon,         url: 'https://www.xing.com/profile/MDZahidul_Islam018615',        label: 'Xing'         },
  { Icon: TwitterIcon,      url: 'https://x.com/Zahidifrat',                                  label: 'Twitter / X'  },
  { Icon: ResearchGateIcon, url: 'https://www.researchgate.net/profile/Zahidul-Islam-55',     label: 'ResearchGate' },
]

function SocialLink({ Icon, url, label }) {
  return (
    <button
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      aria-label={label} title={label}
      className="flex items-center justify-center rounded-full glass transition-all duration-300"
      style={{ width: 36, height: 36, color: 'var(--text-3)', background: 'transparent' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
    >
      <Icon size={14} />
    </button>
  )
}

export default function Contact({ onClose }) {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          name:       form.name,
          email:      form.email,
          subject:    form.subject || 'Portfolio Enquiry',
          message:    form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {success && <SuccessPopup onClose={() => setSuccess(false)} />}

      <div className="min-h-full" style={{ background: 'var(--bg-panel)' }}>
        <CloseBtn onClick={onClose} />

        <div style={{ padding: '3.5rem 3.5rem 5rem', maxWidth: 820 }}>
          <SectionHead label="Get In Touch" title="Don't Be" accent="Shy!" watermark="Contact" />

          <div className="grid sm:grid-cols-2 gap-12">
            {/* Left: info */}
            <div>
              <p className="open-sans leading-[2] mb-7" style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                Open to new opportunities, collaborations, and conversations about
                automotive software engineering. Don't hesitate to reach out — I'll
                get back to you as soon as possible.
              </p>

              <ul className="space-y-5 mb-7">
                <ContactRow Icon={MapPin} label="Address">
                  Vettersstraße 54, 09126<br />Chemnitz, Germany
                </ContactRow>

                <ContactRow Icon={Phone} label="Phone">
                  <PhoneReveal />
                </ContactRow>

                <ContactRow
                  Icon={() => (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect x={2} y={4} width={20} height={16} rx={2}/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  )}
                  label="Email"
                >
                  <EmailReveal />
                </ContactRow>
              </ul>

              <div className="flex gap-2 flex-wrap pt-6">
                {SOCIALS.map(s => <SocialLink key={s.label} {...s} />)}
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="form-input" name="name"  placeholder="Your Name"  value={form.name}  onChange={set} required />
                <input className="form-input" name="email" type="email" placeholder="Your Email" value={form.email} onChange={set} required />
              </div>
              <input    className="form-input" name="subject"  placeholder="Your Subject"  value={form.subject}  onChange={set} required />
              <textarea className="form-input resize-none" name="message" placeholder="Your Message" rows={5} value={form.message} onChange={set} required />

              {error && (
                <p className="open-sans text-sm px-1" style={{ color: '#f87171' }}>{error}</p>
              )}

              <button type="submit" className="btn-main" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
                <span className="btn-icon"><Send size={13} /></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
