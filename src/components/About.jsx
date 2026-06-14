import { X, Download } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XingIcon, TwitterIcon, ResearchGateIcon } from './Icons'
import EmailReveal from './EmailReveal'
import { useInView } from '../hooks/useInView'

/* ── Close button (shared) ── */
export function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed z-50 flex items-center justify-center rounded-full glass transition-all duration-200"
      style={{ top: 20, right: 72, width: 38, height: 38, color: 'var(--text-3)' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
    >
      <X size={16} />
    </button>
  )
}

/* ── Section heading (shared) ── */
export function SectionHead({ label, title, accent, watermark }) {
  return (
    <div className="relative mb-10">
      <div className="title-bg" aria-hidden>{watermark}</div>
      <p className="section-label mb-2 relative z-10">{label}</p>
      <h2 className="section-title relative z-10">
        {title} <span style={{ color: 'var(--text-2)' }}>{accent}</span>
      </h2>
      <div className="mt-3 relative z-10" style={{ width: 36, height: 1, background: 'var(--border-hover)' }} />
    </div>
  )
}

/* ── Circular skill ring ── */
const R = 38, C = 2 * Math.PI * R

function SkillRing({ label, pct, visible }) {
  const dash = visible ? ((100 - pct) / 100) * C : C
  return (
    <div
      className="flex flex-col items-center gap-3"
      onMouseEnter={e => e.currentTarget.querySelector('circle.fill').style.stroke = 'var(--skill-hover)'}
      onMouseLeave={e => e.currentTarget.querySelector('circle.fill').style.stroke = 'var(--skill-fill)'}
    >
      <div className="relative" style={{ width: 88, height: 88 }}>
        <svg width={88} height={88} viewBox="0 0 88 88" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={44} cy={44} r={R} fill="none" stroke="var(--skill-track)" strokeWidth={4} />
          <circle
            className="fill"
            cx={44} cy={44} r={R} fill="none"
            stroke="var(--skill-fill)" strokeWidth={4} strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={dash}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1), stroke 0.3s ease' }}
          />
        </svg>
        <span className="poppins absolute inset-0 flex items-center justify-center font-bold" style={{ fontSize: '0.82rem', color: 'var(--text-1)' }}>
          {visible ? `${pct}%` : '0%'}
        </span>
      </div>
      <span className="open-sans text-center" style={{ fontSize: '0.6rem', letterSpacing: '0.05em', color: 'var(--text-3)', lineHeight: 1.3 }}>
        {label}
      </span>
    </div>
  )
}

const SKILLS = [
  { label: 'Python',            pct: 88 },
  { label: 'AUTOSAR',           pct: 80 },
  { label: 'dSpace SystemDesk', pct: 75 },
  { label: 'VEOS',              pct: 72 },
  { label: 'Test Automation',   pct: 82 },
  { label: 'Embedded C',        pct: 65 },
]

function InfoRow({ label, children }) {
  return (
    <div className="flex items-start gap-2 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="open-sans font-semibold flex-shrink-0 pt-0.5" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--text-4)', minWidth: 110, textTransform: 'uppercase' }}>
        {label}
      </span>
      <div className="open-sans" style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{children}</div>
    </div>
  )
}

function TItem({ date, title, sub }) {
  return (
    <div className="timeline-item">
      <span className="poppins inline-block mb-1 rounded" style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-4)', textTransform: 'uppercase' }}>
        {date}
      </span>
      <h4 className="poppins font-bold mb-0.5" style={{ fontSize: '0.82rem', color: 'var(--text-1)' }}>{title}</h4>
      <p className="open-sans leading-relaxed" style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{sub}</p>
    </div>
  )
}

const SOCIALS = [
  { Icon: GitHubIcon,       url: 'https://github.com/Imifrat',                                  label: 'GitHub'       },
  { Icon: LinkedInIcon,     url: 'https://www.linkedin.com/in/zahid-ifrat/',                    label: 'LinkedIn'     },
  { Icon: XingIcon,         url: 'https://www.xing.com/profile/MDZahidul_Islam018615',          label: 'Xing'         },
  { Icon: TwitterIcon,      url: 'https://x.com/Zahidifrat',                                    label: 'Twitter / X'  },
  { Icon: ResearchGateIcon, url: 'https://www.researchgate.net/profile/Zahidul-Islam-55',       label: 'ResearchGate' },
]

