import { useState, useEffect } from 'react'
import { ChevronUp, ArrowUpRight, ExternalLink, Loader } from 'lucide-react'
import { CloseBtn, SectionHead } from './About'

/* ── Tech blog posts ── */
const POSTS = [
  {
    id: 1,
    title:    'AUTOSAR-Based SWC Architecture: Counter, Adder & DataLogger Implementation',
    date:     'May 2025',
    category: 'AUTOSAR',
    short:    'A deep dive into implementing Software Components (SWCs) in an AUTOSAR-compliant architecture — Port Interfaces, Runnables, and inter-SWC communication through the Virtual Function Bus.',
    full:     'This article walks through the design and implementation of three fundamental SWCs: a Counter component that tracks cyclic events, an Adder that aggregates signals from multiple ECU sensors, and a DataLogger that persists runtime data to non-volatile memory. We explore the AUTOSAR methodology from port interface definition in ARXML through RTE code generation and scheduler integration. Key concepts include CompositionSwComponentType, PortInterface, and the distinction between SenderReceiver and ClientServer ports.',
    tags:     ['AUTOSAR', 'SWC', 'RTE', 'Embedded C'],
  },
  {
    id: 2,
    title:    'Test & Validation Automation in Automotive Software Engineering',
    date:     'April 2025',
    category: 'Testing',
    short:    'Explores modern test automation strategies for ECU validation — HIL/SIL testing, CAPL scripting, and Python-based test frameworks compliant with ISO 26262.',
    full:     'Testing in automotive software is a multi-layered discipline governed by ISO 26262 and the V-model. This post explores the test pyramid in automotive context: unit tests with Google Test, integration tests using SIL (Software-in-the-Loop) environments such as VEOS, and system tests via HIL (Hardware-in-the-Loop) setups. We also examine how Python\'s pytest framework can orchestrate CAN communication tests using python-can, and how CAPL scripting in CANoe enables network-level test automation.',
    tags:     ['Testing', 'ISO 26262', 'Python', 'CAPL', 'HIL'],
  },
  {
    id: 3,
    title:    'Automotive Cybersecurity: Introduction to ISO/SAE 21434',
    date:     'March 2025',
    category: 'Cybersecurity',
    short:    'An introduction to ISO/SAE 21434 — the automotive cybersecurity standard. Covers TARA, cybersecurity goals, and software development lifecycle requirements.',
    full:     'ISO/SAE 21434 defines the cybersecurity engineering process for road vehicles from concept through production and end-of-life. This article covers the Threat Analysis and Risk Assessment (TARA) methodology — identifying assets, threat scenarios, and damage scenarios to derive cybersecurity goals. We also discuss the Cybersecurity Assurance Level (CAL) rating system and how it informs development rigor, drawing parallels with the well-known ASIL ratings of ISO 26262.',
    tags:     ['Cybersecurity', 'ISO 21434', 'TARA', 'Automotive'],
  },
  {
    id: 4,
    title:    'Python for Automotive Test Automation: A Practical Guide',
    date:     'February 2025',
    category: 'Python',
    short:    'Practical guide to using Python for automotive test automation — CAN bus interaction with python-can, XCP protocol communication, and building test frameworks with pytest.',
    full:     'Python has become a go-to language for automotive test engineers thanks to its rich ecosystem. This guide covers python-can for sending and receiving CAN frames, cantools for DBC-based signal decoding, and pyXCP for ECU calibration via the XCP protocol. We build a complete example test suite using pytest that validates CAN signal ranges, timing requirements, and end-to-end scenarios — structured to run both in SIL and against live ECU hardware.',
    tags:     ['Python', 'CAN Bus', 'XCP', 'pytest', 'Automation'],
  },
  {
    id: 5,
    title:    'VEOS & dSpace SystemDesk: Virtual ECU Simulation Workflow',
    date:     'January 2025',
    category: 'Simulation',
    short:    'Step-by-step workflow for virtual ECU simulation using dSpace VEOS and SystemDesk — SWC integration, platform configuration, and running experiments without hardware.',
    full:     'dSpace VEOS (Virtual ECU Operating System) enables executing ECU software stacks on a PC host without physical hardware. This post details the end-to-end workflow: starting from an AUTOSAR .arxml system description in SystemDesk, generating the BSW configuration and RTE, compiling the application SWCs for the virtual platform, and running automated test scripts that communicate over virtual CAN channels. We discuss common pitfalls — scheduling model differences between virtual and physical targets — and how to address them.',
    tags:     ['VEOS', 'dSpace', 'SystemDesk', 'Virtual ECU', 'Simulation'],
  },
]

