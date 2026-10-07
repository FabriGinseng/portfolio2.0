---
type: grilling (HITL)
status: closed
claimed-by: fabriGinseng
blocked-by: []
---

# 05 Sync in build e trigger di rebuild

## Question

Come funziona lo script di sync a ogni build: da dove prende i repo, come valida i Manifest, cosa fa con quelli invalidi? Quale trigger fa ricostruire il sito (cron, push sul portfolio, evento dai repo) e come si collega al deploy?

## Resolution

Chiuso il 2026-10-07. Tutte le raccomandazioni accettate.

- **Dove gira:** lo script di sync è agganciato a `prebuild` e gira nella build di Vercel. La GitHub Action serve solo a far ripartire Vercel.
- **Come prende i dati:** una ricerca API (`GET /search/repositories`, `user:FabriGinseng topic:portfolio fork:false archived:false`) restituisce repo e `default_branch`; `portfolio.json` e icone si leggono da `raw.githubusercontent.com`, che non conta nel limite di richieste.
- **Repo pubblici soltanto**, fork e archiviati esclusi.
- **Manifest assente, non JSON o non valido secondo lo schema Zod:** quel repo viene saltato con un avviso (nome del repo e motivo) nel log, la build continua.
- **GitHub non risponde** (rete, 5xx, limite superato): la build fallisce, così Vercel mantiene online il deploy precedente con tutti i progetti.
- **Rebuild:** workflow pianificato una volta al giorno a minuto "storto" (es. 06:17 UTC) più `workflow_dispatch` manuale; chiama il Deploy Hook di Vercel, salvato come secret in Actions. Nei repo pubblici GitHub disattiva i cron dopo 60 giorni senza attività nel repo; si riattiva a mano.
- **Token del sync:** PAT fine-grained in sola lettura sui contenuti pubblici, nessun altro permesso, scadenza 1 anno, come variabile `GITHUB_TOKEN` su Vercel. Lo script lo usa se presente, altrimenti avvisa e prova senza (in locale non serve). È distinto dal token di scrittura dell'agente.
