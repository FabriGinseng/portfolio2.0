---
type: grilling (HITL)
status: closed
claimed-by: fabriGinseng
blocked-by: []
---

# 07 Dove gira l'agente

## Question

Il piano iniziale era una GitHub Action pianificata. Ma una Action che gira da sola non può aspettare giorni la decisione di una persona: o salva lo stato su un database (checkpointer persistente, es. PostgresSaver) e riprende in un secondo run, oppure si usa un'altra forma. Inoltre la PR sul repo è già una revisione umana: con l'`interrupt` prima della PR le persone decidono due volte.

Quale forma ha l'esecuzione? Per esempio: (a) comando locale che lanci tu (`npm run agente`), approvazione nel terminale, `MemorySaver` in RAM, nessun server e nessun segreto in Actions; (b) Action pianificata senza `interrupt` (la PR è la revisione); (c) Action con `interrupt` e checkpointer persistente. Da qui dipendono: dove vive il token di scrittura, come si valutano le bozze e i costi.

## Resolution

Chiuso il 2026-10-07. Tutte le raccomandazioni accettate.

- **Dove gira:** comando locale (`npm run agente`), approvazione nel terminale con `interrupt`, stato in memoria (`MemorySaver`), nessun database e nessun segreto in GitHub Actions. Si passa a un'Action pianificata solo cambiando il punto di avvio, senza rifare il grafo.
- **Dove vive il codice:** repo separato (il portfolio non scarica LangGraph in build); potrà avere il proprio Manifest e comparire nel sito.
- **Modello:** Gemini per cominciare, nome del modello in un'unica variabile (`initChatModel("google:…")`). I limiti attuali della fascia gratuita non sono verificati: da controllare in fase di implementazione.
- **Token di scrittura:** fine-grained, solo repo selezionati, Contents write + Pull requests write, scadenza 30–90 giorni, in `.env` fuori da git. Se manca un permesso l'agente si ferma con un messaggio chiaro ("aggiungi il repo X al token").
- **Prove senza rischi:** opzione `--dry-run` (stampa la bozza e si ferma, senza token di scrittura). La qualità si giudica confrontando le bozze con i testi scritti a mano di `ecommerce`, `RestMethodsRefit`, `EntropyProject`. Nessun benchmark in questa versione.
- **Granularità:** un repo per esecuzione (`npm run agente -- <repo>`, altrimenti il primo repo con topic e senza Manifest). Limiti fissi: elenco file troncato a 20, max 2 file letti, ciascuno tagliato a 4 KB, max 2 tentativi di bozza.