/* ── Blogger config ── */
const BLOG_ID    = '2230030199150271315'
const FEED_URL   = `https://www.blogger.com/feeds/${BLOG_ID}/posts/default?alt=json&max-results=20`
const PUBLIC_URL = `https://www.blogger.com/blog/posts/${BLOG_ID}`

/* Strip HTML tags and decode basic entities */
function stripHtml(html = '') {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/* Hook: auto-fetch Blogger posts */
function useBloggerPosts() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [failed,  setFailed]  = useState(false)

  useEffect(() => {
    fetch(FEED_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        const entries = data?.feed?.entry || []
        const parsed = entries.map(e => {
          const rawSummary = e.summary?.$t || e.content?.$t || ''
          const summary    = stripHtml(rawSummary).slice(0, 220)
          const altLink    = (e.link || []).find(l => l.rel === 'alternate')
          const tags       = (e.category || []).map(c => c.term).slice(0, 3)
          const thumbnail  = (e['media$thumbnail'] || e.gd$extendedProperty)?.url || null
          return {
            id:      e.id?.$t || Math.random().toString(36),
            title:   e.title?.$t || 'Untitled',
            date:    e.published?.$t
                       ? new Date(e.published.$t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                       : '',
            summary: summary ? summary + (rawSummary.length > 220 ? '…' : '') : '',
            url:     altLink?.href || PUBLIC_URL,
            tags,
            thumbnail,
          }
        })
        setPosts(parsed)
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, failed }
}

/* ── Loading skeleton ── */
function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div style={{ width: 70, height: 18, borderRadius: 6, background: 'var(--bg-tag)' }} />
        <div style={{ width: 80, height: 14, borderRadius: 4, background: 'var(--bg-tag)' }} />
      </div>
      <div style={{ height: 18, borderRadius: 4, background: 'var(--bg-tag)', marginBottom: 8, width: '85%' }} />
      <div style={{ height: 14, borderRadius: 4, background: 'var(--bg-tag)', marginBottom: 6, width: '95%' }} />
      <div style={{ height: 14, borderRadius: 4, background: 'var(--bg-tag)', marginBottom: 6, width: '75%' }} />
      <div style={{ height: 14, borderRadius: 4, background: 'var(--bg-tag)', width: '60%' }} />
    </div>
  )
}

/* ── Blogger post card ── */
function BloggerCard({ post }) {
  return (
    <div
      className="glass rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      {post.thumbnail && (
        <div style={{ height: 150, overflow: 'hidden', background: 'var(--bg-tag)' }}>
          <img
            src={post.thumbnail}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className="open-sans font-semibold"
            style={{
              fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#f97316', background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.2)', borderRadius: 6, padding: '3px 10px',
            }}
          >
            Blogger
          </span>
          <span className="open-sans" style={{ fontSize: '0.72rem', color: 'var(--text-4)' }}>{post.date}</span>
        </div>

        <h3 className="poppins font-bold mb-3 leading-snug" style={{ fontSize: '0.95rem', color: 'var(--text-1)', letterSpacing: '0.01em' }}>
          {post.title}
        </h3>

        {post.summary && (
          <p className="open-sans mb-4 leading-relaxed flex-1" style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>
            {post.summary}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}

        <button
          onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
          className="flex items-center gap-1.5 open-sans font-semibold transition-colors duration-200 mt-auto"
          style={{ fontSize: '0.75rem', color: 'var(--text-4)', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'none', border: 'none', padding: 0 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.textShadow = 'var(--text-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-4)'; e.currentTarget.style.textShadow = 'none' }}
        >
          <ExternalLink size={13} /> Read Full Post
        </button>
      </div>
    </div>
  )
}

/* ── Empty / error state ── */
function TravelEmpty({ failed }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✈️</div>
      <h3 className="poppins font-bold mb-3" style={{ fontSize: '1.1rem', color: 'var(--text-1)' }}>
        {failed ? 'Could Not Load Posts' : 'Adventures Coming Soon'}
      </h3>
      <p className="open-sans mb-6 leading-relaxed" style={{ fontSize: '0.85rem', color: 'var(--text-3)', maxWidth: 360 }}>
        {failed
          ? 'Your Blogger posts will appear here automatically once your blog is public and has posts.'
          : 'Travel stories, country tours and personal experiences will appear here automatically as you publish on Blogger.'}
      </p>
      <button
        onClick={() => window.open(PUBLIC_URL, '_blank', 'noopener,noreferrer')}
        className="btn-main"
      >
        Visit My Blog
        <span className="btn-icon"><ExternalLink size={13} /></span>
      </button>
    </div>
  )
}

/* ── Travel tab (auto-fetch) ── */
function TravelTab() {
  const { posts, loading, failed } = useBloggerPosts()

  if (loading) {
    return (
      <div>
        <div className="grid gap-5 sm:grid-cols-2 mb-4">
          {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
        </div>
        <div className="flex justify-center mt-2">
          <Loader size={18} style={{ color: 'var(--text-4)', animation: 'spin 1s linear infinite' }} />
        </div>
      </div>
    )
  }

  if (!posts.length) return <TravelEmpty failed={failed} />

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {posts.map(post => <BloggerCard key={post.id} post={post} />)}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.open(PUBLIC_URL, '_blank', 'noopener,noreferrer')}
          className="btn-main"
        >
          View All on Blogger
          <span className="btn-icon"><ExternalLink size={13} /></span>
        </button>
      </div>
    </>
  )
}

