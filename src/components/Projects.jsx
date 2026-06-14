import { useState, useEffect } from 'react'
import { ExternalLink, Star, GitFork, X } from 'lucide-react'
import { GitHubIcon } from './Icons'
import { CloseBtn, SectionHead } from './About'

/* ── language colors ── */
const LANG_CLR = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  'C++': '#f34b7d', C: '#555', HTML: '#e34c26', Shell: '#89e051',
}

/* ── Featured projects data ── */
const FEATURED = [
  {
    id: 1, title: 'AUTOSAR SWC Framework',
    desc: 'AUTOSAR-compliant Software Component architecture implementing Counter, Adder, and DataLogger SWCs with Port Interface definitions and RTE generation for a vehicle ECU.',
    tech: ['AUTOSAR', 'C', 'SystemDesk', 'RTE'],
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0f1f3a 100%)',
  },
  {
    id: 2, title: 'Virtual ECU Test Bench',
    desc: 'Complete virtual ECU simulation environment using dSpace VEOS and SystemDesk for automated regression testing without physical hardware dependencies.',
    tech: ['VEOS', 'dSpace', 'Python', 'CAN'],
    gradient: 'linear-gradient(135deg, #1a3d2e 0%, #0d2019 100%)',
  },
  {
    id: 3, title: 'Automotive CyberSec Scanner',
    desc: 'Python-based threat analysis tool implementing TARA methodology for ISO/SAE 21434 compliance assessment of automotive ECU software and communication interfaces.',
    tech: ['Python', 'ISO 21434', 'TARA', 'Security'],
    gradient: 'linear-gradient(135deg, #3d1a2e 0%, #200d19 100%)',
  },
  {
    id: 4, title: 'CAN Bus Automation Suite',
    desc: 'Comprehensive test automation suite for CAN bus communication testing — DBC parsing, message validation, error injection, and automated HTML report generation.',
    tech: ['Python', 'CAN Bus', 'pytest', 'CAPL'],
    gradient: 'linear-gradient(135deg, #2e1a3d 0%, #180d20 100%)',
  },
]

const LANG_TABS = ['ALL', 'PYTHON', 'WEB', 'OTHER']

function filterByLang(repos, f) {
  if (f === 'ALL')    return repos
  if (f === 'PYTHON') return repos.filter(r => r.language === 'Python')
  if (f === 'WEB')    return repos.filter(r => ['JavaScript', 'TypeScript', 'HTML'].includes(r.language))
  return repos.filter(r => !['Python', 'JavaScript', 'TypeScript', 'HTML'].includes(r.language))
}

/* ── Skeleton card ── */
function Skeleton() {
  return (
    <div className="glass animate-pulse rounded-2xl p-5">
      <div className="h-4 w-3/4 rounded mb-4" style={{ background: 'var(--border)' }} />
      <div className="h-3 w-full rounded mb-2" style={{ background: 'var(--border)' }} />
      <div className="h-3 w-5/6 rounded mb-5" style={{ background: 'var(--border)' }} />
      <div className="h-3 w-16 rounded" style={{ background: 'var(--border)' }} />
    </div>
  )
}

/* ── GitHub repo card ── */
function RepoCard({ repo }) {
  return (
    <div
      className="glass flex flex-col rounded-2xl p-5 transition-all duration-300"
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="poppins font-bold pr-3 leading-snug" style={{ fontSize: '0.8rem', color: 'var(--text-1)', letterSpacing: '0.01em' }}>
          {repo.name.replace(/-/g, ' ')}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          {[repo.html_url, repo.homepage || repo.html_url].map((href, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-4)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-4)')}
            >
              {i === 0 ? <GitHubIcon size={14} /> : <ExternalLink size={14} />}
            </a>
          ))}
        </div>
      </div>
      <p className="open-sans flex-grow mb-4 leading-relaxed" style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>
        {repo.description || 'No description provided.'}
      </p>
      <div className="open-sans flex items-center gap-4 pt-3" style={{ borderTop: '1px solid var(--border)', fontSize: '0.68rem', color: 'var(--text-4)' }}>
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: LANG_CLR[repo.language] || 'var(--text-4)' }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
        <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks_count}</span>
      </div>
    </div>
  )
}

