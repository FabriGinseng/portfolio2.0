# Specifica: Progetti da GitHub + Agente di redazione

Destinazione della [mappa](map.md). Ogni punto rimanda al ticket che contiene il ragionamento. Creata: 2026-10-07. Vocabolario in [GLOSSARY.md](../../GLOSSARY.md).

## Parte A: sync dei Progetti nel sito (repo `portfolio2.0`)

1. **Manifest** `portfolio.json` nella radice di ogni repo con topic `portfolio`: obbligatori `title`, `description.it/en`, `technologies`; facoltativi `icon` (percorso nel repo, ripiego avatar), `liveUrl`, `order`. Schema Zod unico. → [01](tickets/01-schema-manifest.md)
2. **Dati**: `src/data/projects.curated.json` (a mano, schema del Manifest + `id`, `repo` facoltativo) e `src/data/projects.synced.json` (generato, ignorato da git), uniti da `src/data/projects.ts`. Il curato vince sui duplicati; `order` a passi di 10; in assenza di `order`, ultimo push. `Projects.vue` legge solo l'elenco unito; si rimuove `projects.items` dalle traduzioni. Un test con `node:test`. → [04](tickets/04-file-dati-unico.md)
3. **Sync** agganciato a `prebuild`: ricerca API (`user:FabriGinseng topic:portfolio fork:false archived:false`), file e icone da `raw.githubusercontent.com`; Manifest invalido = repo saltato con avviso; GitHub non risponde = build fallita (resta il deploy precedente); PAT di sola lettura come `GITHUB_TOKEN` su Vercel. → [05](tickets/05-sync-build.md), fatti in [research/02](research/02-github-api.md)
4. **Rebuild**: GitHub Action giornaliera (es. 06:17 UTC) più `workflow_dispatch`, che chiama il Deploy Hook di Vercel (secret). → [05](tickets/05-sync-build.md)
5. **Migrazione**: gli otto Progetti attuali restano curati; `progetto-tesi` è il primo collaudo (Manifest + topic, poi si toglie la voce curata). → [04](tickets/04-file-dati-unico.md)

## Parte B: Agente di redazione (repo separato)

1. **Grafo LangGraph** (`StateGraph`): `selezionaRepo` → `esploraRepo` → `scriviBozza` → `validaBozza` → `chiediApprovazione` (interrupt) → `apriPR` → fine. Archi condizionali e regole nel ticket. `apriPR` in nodo separato e idempotente. Prototipo: [prototypes/06-grafo-agente-PROTOTIPO.html](prototypes/06-grafo-agente-PROTOTIPO.html). → [06](tickets/06-grafo-agente.md), concetti in [research/03](research/03-langgraph.md)
2. **Esecuzione**: comando locale `npm run agente [-- <repo>]`, approvazione nel terminale, `MemorySaver`; `--dry-run` stampa la bozza senza aprire PR. Un repo per esecuzione; limiti: elenco 20 file, 2 file letti da 4 KB, 2 tentativi. → [07](tickets/07-dove-gira-agente.md)
3. **Modello**: Gemini per cominciare, nome in un'unica variabile. **Token** di scrittura fine-grained, solo repo selezionati, `.env` fuori da git. → [07](tickets/07-dove-gira-agente.md)
4. **Qualità**: confronto delle bozze con i testi a mano di `ecommerce`, `RestMethodsRefit`, `EntropyProject`.

## Ordine di implementazione consigliato

1. Schema Zod + `projects.curated.json` + `projects.ts` + migrazione (visibile subito, nessuna rete).
2. Script di sync + `prebuild` + token su Vercel.
3. Manifest di `progetto-tesi` e topic: primo collaudo reale.
4. Action giornaliera + Deploy Hook.
5. Agente, prima con `--dry-run`, poi con la PR.
