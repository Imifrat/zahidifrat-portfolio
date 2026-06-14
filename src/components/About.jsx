import { GraduationCap, MapPin } from 'lucide-react'

const skillGroups = [
  {
    label: 'Programming',
    skills: ['Python', 'C / C++', 'Bash', 'MATLAB'],
  },
  {
    label: 'Automotive',
    skills: ['AUTOSAR', 'dSpace SystemDesk', 'VEOS', 'CAN / LIN / Ethernet', 'Vector CANalyzer'],
  },
  {
    label: 'Cybersecurity',
    skills: ['ISO 21434', 'TARA', 'Penetration Testing', 'Secure Coding'],
  },
  {
    label: 'Tools & Platforms',
    skills: ['Git', 'Linux', 'CMake', 'Jenkins', 'Docker'],
  },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="text-4xl font-bold">
            About <span className="text-blue-400">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-slate-300 text-lg leading-relaxed mb-5">
              I'm an Automotive Software Engineer driven by the challenge of making
              vehicles smarter, safer, and more secure. My work sits at the intersection
              of embedded software, automotive standards, and modern cybersecurity practices.
            </p>
            <p className="text-slate-400 leading-relaxed mb-10">
              From designing AUTOSAR-compliant software architectures to conducting
              threat analysis and risk assessments (TARA), I enjoy tackling complex
              engineering problems that have real-world impact on how we build and
              protect tomorrow's vehicles.
            </p>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-base font-semibold text-slate-200 mb-5 flex items-center gap-2">
                <GraduationCap className="text-blue-400" size={20} />
                Education
              </h3>
              <div className="pl-1">
                <p className="text-white font-semibold">MSc Automotive Software Engineering</p>
                <p className="text-slate-400 text-sm flex items-center gap-1 mt-1.5">
                  <MapPin size={13} className="text-blue-400 shrink-0" />
                  Germany
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-7">
            {skillGroups.map(group => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      className="bg-slate-800 border border-slate-700 text-slate-300 rounded-full px-3.5 py-1.5 text-sm hover:border-blue-500/60 hover:text-blue-300 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
