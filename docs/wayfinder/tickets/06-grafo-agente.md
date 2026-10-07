---
type: prototype (HITL)
status: closed
claimed-by: fabriGinseng
blocked-by: []
---

# 06 Disegno del grafo dell'agente

## Question

Quali nodi, stato, strumenti e archi ha l'Agente di redazione in LangGraph? Dove si ferma per la revisione umana (PR sul repo del progetto)? Si produce uno schizzo del grafo (diagramma + stato) su cui reagire, spiegando ogni passaggio in italiano. Include: come si sceglie cosa leggere del repo, come si valida la bozza contro lo schema di 01, cosa succede se il repo è troppo grande o vuoto.

## Resolution

Chiuso il 2026-10-07. Prototipo: [prototypes/06-grafo-agente-PROTOTIPO.html](../prototypes/06-grafo-agente-PROTOTIPO.html) (un solo file, modulo puro `AGENTE` pronto da trasformare nel grafo vero). Tutte le raccomandazioni accettate.

**Grafo (StateGraph esplicito):** `selezionaRepo` → `esploraRepo` (modello + strumenti, con budget: elenco troncato a 20 file) → `scriviBozza` (modello, output strutturato) → `validaBozza` (codice con schema Zod) → `chiediApprovazione` (`interrupt`) → `apriPR` → fine.

**Archi condizionali:** dopo `esploraRepo` (materiale sufficiente? altrimenti fine, senza chiamare il modello per la bozza); dopo `validaBozza` (valida → persona; non valida → di nuovo `scriviBozza` con gli errori, max 2 tentativi, poi scarto); dopo `chiediApprovazione` (approva / approva con modifiche → PR; rifiuta → fine).

**Stato:** repo, materiale letto, bozza, errori, tentativi, in pausa, PR create, esito.

**Regole fissate**
- `apriPR` sta in un nodo separato dopo l'interrupt (un nodo riparte dall'inizio alla ripresa) ed è idempotente: se la PR esiste già la riusa.
- Il controllo è codice, non un secondo modello.
- "Approva con modifiche" = un'unica approvazione: la bozza modificata viene validata subito; se non è valida si resta in pausa con gli errori, e non si può approvare finché non lo è.
- Un rifiuto non viene ricordato: l'agente può riproporre lo stesso repo (si toglie il topic per escluderlo).
- Dopo 2 tentativi falliti il repo è scartato con un messaggio nel registro, senza altri avvisi.

**Emerso dal prototipo:** la pausa `interrupt` richiede che il processo resti vivo (o un checkpointer persistente) finché la persona decide. Questo mette in discussione dove gira l'agente: vedi ticket 07.
