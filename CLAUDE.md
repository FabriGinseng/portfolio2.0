# Portfolio

Sito personale di Antonio Fabrizio Fiume (Vue 3, Vite, Tailwind 4, TypeScript), in italiano e inglese. Il progetto in primo piano è My Book Club; gli altri sono dorsi su uno scaffale.

## Read first
- `GLOSSARY.md`: vocabolario (Progetto, Progetto curato, Progetto sincronizzato, Manifest, Agente di redazione).
- `docs/wayfinder/SPEC.md` e `map.md`: sync dei Progetti da GitHub (Parte A, fatta) e agente di redazione (Parte B, repo separato).
- `docs/credits.json`: fonte e licenza delle immagini trovate nelle collezioni aperte; i crediti compaiono nel footer.
- Stato nel second brain: `~/second-brain/projects/portfolio/STATE.md` e `decisions.md`.

## Working rules
- Lavoro grafico: usa sempre insieme le skill `design-taste-frontend` e `frontend-design`; tema chiaro e scuro, ogni testo visibile in italiano e inglese (`src/i18n/locales/`), `prefers-reduced-motion` rispettato, focus visibile.
- Regole di stile (le misura `design-taste-frontend/scripts/inspect.mjs`): niente righe sottili, gradienti, ombre a riposo, monospace, etichette in maiuscolo, icone in riquadri; titoli su due righe al massimo. Palette e font stanno in `src/style.css`.
- `Projects.vue` legge solo `projects` da `@/data/projects`. Il Progetto con `order` più basso è quello in primo piano (campo `image` opzionale).
- Nessuna dipendenza nuova senza chiedere.
- Test: `npm test`. Build locale: `SKIP_SYNC=1 npm run build` (senza, `prebuild` chiama l'API di GitHub). Prima di dire «fatto» esegui entrambi e, per la grafica, `inspect.mjs` sulla build (`npx vite preview`).
- Vercel pubblica da `main`: merge, push e deploy solo dopo il sì del proprietario.
- Non committare `.env`; `.taste-skill/` e `projects.synced.json` sono ignorati da git.
- Il sito e `~/second-brain/memory/about-me.md` raccontano le stesse cose: se cambia uno (nuovo progetto, ruolo, titolo), aggiorna anche l'altro.
