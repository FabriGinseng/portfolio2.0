# 02 Fatti su GitHub API e Actions

Ticket: `docs/wayfinder/tickets/02-ricerca-github-api.md` · Ricerca del 2026-10-07 · Solo fonti primarie (docs.github.com, vercel.com/docs).

## Riepilogo (italiano)

- **Elenco per topic**: una sola chiamata di ricerca, `GET /search/repositories?q=user:<utente>+topic:portfolio`. Ogni risultato include `topics`, `private`, `fork`. In alternativa `GET /user/repos` (con token, include i privati) restituisce `topics` e si filtra lato script. GraphQL esiste ma richiede sempre un token.
- **Limiti**: senza token 60 richieste/ora per IP (ricerca: 10/minuto); con token personale 5.000/ora (ricerca: 30/minuto); `GITHUB_TOKEN` in Actions 1.000/ora per repo. Per un portfolio con pochi repo sono ampiamente sufficienti.
- **Token**: `GITHUB_TOKEN` vale solo per il repo che esegue il workflow, quindi non legge né apre PR su altri repo. Serve un PAT fine-grained (o una GitHub App) con repo selezionati e permessi **Contents: read** (leggere `portfolio.json`), **Contents: write + Pull requests: write** (aprire la PR), **Metadata: read** (automatico). I repo privati vanno selezionati esplicitamente.
- **Cron**: intervallo minimo 5 minuti, solo UTC (o fuso IANA), solo branch di default, può ritardare all'inizio dell'ora, e nei repo pubblici viene disattivato dopo 60 giorni senza attività.
- **Rebuild Vercel**: "Deploy Hook" (Settings > Git): un URL segreto a cui fare `POST` (nessuna auth); limite 60 trigger/ora per progetto, max 5 hook per progetto (Hobby/Pro). Va salvato come secret in Actions.

## 1. Elencare i repo di un utente per topic

