# Portfolio

Sito personale di Antonio Fabrizio Fiume, in italiano e inglese. Online su Vercel, pubblicato da `main`.

## Stack

Vue 3 · TypeScript · Vite 7 · Tailwind 4 · vue-i18n · EmailJS (form contatti) · Zod (schema dei Progetti, solo in build e nei test).

## Avvio

```bash
npm install
npm run dev
SKIP_SYNC=1 npm run build   # build senza chiamare GitHub
npm test
```

`npm run build` esegue prima `prebuild` (sync dei Progetti da GitHub, vedi sotto); con `SKIP_SYNC=1` lo salta. Il form contatti legge `VITE_EMAILJS_SERVICE_ID` e `VITE_EMAILJS_TEMPLATE_ID` da `.env` (modello in `.env.example`; template: `from_name`, `reply_to`, `message`).

## Progetti

Un solo elenco, unito da `src/data/projects.ts`:

- `src/data/projects.curated.json`: Progetti scritti a mano (anche privati, come My Book Club). Il primo per `order` è il Progetto in primo piano.
- `src/data/projects.synced.json`: generato da `scripts/sync-projects.ts` dai repo GitHub con topic `portfolio` e un `portfolio.json` valido (ignorato da git).
- Un'Action (`.github/workflows/rebuild.yml`) ricostruisce il sito ogni giorno alle 06:17 UTC tramite l'API di Vercel.

Vocabolario in `GLOSSARY.md`, specifica in `docs/wayfinder/SPEC.md`.

## Grafica

Direzione «solo tipografia»: nome enorme, campi di colore intero (salvia e carbone, con tema chiaro), dorsi colorati come i Generi di My Book Club. Font Bricolage Grotesque e Geist; palette e token in `src/style.css`. Le immagini trovate (mappa di Napoli 1754, porto di Napoli, biblioteca) hanno fonte e licenza in `docs/credits.json` e il credito nel footer.

## Struttura

```
src/components/   sezioni della pagina (Hero, About, Projects, Experience, Contact, Footer, Header)
src/composables/  useTheme (tema chiaro/scuro), useReveal (comparsa allo scroll)
src/data/         schema, merge e file dei Progetti
src/i18n/         testi in italiano e inglese
scripts/          sync dei Progetti da GitHub
docs/             specifica, mappa wayfinder, crediti immagini
```

Regole di lavoro per chi modifica il codice: `CLAUDE.md`.
