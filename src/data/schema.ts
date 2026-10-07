import { z } from 'zod'

// Forma di un Progetto: la stessa per il Manifest (portfolio.json) e per i Progetti curati.
export const ManifestSchema = z.object({
  title: z.string().min(1),
  description: z.object({ it: z.string().min(1), en: z.string().min(1) }),
  technologies: z.array(z.string().min(1)).min(1),
  icon: z.string().optional(),
  liveUrl: z.url().optional(),
  order: z.number().optional(),
})

export const CuratedSchema = ManifestSchema.extend({
  id: z.string().min(1),
  // "owner/nome": se un sincronizzato ha lo stesso repo, vince il curato.
  repo: z.string().regex(/^[^/]+\/[^/]+$/).optional(),
})

export type Manifest = z.infer<typeof ManifestSchema>
export type Curated = z.infer<typeof CuratedSchema>
