import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './Icons'

const contacts = [
  {
    Icon: Mail,
    label: 'Email',
    display: 'zahid.ifrat@gmail.com',
    href: 'mailto:zahid.ifrat@gmail.com',
    external: false,
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    display: 'linkedin.com/in/zahidifrat',
    href: 'https://linkedin.com/in/zahidifrat',
    external: true,
  },
  {
    Icon: GitHubIcon,
    label: 'GitHub',
    display: 'github.com/Imifrat',
    href: 'https://github.com/Imifrat',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">Let's Talk</p>
        <h2 className="text-4xl font-bold mb-5">
          Get in <span className="text-blue-400">Touch</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-16 max-w-xl mx-auto">
          Open to new opportunities, collaborations, and conversations about
          automotive software and cybersecurity. Feel free to reach out.
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {contacts.map(({ Icon, label, display, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="bg-slate-800 border border-slate-700 rounded-xl p-7 hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-slate-700 group-hover:bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                <Icon className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
              </div>
              <p className="text-white font-semibold mb-1.5">{label}</p>
              <p className="text-slate-400 text-xs break-all">{display}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
