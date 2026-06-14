import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './Icons'

const SOCIALS = [
  { Icon: GitHubIcon,   href: 'https://github.com/Imifrat',           label: 'GitHub'   },
  { Icon: LinkedInIcon, href: 'https://linkedin.com/in/zahidifrat',   label: 'LinkedIn' },
  { Icon: Mail,         href: 'mailto:zahid.ifrat@gmail.com',         label: 'Email'    },
]

export default function Footer() {
  return (
    <footer
      className="px-6 py-10 pb-20 lg:pb-10"
      style={{ background: '#0d0d0d', borderTop: '1px solid #1d1d1d' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-5 md:flex-row">
        <p className="open-sans text-sm" style={{ color: '#444' }}>
          © 2026{' '}
          <span className="font-semibold" style={{ color: '#666' }}>
            Zahid Ifrat
          </span>
          . All rights reserved.
        </p>

        <div className="flex gap-3">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
              style={{ border: '1px solid #252525', color: '#555' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ffb400'
                e.currentTarget.style.color       = '#ffb400'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#252525'
                e.currentTarget.style.color       = '#555'
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