/* ── Featured project card ── */
function FeaturedCard({ proj, onDetails }) {
  return (
    <div
      className="glass rounded-2xl overflow-hidden transition-all duration-300"
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      {/* Image placeholder */}
      <div className="relative" style={{ height: 140, background: proj.gradient, overflow: 'hidden' }}>
        <div className="absolute inset-0 flex items-end p-4">
          <h3 className="poppins font-black text-white uppercase" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {proj.title}
          </h3>
        </div>
        <button
          onClick={() => onDetails(proj)}
          className="absolute top-3 right-3 btn-main"
          style={{ padding: '5px 36px 5px 12px', fontSize: '9px' }}
        >
          Details
          <span className="btn-icon" style={{ width: 28 }}><ExternalLink size={10} /></span>
        </button>
      </div>
      {/* Tags */}
      <div className="p-4 pt-3">
        <p className="open-sans mb-3 leading-relaxed" style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>
          {proj.desc.slice(0, 90)}…
        </p>
        <div className="flex flex-wrap gap-1.5">
          {proj.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

/* ── Project detail modal ── */
function DetailModal({ proj, onClose }) {
  if (!proj) return null
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="glass rounded-2xl w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center rounded-full glass"
          style={{ width: 32, height: 32, color: 'var(--text-3)' }}
        >
          <X size={14} />
        </button>
        {/* Gradient header */}
        <div className="rounded-xl mb-5" style={{ height: 100, background: proj.gradient }} />
        <h3 className="poppins font-black uppercase mb-3" style={{ fontSize: '1rem', color: 'var(--text-1)' }}>
          {proj.title}
        </h3>
        <p className="open-sans mb-5 leading-relaxed" style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
          {proj.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {proj.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ onClose }) {
  const [mainTab, setMainTab] = useState('GitHub Projects')
  const [langTab, setLangTab] = useState('ALL')
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)
  const [detail,  setDetail]  = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/Imifrat/repos?sort=updated&per_page=12')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => { setRepos(d.filter(r => !r.fork)); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const visible = filterByLang(repos, langTab)

  return (
    <div className="min-h-full relative" style={{ background: 'var(--bg-panel)' }}>
      <CloseBtn onClick={onClose} />
      <DetailModal proj={detail} onClose={() => setDetail(null)} />

      <div style={{ padding: '3.5rem 3.5rem 5rem' }}>
        <SectionHead label="My Work" title="My" accent="Projects" watermark="Work" />

        {/* Main tab switcher */}
        <div className="flex gap-2 mb-6">
          {['GitHub Projects', 'Featured Projects'].map(t => (
            <button key={t} onClick={() => setMainTab(t)} className={`filter-tab ${mainTab === t ? 'active' : ''}`}>
              {t}
            </button>
          ))}
        </div>

        {/* GitHub tab */}
        {mainTab === 'GitHub Projects' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {LANG_TABS.map(t => (
                <button key={t} onClick={() => setLangTab(t)} className={`filter-tab ${langTab === t ? 'active' : ''}`}>
                  {t}
                </button>
              ))}
            </div>

            {loading && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
              </div>
            )}
            {error && (
              <div className="text-center py-14">
                <p className="open-sans mb-3" style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Could not load repositories.</p>
                <a href="https://github.com/Imifrat" target="_blank" rel="noreferrer"
                  className="open-sans font-semibold transition-colors" style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                >
                  View on GitHub ↗
                </a>
              </div>
            )}
            {!loading && !error && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.length
                  ? visible.map(r => <RepoCard key={r.id} repo={r} />)
                  : <p className="open-sans col-span-3 py-12 text-center" style={{ color: 'var(--text-4)', fontSize: '0.8rem' }}>No repos in this category.</p>
                }
              </div>
            )}
            {!loading && !error && (
              <div className="mt-8 flex justify-center">
                <a href="https://github.com/Imifrat" target="_blank" rel="noreferrer" className="btn-main">
                  All Repositories
                  <span className="btn-icon"><ExternalLink size={13} /></span>
                </a>
              </div>
            )}
          </>
        )}

        {/* Featured tab */}
        {mainTab === 'Featured Projects' && (
          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURED.map(p => <FeaturedCard key={p.id} proj={p} onDetails={setDetail} />)}
          </div>
        )}
      </div>
    </div>
  )
}
