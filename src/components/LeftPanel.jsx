import { Moon, Sun } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XingIcon, TwitterIcon, ResearchGateIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'

const SOCIALS = [
  { Icon: GitHubIcon,        url: 'https://github.com/Imifrat',                                    label: 'GitHub'       },
  { Icon: LinkedInIcon,      url: 'https://www.linkedin.com/in/zahid-ifrat/',                      label: 'LinkedIn'     },
  { Icon: XingIcon,          url: 'https://www.xing.com/profile/MDZahidul_Islam018615',            label: 'Xing'         },
  { Icon: TwitterIcon,       url: 'https://x.com/Zahidifrat',                                      label: 'Twitter / X'  },
  { Icon: ResearchGateIcon,  url: 'https://www.researchgate.net/profile/Zahidul-Islam-55',         label: 'ResearchGate' },
]

function SocialBtn({ Icon, url, label }) {
  return (
    <button
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      aria-label={label}
      title={label}
      className="flex items-center justify-center rounded-full transition-all duration-300"
      style={{ width: 34, height: 34, border: '1px solid var(--border)', color: 'var(--text-3)', background: 'transparent' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-1)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)';       e.currentTarget.style.color = 'var(--text-3)' }}
    >
      <Icon size={13} />
    </button>
  )
}

export default function LeftPanel() {
  const { theme, toggle } = useTheme()

  return (
    <aside
      className="hidden lg:flex flex-col flex-shrink-0 relative"
      style={{
        width: '34%',
        minWidth: 230,
        background: 'var(--bg-left)',
        backdropFilter: 'blur(30px)',
        borderRight: '1px solid var(--panel-divider)',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div className="blob" style={{ width: 260, height: 260, top: -60, left: -60, opacity: 0.6 }} />
      <div className="blob" style={{ width: 180, height: 180, bottom: 40, right: -40, opacity: 0.4 }} />

      {/* Theme toggle */}
      <div className="relative z-10 flex justify-end px-5 pt-5">
        <button
          onClick={toggle}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          className="flex items-center justify-center rounded-full glass transition-all duration-200"
          style={{ width: 34, height: 34, color: 'var(--text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 text-center pb-4">
        {/* Profile photo */}
        <div
          className="mb-5 overflow-hidden flex-shrink-0"
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            border: '1px solid var(--border-avatar)',
            boxShadow: '0 0 0 5px var(--bg-card)',
          }}
        >
          <img
            src="/assets/profile.jpg"
            alt="MD Zahidul Islam"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>

        {/* Name */}
        <h2
          className="poppins font-black uppercase leading-tight mb-1"
          style={{ fontSize: 'clamp(0.8rem, 1.9vw, 1.1rem)', letterSpacing: '0.06em', color: 'var(--text-1)' }}
        >
          MD Zahidul
        </h2>
        <h2
          className="poppins font-black uppercase leading-tight mb-4"
          style={{ fontSize: 'clamp(0.8rem, 1.9vw, 1.1rem)', letterSpacing: '0.06em', color: 'var(--text-1)' }}
        >
          Islam
        </h2>

        {/* Divider */}
        <div className="mb-4" style={{ width: 36, height: 1, background: 'var(--border-hover)' }} />

        {/* Title */}
        <p
          className="open-sans uppercase leading-relaxed mb-2"
          style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-3)' }}
        >
          Automotive Software
          <br />Engineer
        </p>

        {/* Location */}
        <p className="open-sans mb-6" style={{ fontSize: '10px', color: 'var(--text-4)' }}>
          Chemnitz, Germany
        </p>

        {/* Social icons — icon only, URL hidden via JS navigation */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 pb-4 text-center">
        <p className="open-sans" style={{ fontSize: '9px', color: 'var(--text-4)' }}>
          © 2026 MD Zahidul Islam
        </p>
      </div>
    </aside>
  )
}
