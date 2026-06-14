import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-bold text-lg tracking-tight select-none">
          <span className="text-slate-100">zahid</span>
          <span className="text-indigo-400">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="relative text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200 group"
              >
                <span className="font-mono text-indigo-400 text-xs mr-1 opacity-70">
                  {NAV_LINKS.findIndex(l => l.label === label) + 1 < 10
                    ? `0${NAV_LINKS.findIndex(l => l.label === label) + 1}.`
                    : `${NAV_LINKS.findIndex(l => l.label === label) + 1}.`}
                </span>
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:zahid.ifrat@gmail.com"
              className="text-sm font-semibold text-indigo-400 border border-indigo-400/40 hover:border-indigo-400 hover:bg-indigo-400/10 px-4 py-2 rounded-lg transition-all duration-200"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0F172A]/95 backdrop-blur-xl border-t border-slate-800 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-base font-medium transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:zahid.ifrat@gmail.com"
            className="w-max text-indigo-400 border border-indigo-400/40 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  )
}
