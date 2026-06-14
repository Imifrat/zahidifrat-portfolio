import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react'
import { CloseBtn, SectionHead } from './About'

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

function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="glass rounded-2xl p-6 transition-all duration-300"
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      {/* Category + date row */}
      <div className="flex items-center justify-between mb-3">
        <span className="tag">{post.category}</span>
        <span className="open-sans" style={{ fontSize: '0.65rem', color: 'var(--text-4)' }}>{post.date}</span>
      </div>

      {/* Title */}
      <h3
        className="poppins font-bold mb-3 leading-snug"
        style={{ fontSize: '0.85rem', color: 'var(--text-1)', letterSpacing: '0.01em' }}
        data-hover
      >
        {post.title}
      </h3>

      {/* Description */}
      <p className="open-sans mb-4 leading-relaxed" style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>
        {expanded ? post.full : post.short}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      {/* Read More toggle */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center gap-1.5 open-sans font-semibold transition-colors duration-200"
        style={{ fontSize: '0.7rem', color: 'var(--text-4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.textShadow = 'var(--text-glow)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-4)'; e.currentTarget.style.textShadow = 'none' }}
      >
        {expanded ? (
          <><ChevronUp size={13} /> Read Less</>
        ) : (
          <><ArrowUpRight size={13} /> Read More</>
        )}
      </button>
    </div>
  )
}

export default function Blog({ onClose }) {
  return (
    <div className="min-h-full" style={{ background: 'var(--bg-panel)' }}>
      <CloseBtn onClick={onClose} />

      <div style={{ padding: '3.5rem 3.5rem 5rem', maxWidth: 880 }}>
        <SectionHead label="Articles & Notes" title="My" accent="Blog" watermark="Blog" />

        <div className="grid gap-5 sm:grid-cols-2">
          {POSTS.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  )
}
