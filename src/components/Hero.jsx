import { ArrowDown, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './Icons'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.03)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
          Automotive Software Engineer
        </p>
        <h1 className="text-6xl md:text-8xl font-bold mb-5 leading-none">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Zahid Ifrat
          </span>
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8 rounded-full" />
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Passionate about building robust software solutions for the automotive domain.
          Specialising in AUTOSAR architecture, embedded systems, and cybersecurity —
          currently pursuing my MSc in Automotive Software Engineering in Germany.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-7 py-3 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
        <div className="flex gap-6 justify-center text-slate-500">
          <a href="https://github.com/Imifrat" target="_blank" rel="noreferrer"
            className="hover:text-blue-400 transition-colors hover:-translate-y-0.5 transform duration-200">
            <GitHubIcon size={22} />
          </a>
          <a href="https://linkedin.com/in/zahidifrat" target="_blank" rel="noreferrer"
            className="hover:text-blue-400 transition-colors hover:-translate-y-0.5 transform duration-200">
            <LinkedInIcon size={22} />
          </a>
          <a href="mailto:zahid.ifrat@gmail.com"
            className="hover:text-blue-400 transition-colors hover:-translate-y-0.5 transform duration-200">
            <Mail size={22} />
          </a>
        </div>
      </div>

      <a href="#about" className="absolute bottom-10 text-slate-600 hover:text-blue-400 transition-colors animate-bounce">
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
