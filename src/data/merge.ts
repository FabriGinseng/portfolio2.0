import type { Curated } from './schema'

// Un Progetto sincronizzato è un curato con in più `repo` (obbligatorio) e l'ultimo push.
export type Synced = Curated & { repo: string; pushedAt?: string }
export type Project = Curated | Synced

const byRepo = (p: Project) => p.repo?.toLowerCase()

// Il curato vince sui duplicati; poi `order` crescente, poi (senza order) ultimo push decrescente.
export function mergeProjects(curated: Curated[], synced: Synced[]): Project[] {
  const taken = new Set(curated.map(byRepo).filter(Boolean))
  const all: Project[] = [...curated, ...synced.filter((s) => !taken.has(byRepo(s)))]
  const pushed = (p: Project) => ('pushedAt' in p && p.pushedAt ? Date.parse(p.pushedAt) : 0)
  return all.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order
    if (a.order !== undefined) return -1
    if (b.order !== undefined) return 1
    return pushed(b) - pushed(a)
  })
}
