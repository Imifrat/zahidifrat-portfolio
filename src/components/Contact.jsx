import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapPin, Send, CheckCircle, AlertCircle, Phone } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XingIcon, TwitterIcon, ResearchGateIcon } from './Icons'
import EmailReveal from './EmailReveal'
import PhoneReveal from './PhoneReveal'
import { CloseBtn, SectionHead } from './About'

/* ── EmailJS config — replace with your actual IDs ── */
const EJS_SERVICE  = 'YOUR_SERVICE_ID'
const EJS_TEMPLATE = 'YOUR_TEMPLATE_ID'
const EJS_KEY      = 'YOUR_PUBLIC_KEY'

function ContactRow({ Icon, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass"
        style={{ color: 'var(--text-3)' }}
      >
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
  { Icon: GitHubIcon,       url: 'https://github.com/Imifrat',                                  label: 'GitHub'       },
  { Icon: LinkedInIcon,     url: 'https://www.linkedin.com/in/zahid-ifrat/',                    label: 'LinkedIn'     },
  { Icon: XingIcon,         url: 'https://www.xing.com/profile/MDZahidul_Islam018615',          label: 'Xing'         },
  { Icon: TwitterIcon,      url: 'https://x.com/Zahidifrat',                                    label: 'Twitter / X'  },
  { Icon: ResearchGateIcon, url: 'https://www.researchgate.net/profile/Zahidul-Islam-55',       label: 'ResearchGate' },
]

function SocialLink({ Icon, url, label }) {
  return (
    <button
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      aria-label={label}
      title={label}
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
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || 'Portfolio Enquiry',
          message:    form.message,
          to_name:    'MD Zahidul Islam',
        },
        EJS_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
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
              {/* Address */}
              <ContactRow Icon={MapPin} label="Address">
                Vettersstraße 54, 09126<br />Chemnitz, Germany
              </ContactRow>

              {/* Phone — captcha reveal */}
              <ContactRow
                Icon={Phone}
                label="Phone"
              >
                <PhoneReveal />
              </ContactRow>

              {/* Email — captcha reveal */}
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

            {/* Social icons — below contact rows on left */}
            <div className="flex gap-2 flex-wrap pt-6">
              {SOCIALS.map(s => <SocialLink key={s.label} {...s} />)}
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="form-input" name="name"    placeholder="Your Name"    value={form.name}    onChange={set} required />
              <input className="form-input" name="email"   type="email" placeholder="Your Email"   value={form.email}   onChange={set} required />
            </div>
            <input className="form-input" name="subject"  placeholder="Your Subject"  value={form.subject}  onChange={set} required />
            <textarea className="form-input resize-none" name="message" placeholder="Your Message" rows={5} value={form.message} onChange={set} required />

            {status === 'sent' && (
              <div className="flex items-center gap-2 glass rounded-xl px-4 py-3" style={{ color: 'var(--text-2)' }}>
                <CheckCircle size={15} /> <span className="open-sans text-sm">Message sent! I'll get back to you soon.</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 glass rounded-xl px-4 py-3" style={{ color: 'var(--text-2)' }}>
                <AlertCircle size={15} /> <span className="open-sans text-sm">Could not send. Please try emailing directly.</span>
              </div>
            )}

            <button type="submit" className="btn-main" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
              <span className="btn-icon"><Send size={13} /></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
