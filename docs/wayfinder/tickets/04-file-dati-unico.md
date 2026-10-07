---
type: grilling (HITL)
status: closed
claimed-by: fabriGinseng
blocked-by: []
---

# 04 Unico file dati e migrazione

## Question

Come è fatto il file dati unico che contiene Progetti curati e sincronizzati, e come si migrano gli 8 progetti di oggi (ora legati per indice tra `Projects.vue`, `it.json`, `en.json`)? Il file generato dal sync è committato o ignorato? In che ordine appaiono i progetti e chi vince in caso di duplicato?

## Resolution

Chiuso il 2026-10-07. Tutte le raccomandazioni accettate. Rifinisce la decisione iniziale "file dati unico": un'unica *forma* dei dati, ma due file sorgente.

- **File:** `src/data/projects.curated.json` (scritto a mano) e `src/data/projects.synced.json` (generato). Un modulo `src/data/projects.ts` li unisce in un solo elenco; `Projects.vue` vede solo l'elenco unito.
- **Forma del curato:** stessa del Manifest (`title`, `description` it/en, `technologies`, `icon`, `liveUrl`, `order`) più `id` (slug). Stesso schema Zod per entrambi.
- **Ordine:** `order` con spazio (10, 20, 30…); senza `order` in fondo, per ultimo push decrescente.
- **Migrazione:** titoli e descrizioni passano dai file di traduzione al file dei curati; la sezione `projects.items` di `it.json` ed `en.json` viene rimossa. "Entropia didattica" prende il titolo corto, la parte lunga va nella descrizione.
- **File generato:** ignorato da git, rigenerato a ogni build.
- **Duplicati:** il curato può avere `repo` (es. `FabriGinseng/ecommerce`); se un sincronizzato ha lo stesso repo, vince il curato e l'altro viene scartato.
- **Cosa resta curato:** tutti gli otto di oggi. `progetto-tesi` è il primo collaudo reale del sync: si crea il suo Manifest con topic `portfolio` e solo quando il sito lo mostra bene si toglie la voce curata.
- **Locale:** il modulo tollera l'assenza del file generato (mostra solo i curati); `npm run sync` a mano, agganciato a `prebuild` per `npm run build`.
- **Test:** un solo file con `node:test`, senza dipendenze: il curato vince sul duplicato, `order` ordina bene, chi non ha `order` va in fondo.
