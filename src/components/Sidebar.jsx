import { Home, User, Code2, Mail, BookOpen } from 'lucide-react'

const SECTIONS = [
  { id: 'home',     Icon: Home,     label: 'Home'     },
  { id: 'about',    Icon: User,     label: 'About'    },
  { id: 'projects', Icon: Code2,    label: 'Projects' },
  { id: 'blog',     Icon: BookOpen, label: 'Blog'     },
  { id: 'contact',  Icon: Mail,     label: 'Contact'  },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <>
      {/* Desktop — fixed right, vertically centred */}
      <nav
        className="hidden lg:flex fixed z-50 flex-col gap-[14px]"
        style={{ right: 24, top: '50%', transform: 'translateY(-50%)' }}
      >
        {SECTIONS.map(({ id, Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={label}
              className="group relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width:      42,
                height:     42,
                background:  isActive ? 'var(--nav-active-bg)' : 'var(--nav-inactive-bg)',
                backdropFilter: 'blur(10px)',
                color:       isActive ? 'var(--nav-active-text)' : 'var(--nav-icon)',
                border:     `1px solid ${isActive ? 'var(--border-hover)' : 'var(--border)'}`,
                transform:   isActive ? 'scale(1.08)' : 'scale(1)',
                boxShadow:   isActive ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background   = 'var(--nav-active-bg)'
                  e.currentTarget.style.borderColor  = 'var(--border-hover)'
                  e.currentTarget.style.color        = 'var(--text-1)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background   = 'var(--nav-inactive-bg)'
                  e.currentTarget.style.borderColor  = 'var(--border)'
                  e.currentTarget.style.color        = 'var(--nav-icon)'
                }
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
              {/* Tooltip */}
              <span
                className="pointer-events-none absolute right-[52px] whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium poppins opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'var(--bg-card)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Mobile — fixed bottom bar */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50"
        style={{ background: 'var(--bg-left)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-around py-2">
          {SECTIONS.map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center gap-[3px] px-3 py-1 transition-colors duration-200"
              style={{ color: active === id ? 'var(--text-1)' : 'var(--nav-icon)' }}
            >
              <Icon size={18} strokeWidth={active === id ? 2.5 : 1.8} />
              <span className="poppins text-[8px] font-semibold uppercase tracking-wider" style={{ color: 'inherit' }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
