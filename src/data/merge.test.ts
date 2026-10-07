import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { mergeProjects, type Synced } from './merge.ts'
import { CuratedSchema } from './schema.ts'

const base = { description: { it: 'x', en: 'x' }, technologies: ['Vue'] }
const c = (id: string, extra = {}) => ({ id, title: id, ...base, ...extra })
const s = (id: string, repo: string, extra = {}): Synced => ({ ...c(id), repo, ...extra })

test('il curato vince sul sincronizzato con lo stesso repo', () => {
  const out = mergeProjects([c('a', { repo: 'me/Foo', order: 10 })], [s('b', 'ME/foo')])
  assert.deepEqual(out.map((p) => p.id), ['a'])
})

test('order ordina in modo crescente, chi non ce l\'ha va in fondo per ultimo push', () => {
  const out = mergeProjects(
    [c('a', { order: 20 }), c('b', { order: 10 })],
    [s('vecchio', 'me/v', { pushedAt: '2024-01-01' }), s('recente', 'me/r', { pushedAt: '2026-01-01' })],
  )
  assert.deepEqual(out.map((p) => p.id), ['b', 'a', 'recente', 'vecchio'])
})

test('projects.curated.json rispetta lo schema e gli id sono unici', () => {
  const data = JSON.parse(readFileSync(new URL('./projects.curated.json', import.meta.url), 'utf8'))
  const parsed = CuratedSchema.array().parse(data)
  assert.equal(new Set(parsed.map((p) => p.id)).size, parsed.length)
})
