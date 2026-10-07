// Sync dei Progetti da GitHub: repo pubblici con topic `portfolio` + portfolio.json valido.
// Eseguito da `prebuild` (Node 24 esegue TypeScript direttamente). Vedi docs/wayfinder/SPEC.md.
import { mkdir, writeFile } from 'node:fs/promises'
import { ManifestSchema } from '../src/data/schema.ts'

const OWNER = 'FabriGinseng'
const TOPIC = 'portfolio'
const ICON_OK = /^(?!.*\.\.)[\w./-]+\.(png|jpe?g|svg|webp)$/i // niente "..": le icone vanno scritte in public/

type Repo = { name: string; full_name: string; default_branch: string; html_url: string; pushed_at: string; private: boolean; owner: { avatar_url: string } }

// Errori "GitHub non risponde" = build fallita (resta il deploy precedente); problemi del singolo repo = repo saltato.
export async function sync(f: typeof fetch, token?: string, warn: (m: string) => void = console.warn) {
  const get = (url: string, auth = false) =>
    f(url, { headers: auth && token ? { Authorization: `Bearer ${token}` } : {}, signal: AbortSignal.timeout(10_000) })

  const q = encodeURIComponent(`user:${OWNER} topic:${TOPIC} fork:false archived:false`)
  const res = await get(`https://api.github.com/search/repositories?q=${q}&per_page=100`, true)
  if (!res.ok) throw new Error(`GitHub search: HTTP ${res.status}`)
  const body = (await res.json()) as { incomplete_results: boolean; items: Repo[] }
  if (body.incomplete_results) throw new Error('GitHub search: risultati incompleti')

  const raw = async (r: Repo, path: string) => {
    const r2 = await get(`https://raw.githubusercontent.com/${r.full_name}/${r.default_branch}/${path}`)
    if (r2.status === 404) return null
    if (!r2.ok) throw new Error(`${r.full_name}/${path}: HTTP ${r2.status}`)
    return r2
  }

  const projects: unknown[] = []
  const icons: Record<string, Uint8Array> = {} // nome file -> contenuto
  for (const r of body.items.filter((r) => !r.private)) {
    const file = await raw(r, 'portfolio.json')
    if (!file) { warn(`${r.full_name}: ha il topic ma manca portfolio.json, saltato`); continue }
    let json: unknown
    try { json = await file.json() } catch { warn(`${r.full_name}: portfolio.json non è JSON valido, saltato`); continue }
    const parsed = ManifestSchema.safeParse(json)
    if (!parsed.success) { warn(`${r.full_name}: portfolio.json non valido (${parsed.error.issues.map((i) => i.path.join('.') + ' ' + i.message).join('; ')}), saltato`); continue }

    let icon = r.owner.avatar_url // ripiego
    const wanted = parsed.data.icon
    if (wanted) {
      const img = ICON_OK.test(wanted) && !wanted.startsWith('/') ? await raw(r, wanted) : null
      if (img) {
        const name = `${r.name}-${wanted.split('/').pop()}`.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
        icons[name] = new Uint8Array(await img.arrayBuffer())
        icon = `/img/synced/${name}`
      } else warn(`${r.full_name}: icona "${wanted}" non valida o non trovata, uso l'avatar`)
    }
    projects.push({ id: r.name.toLowerCase(), repo: r.full_name, pushedAt: r.pushed_at, ...parsed.data, icon, liveUrl: parsed.data.liveUrl ?? r.html_url })
  }
  return { projects, icons }
}

if (import.meta.main) {
  if (process.env.SKIP_SYNC) { console.log('sync: saltato (SKIP_SYNC)'); process.exit(0) }
  const token = process.env.GITHUB_TOKEN
  if (!token) console.warn('sync: GITHUB_TOKEN assente, uso l\'API senza autenticazione (limiti più bassi)')
  try {
    const { projects, icons } = await sync(fetch, token)
    await mkdir('public/img/synced', { recursive: true })
    for (const [name, data] of Object.entries(icons)) await writeFile(`public/img/synced/${name}`, data)
    await writeFile('src/data/projects.synced.json', JSON.stringify(projects, null, 2) + '\n')
    console.log(`sync: ${projects.length} progetti da GitHub`)
  } catch (e) {
    console.error('sync fallito:', e instanceof Error ? e.message : e)
    process.exit(1)
  }
}