function SocialBtn({ Icon, url, label }) {
  return (
    <button
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      aria-label={label}
      title={label}
      className="flex items-center justify-center rounded-full glass transition-all duration-300"
      style={{ width: 38, height: 38, color: 'var(--text-3)', background: 'transparent' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
    >
      <Icon size={14} />
    </button>
  )
}

export default function About({ onClose }) {
  const [skillRef, skillVisible] = useInView({ threshold: 0.1 })

  return (
    <div className="min-h-full" style={{ background: 'var(--bg-panel)' }}>
      <CloseBtn onClick={onClose} />

      <div style={{ padding: '3.5rem 3.5rem 5rem', maxWidth: 820 }}>
        <SectionHead label="Who I Am" title="About" accent="Me" watermark="Resume" />

        {/* Personal info */}
        <div className="mb-10">
          <p className="section-label mb-4" style={{ fontSize: '0.6rem' }}>Personal Infos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            <div>
              <InfoRow label="First Name">MD Zahidul</InfoRow>
              <InfoRow label="Nationality">Bangladeshi</InfoRow>
              <InfoRow label="Location">Chemnitz, Germany</InfoRow>
              <InfoRow label="Languages">English, German, Bengali</InfoRow>
            </div>
            <div>
              <InfoRow label="Last Name">Islam</InfoRow>
              <InfoRow label="Status">MSc Student</InfoRow>
              <InfoRow label="Email"><EmailReveal /></InfoRow>
              <InfoRow label="LinkedIn">
                <button
                  onClick={() => window.open('https://www.linkedin.com/in/zahid-ifrat/', '_blank', 'noopener,noreferrer')}
                  className="open-sans font-semibold transition-colors duration-200"
                  style={{ fontSize: '0.75rem', color: 'var(--text-2)', background: 'none', border: 'none', padding: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.textShadow = 'var(--text-glow)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.textShadow = 'none' }}
                >
                  zahid-ifrat
                </button>
              </InfoRow>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* CV Download */}
            <a href="/assets/cv.pdf" download="MD_Zahidul_Islam_CV.pdf" className="btn-main">
              Download CV
              <span className="btn-icon"><Download size={13} /></span>
            </a>
            {/* Social icons — icon only, URL hidden */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { n: '2+',  label: 'Years\nStudying'     },
            { n: '25+', label: 'Projects\nCompleted' },
            { n: '10+', label: 'Happy\nClients'      },
            { n: '3+',  label: 'Awards\nWon'         },
          ].map(({ n, label }) => (
            <div key={n} className="stat-box">
              <p className="poppins font-black mb-1" style={{ fontSize: '1.6rem', color: 'var(--text-1)', lineHeight: 1 }}>{n}</p>
              <p className="open-sans whitespace-pre-line leading-relaxed" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-4)', textTransform: 'uppercase' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-12">
          <p className="section-label mb-6" style={{ fontSize: '0.6rem' }}>Technical Skills</p>
          <div ref={skillRef} className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {SKILLS.map(s => <SkillRing key={s.label} {...s} visible={skillVisible} />)}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="section-label mb-7" style={{ fontSize: '0.6rem' }}>Experience &amp; Education</p>
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <h3 className="poppins font-bold uppercase mb-5 flex items-center gap-2" style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--border-hover)' }}>●</span> Experience
              </h3>
              <ul className="timeline-list">
                <TItem date="2025 – Present" title="Research Assistant"
                  sub="Professur Automotive Software Engineering, TU Chemnitz — AUTOSAR system design and test automation." />
                <TItem date="2024 – 2025" title="MSc Thesis Research"
                  sub="VEOS-based virtual ECU validation and dSpace SystemDesk integration for model-based testing." />
                <TItem date="2023 – 2024" title="Student Projects"
                  sub="Automotive cybersecurity analysis, Python-based test frameworks, and embedded software prototypes." />
              </ul>
            </div>
            <div>
              <h3 className="poppins font-bold uppercase mb-5 flex items-center gap-2" style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--border-hover)' }}>●</span> Education
              </h3>
              <ul className="timeline-list">
                <TItem date="2023 – Present" title="MSc Automotive Software Engineering"
                  sub="Technical University of Chemnitz, Germany — embedded software, AUTOSAR, and cybersecurity." />
                <TItem date="Before 2023" title="BSc Computer Science &amp; Engineering"
                  sub="Undergraduate degree in software engineering, algorithms, and computer networks." />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