**REST, ricerca (consigliato).** Qualificatori `user:` e `topic:` combinabili, es. `user:defunkt forks:>100`; `topic:jekyll`. [Searching for repositories](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories). Endpoint `GET /search/repositories`: la risposta ha il campo `topics` (array di stringhe) oltre a `private`, `fork`, `visibility`. [REST: Search](https://docs.github.com/en/rest/search/search#search-repositories)

- Massimo 100 risultati per pagina (default 30); la ricerca restituisce al massimo 1.000 risultati per query. Esiste `incomplete_results` se la query va in timeout. (stessa pagina)
- I repo privati compaiono solo se la richiesta è autenticata e si ha accesso. (stessa pagina)

**REST, elenco.** `GET /users/{username}/repos` (solo pubblici, `type` default `owner`) e `GET /user/repos` (utente autenticato, include i privati, `visibility`/`affiliation`). Entrambi restituiscono `topics`; `per_page` max 100, paginazione con `page`. Il filtro per topic va fatto lato client. [REST: Repositories](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)

**GraphQL.** Richiede sempre autenticazione (PAT, GitHub App o OAuth app); i permessi dipendono dai dati richiesti. [Forming calls with GraphQL](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql). `first`/`last` tra 1 e 100. [GraphQL limits](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api)

## 2. Limiti di richieste

[Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

| Caso | Limite primario |
|---|---|
| Senza token | 60 richieste/ora (per IP) |
| Utente autenticato (PAT, OAuth, App) | 5.000/ora (Enterprise Cloud: 15.000) |
| `GITHUB_TOKEN` in Actions | 1.000/ora per repository (Enterprise Cloud: 15.000) |

- Ricerca ([REST: Search](https://docs.github.com/en/rest/search/search#search-repositories)): 30 richieste/minuto con token (10/min per `/search/code`); 10/minuto senza token.
- GraphQL: 5.000 punti/ora per utente; `GITHUB_TOKEN` 1.000 punti/ora per repo; accesso non autenticato non previsto. [GraphQL limits](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api)
- Limiti secondari (REST): max 100 richieste concorrenti, 900 punti/minuto, e max 80 richieste di creazione contenuti/minuto e 500/ora (rilevante per commit e PR). (pagina rate limits REST)
- Limite `GITHUB_TOKEN` confermato in [Actions limits](https://docs.github.com/en/actions/reference/limits).

## 3. Token e permessi

**`GITHUB_TOKEN`.** "Limited to the repository that contains your workflow": non accede ad altri repo. Eventi generati con questo token di norma non avviano nuovi workflow (eccezioni: `workflow_dispatch` e `repository_dispatch`). [GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token). Per aprire PR con esso serve abilitare "Allow GitHub Actions to create and approve pull requests" (Settings > Actions > General); di default è disabilitato nei repo personali. [Managing Actions settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository). Se non basta, la guida indica una GitHub App o un PAT in secret. [Automatic token authentication](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication)

**PAT fine-grained (consigliato da GitHub).** Limitato a un solo proprietario (utente o organizzazione); accesso a repo pubblici, tutti o solo selezionati; scadenza configurabile. Non può contribuire a repo dove si è collaboratori esterni né accedere a più organizzazioni. I PAT classici (scope `repo`) sono più ampi e meno sicuri. [Managing PATs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

Permessi per endpoint ([Permissions required for fine-grained PATs](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)):

| Operazione | Endpoint | Permesso |
|---|---|---|
| Leggere `portfolio.json` | `GET /repos/{o}/{r}/contents/{path}` | Contents: read |
| Creare branch | `POST /repos/{o}/{r}/git/refs` | Contents: write |
| Creare/aggiornare file | `PUT /repos/{o}/{r}/contents/{path}` | Contents: write |
| Aprire la PR | `POST /repos/{o}/{r}/pulls` | Pull requests: write |
| Elencare/cercare repo | `GET /user/repos`, ricerca | Metadata: read |

Per i repo privati propri basta selezionarli tra i "selected repositories" del token. Nota di interpretazione (non documentata come requisito): conviene usare token diversi per il sync in build (sola lettura) e per l'agente (scrittura), per minimo privilegio.

## 4. Workflow pianificati (cron)

[Events that trigger workflows: schedule](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule)

- Intervallo minimo: ogni 5 minuti. Sintassi cron POSIX, UTC di default (è possibile un fuso IANA).
- Gira solo sul branch di default.
- Può essere ritardato nei periodi di carico, in particolare all'inizio di ogni ora: meglio orari "storti" (es. minuto 17).
- Repo pubblici: disabilitato automaticamente dopo 60 giorni senza attività del repository; riattivabile a mano.
- Chi modifica il `cron` con un commit (permesso write) diventa l'actor.
- Alternative on-demand: `workflow_dispatch` e `repository_dispatch`.
- Limiti generali: job fino a 6 ore su runner GitHub, run fino a 35 giorni, 20 job concorrenti sul piano Free. [Actions limits](https://docs.github.com/en/actions/reference/limits). Gratis per repo pubblici; quota di minuti per i privati. [Billing](https://docs.github.com/en/actions/administering-github-actions/usage-limits-billing-and-administration)

## 5. Rebuild su Vercel da una Action

[Deploy Hooks](https://vercel.com/docs/deploy-hooks)

- Creazione: Project > Settings > Git > Deploy Hooks; si sceglie nome e branch. Il progetto deve essere collegato a un repo Git.
- Trigger: `GET` o `POST` all'URL, es. `curl -X POST https://api.vercel.com/v1/integrations/deploy/<prj_id>/<token>`. Nessun header di autorizzazione né payload; risposta `{"job":{"state":"PENDING",...}}`.
- Sicurezza: chiunque abbia l'URL può fare deploy, quindi va trattato come un token (secret di Actions); si può revocare.
- Cache di build attiva di default; `?buildCache=false` la disattiva.
- Richieste multiple per la stessa versione annullano i deploy precedenti dello stesso hook.
- Limiti: 5 hook per progetto (Hobby/Pro, 10 Enterprise); 60 trigger/ora per progetto.
- Non funziona se `vercel.json` ha `github.enabled = false`.
- La doc cita come uso tipico i deploy programmati tramite un servizio cron che chiama l'hook; un workflow `schedule` con `curl -X POST "$VERCEL_DEPLOY_HOOK"` è coerente con questo (inferenza, non esempio ufficiale).

## Lacune

- Pagine lette tramite estrazione automatica del testo: i numeri sono quelli delle pagine ufficiali, da ricontrollare in fase di implementazione.
- Non verificati: permessi di una GitHub App come alternativa al PAT; `repository_dispatch` tra repo diversi.