/* ── Tech post card ── */
function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="glass rounded-2xl p-6 transition-all duration-300"
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="tag">{post.category}</span>
        <span className="open-sans" style={{ fontSize: '0.72rem', color: 'var(--text-4)' }}>{post.date}</span>
      </div>

      <h3 className="poppins font-bold mb-3 leading-snug" style={{ fontSize: '0.95rem', color: 'var(--text-1)', letterSpacing: '0.01em' }}>
        {post.title}
      </h3>

      <p className="open-sans mb-4 leading-relaxed" style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>
        {expanded ? post.full : post.short}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center gap-1.5 open-sans font-semibold transition-colors duration-200"
        style={{ fontSize: '0.75rem', color: 'var(--text-4)', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'none', border: 'none', padding: 0 }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.textShadow = 'var(--text-glow)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-4)'; e.currentTarget.style.textShadow = 'none' }}
      >
        {expanded ? <><ChevronUp size={13} /> Read Less</> : <><ArrowUpRight size={13} /> Read More</>}
      </button>
    </div>
  )
}

/* ── Spinner keyframe (injected once) ── */
const spinStyle = (
  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
)

export default function Blog({ onClose }) {
  const [tab, setTab] = useState('tech')

  return (
    <div className="min-h-full" style={{ background: 'var(--bg-panel)' }}>
      {spinStyle}
      <CloseBtn onClick={onClose} />

      <div style={{ padding: '3.5rem 3.5rem 5rem', maxWidth: 900 }}>
        <SectionHead label="Articles & Stories" title="My" accent="Blog" watermark="Blog" />

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab('tech')}   className={`filter-tab ${tab === 'tech'   ? 'active' : ''}`}>Tech Articles</button>
          <button onClick={() => setTab('travel')} className={`filter-tab ${tab === 'travel' ? 'active' : ''}`}>✈️ Travel & Life</button>
        </div>

        {tab === 'tech'   && (
          <div className="grid gap-5 sm:grid-cols-2">
            {POSTS.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        )}
        {tab === 'travel' && <TravelTab />}
      </div>
    </div>
  )
}
