import { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from './context/ThemeContext'

import Preloader from './components/Preloader'
import LeftPanel from './components/LeftPanel'
import Sidebar   from './components/Sidebar'
import Hero      from './components/Hero'
import About     from './components/About'
import Projects  from './components/Projects'
import Blog      from './components/Blog'
import Contact   from './components/Contact'

/* ── Glass ring cursor ── */
function CustomCursor() {
  const ring = useRef(null)
  const dot  = useRef(null)

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0
    const onMove = e => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const loop = () => {
      rx += (x - rx) * 0.14
      ry += (y - ry) * 0.14
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      if (dot.current)  dot.current.style.transform  = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onEnter = () => {
      if (ring.current) { ring.current.style.width = '38px'; ring.current.style.height = '38px'; ring.current.style.borderColor = 'var(--cursor-ring-hover)' }
    }
    const onLeave = () => {
      if (ring.current) { ring.current.style.width = '28px'; ring.current.style.height = '28px'; ring.current.style.borderColor = 'var(--cursor-ring)' }
    }
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const ringStyle = {
    position:        'fixed',
    width:           28,
    height:          28,
    borderRadius:    '50%',
    border:          '1px solid var(--cursor-ring)',
    background:      'transparent',
    top:             -14,
    left:            -14,
    pointerEvents:   'none',
    zIndex:          9998,
    willChange:      'transform',
    transition:      'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
  }
  const dotStyle = {
    position:        'fixed',
    width:           5,
    height:          5,
    borderRadius:    '50%',
    background:      'var(--text-3)',
    top:             -2.5,
    left:            -2.5,
    pointerEvents:   'none',
    zIndex:          9999,
    willChange:      'transform',
  }

  return (
    <>
      <div ref={ring} style={ringStyle} />
      <div ref={dot}  style={dotStyle} />
    </>
  )
}

/* ── Root ── */
export default function App() {
  const [active,  setActive]  = useState(null)
  const [leaving, setLeaving] = useState(false)

  const navigate = id => {
    const next = id === 'home' ? null : id
    if (next === active) return
    if (active !== null) {
      setLeaving(true)
      setTimeout(() => { setActive(next); setLeaving(false) }, 350)
    } else {
      setActive(next)
    }
  }

  return (
    <ThemeProvider>
      <Preloader />
      <CustomCursor />

      <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
        <LeftPanel />

        <div className="flex-1 relative overflow-hidden">
          {/* Hero always in background */}
          <div className="absolute inset-0">
            <Hero
              onAbout={  () => navigate('about')}
              onContact={() => navigate('contact')}
            />
          </div>

          {/* Active section panel */}
          {active !== null && (
            <div
              key={active}
              className={`absolute inset-0 z-10 panel-scroll ${leaving ? 'panel-out' : 'panel-in'}`}
              style={{ background: 'var(--bg-panel)' }}
            >
              {active === 'about'    && <About    onClose={() => navigate('home')} />}
              {active === 'projects' && <Projects onClose={() => navigate('home')} />}
              {active === 'blog'     && <Blog     onClose={() => navigate('home')} />}
              {active === 'contact'  && <Contact  onClose={() => navigate('home')} />}
            </div>
          )}

          <Sidebar active={active || 'home'} onNavigate={navigate} />
        </div>
      </div>
    </ThemeProvider>
  )
}
