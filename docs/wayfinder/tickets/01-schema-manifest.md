---
type: grilling (HITL)
status: closed
claimed-by: fabriGinseng
blocked-by: []
---

# 01 Schema del Manifest

## Question

Quali campi ha `portfolio.json` e quali sono obbligatori? Almeno: titolo, descrizione IT/EN, stack, icona, link live, ordine/priorità, flag per nascondere. Come si gestisce l'icona (URL, file nel repo, avatar di fallback)? Il repo `progetto-tesi` e `n8nworkflows` sono i primi due casi di prova.

## Resolution

Chiuso il 2026-10-07. Tutte le raccomandazioni accettate.

- **Obbligatori:** `title` (stringa), `description` (`it` e `en`), `technologies` (lista). Un Manifest senza questi campi viene scartato con un avviso.
- **Facoltativi:** `icon`, `liveUrl`, `order`.
- **Titolo:** una sola stringa, non tradotta. Se servirà, si aggiunge un campo senza rompere i Manifest esistenti.
- **Icona:** percorso relativo a un file nel repo, copiato nella cartella pubblica del sito durante il build. Se manca, avatar GitHub.
- **Repo privati:** esclusi nella prima versione. I progetti privati restano Progetti curati.
- **Link della card:** `liveUrl` se presente, altrimenti il repo GitHub.
- **Ordine:** `order` (numero più basso prima). Senza `order`, dopo, per ultimo push decrescente. Nessun campo "nascondi": si toglie il topic `portfolio`. La prima card resta quella grande.
- **Validazione:** schema Zod unico, usato dallo script di sync e dall'Agente di redazione.

Esempio di riferimento: Manifest di `progetto-tesi` (vedi conversazione del 2026-10-07).
