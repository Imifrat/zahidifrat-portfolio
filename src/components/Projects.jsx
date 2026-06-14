import { useState, useEffect } from 'react'
import { ExternalLink, Star, GitFork } from 'lucide-react'
import { GitHubIcon } from './Icons'

const langColors = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Rust: '#dea584',
  Go: '#00ADD8',
}

function SkeletonCard() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-slate-700 rounded w-full mb-2" />
      <div className="h-3 bg-slate-700 rounded w-2/3 mb-6" />
      <div className="flex gap-3">
        <div className="h-3 bg-slate-700 rounded w-16" />
        <div className="h-3 bg-slate-700 rounded w-10" />
      </div>
    </div>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/Imifrat/repos?sort=updated&per_page=6')
      .then(r => {
        if (!r.ok) throw new Error('GitHub API error')
        return r.json()
      })
      .then(data => {
        setRepos(data.filter(r => !r.fork))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="py-28 px-6 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">What I Build</p>
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-slate-400">Recent work from my GitHub</p>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <p className="text-center text-slate-400 py-8">
            Could not load projects from GitHub. Visit{' '}
            <a href="https://github.com/Imifrat" target="_blank" rel="noreferrer"
               className="text-blue-400 hover:underline">
              github.com/Imifrat
            </a>{' '}
            directly.
          </p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="text-center text-slate-400 py-8">No public repositories found.</p>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map(repo => (
              <div
                key={repo.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-base leading-tight pr-3">
                    {repo.name}
                  </h3>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-blue-400 transition-colors shrink-0"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-5">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/60">
                  <div className="flex items-center gap-4 text-slate-500 text-xs">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: langColors[repo.language] || '#6b7280' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    <GitHubIcon size={13} /> View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <a
            href="https://github.com/Imifrat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <GitHubIcon size={18} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
