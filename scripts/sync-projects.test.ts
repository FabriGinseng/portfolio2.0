import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sync } from './sync-projects.ts'

const repo = (name: string, extra = {}) => ({
  name, full_name: `FabriGinseng/${name}`, default_branch: 'main', html_url: `https://github.com/FabriGinseng/${name}`,
  pushed_at: '2026-01-01T00:00:00Z', private: false, owner: { avatar_url: 'https://avatar/x' }, ...extra,
})
const manifest = { title: 'T', description: { it: 'i', en: 'e' }, technologies: ['Vue'] }

// fetch finto: url che contiene la chiave -> risposta
const fakeFetch = (routes: Record<string, () => Response>) =>
  (async (url: string) => {
    const hit = Object.keys(routes).find((k) => String(url).includes(k))
    return hit ? routes[hit]() : new Response('', { status: 404 })
  }) as unknown as typeof fetch
const search = (items: unknown[], extra = {}) => () => Response.json({ incomplete_results: false, items, ...extra })

test('Manifest valido: progetto creato, liveUrl di ripiego = repo, icona di ripiego = avatar', async () => {
  const f = fakeFetch({ 'search/repositories': search([repo('ok')]), 'ok/main/portfolio.json': () => Response.json(manifest) })
  const { projects } = await sync(f, undefined, () => {})
  assert.deepEqual(projects, [{ id: 'ok', repo: 'FabriGinseng/ok', pushedAt: '2026-01-01T00:00:00Z', ...manifest, icon: 'https://avatar/x', liveUrl: 'https://github.com/FabriGinseng/ok' }])
})

test('Manifest assente o invalido: repo saltato con avviso, gli altri restano', async () => {
  const avvisi: string[] = []
  const f = fakeFetch({
    'search/repositories': search([repo('manca'), repo('rotto'), repo('ok')]),
    'rotto/main/portfolio.json': () => Response.json({ title: 'solo titolo' }),
    'ok/main/portfolio.json': () => Response.json(manifest),
  })
  const { projects } = await sync(f, undefined, (m) => avvisi.push(m))
  assert.deepEqual(projects.map((p: any) => p.id), ['ok'])
  assert.equal(avvisi.length, 2)
})

test('repo privati ignorati; icona con ".." rifiutata (ripiego avatar)', async () => {
  const f = fakeFetch({
    'search/repositories': search([repo('priv', { private: true }), repo('ok')]),
    'ok/main/portfolio.json': () => Response.json({ ...manifest, icon: '../../etc/x.png' }),
  })
  const { projects, icons } = await sync(f, undefined, () => {})
  assert.deepEqual(projects.map((p: any) => [p.id, p.icon]), [['ok', 'https://avatar/x']])
  assert.deepEqual(icons, {})
})

test('GitHub non risponde (HTTP 500 o rete): sync lancia, la build deve fallire', async () => {
  await assert.rejects(sync(fakeFetch({ 'search/repositories': () => new Response('', { status: 500 }) }), undefined, () => {}), /HTTP 500/)
  await assert.rejects(sync((async () => { throw new Error('rete') }) as unknown as typeof fetch, undefined, () => {}), /rete/)
})
