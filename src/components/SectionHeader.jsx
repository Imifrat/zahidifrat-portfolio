export default function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-indigo-400 text-sm font-semibold tracking-wide">
          {number}.
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{title}</h2>
        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-slate-700/80 to-transparent max-w-xs" />
      </div>
      {subtitle && (
        <p className="text-slate-500 text-sm ml-7">{subtitle}</p>
      )}
    </div>
  )
}
