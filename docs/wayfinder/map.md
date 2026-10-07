# Mappa: Progetti del portfolio da GitHub (+ agente)

Label: `wayfinder:map` · Tracker: markdown locale (`docs/wayfinder/`) · Creata: 2026-10-07

## Destination

Una **specifica pronta da implementare** per (1) sincronizzare in fase di build i Progetti del sito dai repo GitHub, e (2) un Agente di redazione in LangGraph che propone i Manifest. Nessun codice di produzione fino a mappa chiusa.

## Notes

- Dominio: portfolio Vue 3 + Vite + Tailwind v4, i18n IT/EN, deploy statico (probabile Vercel). Vocabolario in [GLOSSARY.md](../../GLOSSARY.md).
- Preferenza dell'utente per questa mappa: **spiegare ogni passaggio** (in italiano, termini tecnici chiariti) soprattutto sui ticket dell'agente. L'utente vuole esercitarsi con **LangGraph.js**.
- Per i ticket HITL usare le skill "grilling" e "domain-modeling".
- Decisioni prese in fase di tracciamento (non hanno ticket):
  - Esito: solo decisioni e specifica, nessun prototipo di produzione.
  - Selezione repo: topic GitHub `portfolio`.
  - Testi: file `portfolio.json` nel repo, con descrizioni IT/EN, stack e icona.
  - Aggiornamento: a ogni build (script che interroga GitHub + GitHub Action che ricostruisce), non a runtime.
  - Progetti curati e sincronizzati convivono in **un unico file dati**, che sostituisce l'accoppiamento per indice tra `Projects.vue`, `it.json` e `en.json`.
  - L'agente è la fase 2 della stessa mappa, bloccata dallo schema del Manifest.
  - Agente: LangGraph (non ciclo semplice), PR di revisione sul repo del progetto come cancello umano.
  - Tracker: markdown locale.

## Decisions so far

<!-- una riga per ticket chiuso -->

- [01 Schema del Manifest](tickets/01-schema-manifest.md): obbligatori `title`, `description` (it/en), `technologies`; facoltativi `icon` (percorso nel repo, ripiego avatar), `liveUrl`, `order`; solo repo pubblici; link della card = `liveUrl` o repo; si nasconde togliendo il topic; schema Zod unico.

- [04 Unico file dati e migrazione](tickets/04-file-dati-unico.md): due file sorgente (`projects.curated.json` a mano, `projects.synced.json` generato e ignorato da git) uniti da `src/data/projects.ts`; il curato vince sui duplicati tramite `repo`; `order` a passi di 10; tutti gli otto progetti restano curati, `progetto-tesi` è il primo collaudo del sync; un test con `node:test`.
- [07 Dove gira l'agente](tickets/07-dove-gira-agente.md): comando locale con approvazione nel terminale (`MemorySaver`, nessun segreto in Actions); repo separato; Gemini per cominciare, modello in una variabile; token fine-grained solo repo selezionati, scadenza 30–90 giorni; `--dry-run`; un repo per esecuzione con limiti fissi.
- [06 Disegno del grafo dell'agente](tickets/06-grafo-agente.md): StateGraph `selezionaRepo` → `esploraRepo` → `scriviBozza` → `validaBozza` (codice, max 2 tentativi) → `chiediApprovazione` (interrupt) → `apriPR` (nodo separato e idempotente); "approva con modifiche" = una sola approvazione; rifiuto non ricordato; scarto silenzioso dopo 2 tentativi. Prototipo: [prototypes/06-grafo-agente-PROTOTIPO.html](prototypes/06-grafo-agente-PROTOTIPO.html).
- [05 Sync in build e trigger di rebuild](tickets/05-sync-build.md): `prebuild` su Vercel; ricerca API per topic + file da `raw.githubusercontent.com`; solo repo pubblici non fork né archiviati; Manifest invalido = repo saltato con avviso; GitHub giù = build fallita (resta il deploy precedente); Action giornaliera + bottone manuale che chiama il Deploy Hook; PAT di sola lettura su Vercel.
- [02 Fatti su GitHub API e Actions](tickets/02-ricerca-github-api.md): topic via `GET /search/repositories?q=user:X+topic:portfolio`; GITHUB_TOKEN vale solo per il repo del workflow, per gli altri serve un PAT fine-grained (Contents read/write, Pull requests write); cron minimo 5 min e sospeso dopo 60 giorni di inattività; rebuild Vercel via Deploy Hook come secret. Dettaglio: [research/02-github-api.md](research/02-github-api.md).
- [03 Fatti su LangGraph.js](tickets/03-ricerca-langgraph.md): `StateGraph` per imparare e per il cancello umano (`createAgent` è il livello alto); pausa con `interrupt()` + `Command({resume})` e stesso `thread_id`, il nodo riparte dall'inizio; modelli via `@langchain/anthropic` o `@langchain/google`. Snippet da ricontrollare. Dettaglio: [research/03-langgraph.md](research/03-langgraph.md).

## Frontier (ticket aperti e sbloccati)

_Nessun ticket aperto: la strada fino alla destinazione è chiara. Vedi [SPEC.md](SPEC.md)._

## Not yet specified

_Niente di ancora da decidere per arrivare alla destinazione._ Da verificare solo in implementazione (fatti, non decisioni): limiti attuali della fascia gratuita di Gemini, ID del modello, versioni minime di `langchain` e `@langchain/langgraph`, snippet LangGraph da ricontrollare.

## Out of scope

- Chatbot pubblico sul sito che risponde sul CV (RAG): costo per visitatore e rischio di abuso. Ripartirebbe come mappa nuova.
- Altre automazioni emerse (CV PDF generato dagli stessi dati del sito, immagini Open Graph, controllo link rotti, statistiche GitHub): efforts a parte; il file dati del ticket 04 le rende possibili.
- Aggiornamento a runtime dal browser: scartato, espone al limite di richieste dell'API GitHub e rallenta la pagina.
