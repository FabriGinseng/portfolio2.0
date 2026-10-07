import curated from './projects.curated.json'
import { mergeProjects, type Synced } from './merge'
import type { Curated } from './schema'

// Il file generato dal sync è ignorato da git: se manca (es. `npm run dev` appena clonato) si mostrano solo i curati.
const syncedFile = import.meta.glob<Synced[]>('./projects.synced.json', { eager: true, import: 'default' })
const synced = Object.values(syncedFile)[0] ?? []

// La validazione di curated.json sta in merge.test.ts, così zod non finisce nel bundle del sito.
export const projects = mergeProjects(curated as Curated[], synced)
