# 03 Fatti su LangGraph.js

Ticket: `docs/wayfinder/tickets/03-ricerca-langgraph.md` · Ricerca del 2026-10-07 · Fonti: solo documentazione ufficiale LangChain/LangGraph.js e repo `langchain-ai/langgraphjs`.

## Riassunto (italiano)

- **Quale API?** Le doc ufficiali dicono: se parti da zero o vuoi un livello alto, usa gli agenti LangChain (`createAgent`). `StateGraph` è il livello basso, per chi vuole controllare ogni passaggio. `createAgent` è comunque costruito sopra LangGraph, quindi quello che impari sul grafo vale anche per lui. Per imparare LangGraph (obiettivo della mappa) e per l'Agente di redazione con più passi (leggi repo, bozza, approvazione, PR) ha senso `StateGraph` esplicito.
- **Concetti**: stato (i dati condivisi), nodi (funzioni che fanno il lavoro), archi (chi viene dopo), archi condizionali (una funzione sceglie il prossimo nodo), tool (funzioni che il modello può chiamare), checkpointer (salva lo stato a ogni passo), `interrupt` (ferma il grafo e aspetta un umano).
- **Modelli**: Anthropic con `@langchain/anthropic` (`ANTHROPIC_API_KEY`); Gemini con `@langchain/google` (`GOOGLE_API_KEY`). Con `initChatModel("provider:modello")` cambi modello cambiando una stringa.
- **Umano in mezzo**: dentro un nodo chiami `interrupt(...)`; il grafo si ferma e salva lo stato (serve un checkpointer e un `thread_id`); poi lo riprendi con `new Command({ resume: valore })`. Attenzione: alla ripresa il nodo riparte dall'inizio.
- Con `createAgent` esiste la scorciatoia `humanInTheLoopMiddleware` (approva / modifica / rifiuta una chiamata a tool).

## 1. API consigliata: `createAgent` o `StateGraph`?

Fatti:
- La pagina Overview di LangGraph dice: "If you are just getting started with agents or want a higher-level abstraction, we recommend you use LangChain's agents". [Overview](https://docs.langchain.com/oss/javascript/langgraph/overview)
- Il README del repo definisce LangGraph.js "a low-level orchestration framework for building controllable agents" e rimanda a Deep Agents per chi vuole un pacchetto di livello più alto. Il README non cita `createAgent`. Installazione: `npm install @langchain/langgraph @langchain/core`. [langgraphjs](https://github.com/langchain-ai/langgraphjs)
- `createAgent` (import da `"langchain"`) è "a model calling tools in a loop until a given task is complete" ed è costruito su LangGraph. [Agents](https://docs.langchain.com/oss/javascript/langchain/agents)
- Le doc distinguono workflow ("percorsi di codice predeterminati") da agenti ("dinamici, decidono da soli processo e uso dei tool"). [Workflows and agents](https://docs.langchain.com/oss/javascript/langgraph/workflows-agents)

In pratica (interpretazione mia, non citazione): `createAgent` = "un modello che chiama tool in ciclo", con poche righe. `StateGraph` = disegni tu il flusso (nodi e frecce). Per un flusso con passi fissi e un cancello umano, il grafo esplicito è più leggibile.

```ts
// createAgent: già fatto da te nella tesi
import { createAgent } from "langchain";
const agent = createAgent({ model: "anthropic:claude-sonnet-5", tools: [search] });
```

## 2. Concetti base (con schizzi)

Tutti gli schizzi seguono le pagine citate; i nomi dei modelli negli esempi ufficiali cambiano da pagina a pagina, quindi verifica sempre l'ID modello al momento dell'uso.

### Stato (state)
Il "quaderno condiviso" che tutti i nodi leggono e aggiornano. Le doc attuali lo definiscono con `StateSchema` e Zod. Un **reducer** dice come unire un aggiornamento al valore esistente (di default sovrascrive; con `ReducedValue` per esempio accumula in una lista). `MessagesValue` è lo stato pronto per la lista di messaggi. [Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api)

```ts
import { StateSchema, MessagesValue, ReducedValue } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  messages: MessagesValue,
  repoName: z.string(),
  log: new ReducedValue(z.array(z.string()).default(() => []), {
    reducer: (cur, nuovo) => [...cur, nuovo],
  }),
});
```

### Nodi
Funzioni normali: ricevono lo stato e restituiscono solo la parte che cambia. [Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api)

```ts
const saluta: typeof State.Node = (state) => ({ log: `ciao ${state.repoName}` });
```

### Archi e archi condizionali
`addEdge("a","b")` = dopo a va sempre b. `addConditionalEdges("a", funzione, ...)` = una funzione guarda lo stato e sceglie il nodo successivo. `START` ed `END` sono inizio e fine. Poi `.compile()` valida e rende il grafo eseguibile. "Nodes do the work, edges tell what to do next." [Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api)

### Tool e ciclo agente
Il modello riceve i tool con `model.bindTools([...])`. Nel grafo, un `ToolNode` esegue le chiamate; un arco condizionale guarda se l'ultimo messaggio ha `tool_calls`: se sì va a `toolNode`, altrimenti finisce; da `toolNode` si torna al modello. È esattamente quello che fa `createAgent` dentro. [Workflows and agents](https://docs.langchain.com/oss/javascript/langgraph/workflows-agents), [Models](https://docs.langchain.com/oss/javascript/langchain/models)

```ts
import { StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const shouldContinue = (state) =>
  state.messages.at(-1)?.tool_calls?.length ? "toolNode" : "__end__";

const agente = new StateGraph(State)
  .addNode("llmCall", llmCall)            // chiama il modello con i tool
  .addNode("toolNode", new ToolNode(tools))
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", "__end__"])
  .addEdge("toolNode", "llmCall")
  .compile();
```

### Checkpointer
Salva lo stato come "checkpoint" a ogni passo, per **thread** (una conversazione/esecuzione, identificata da `thread_id`). Serve per memoria, riprese dopo errori e per l'interrupt. `MemorySaver` sta in RAM: si perde al riavvio. In produzione si usa `PostgresSaver` (thread_id sotto i 255 caratteri); `SqliteSaver` per sviluppo locale. [Persistence](https://docs.langchain.com/oss/javascript/langgraph/persistence)

```ts
import { MemorySaver } from "@langchain/langgraph";
const app = builder.compile({ checkpointer: new MemorySaver() });
await app.invoke(input, { configurable: { thread_id: "thread-1" } });
```

## 3. Collegare Anthropic e Gemini

Dalla pagina [Models](https://docs.langchain.com/oss/javascript/langchain/models):

| | Pacchetto | Variabile d'ambiente | Classe | Con `initChatModel` |
|---|---|---|---|---|
| Anthropic | `@langchain/anthropic` | `ANTHROPIC_API_KEY` | `ChatAnthropic` | `initChatModel("claude-sonnet-4-6")` |
| Gemini | `@langchain/google` | `GOOGLE_API_KEY` | `ChatGoogle` da `@langchain/google/node` | `initChatModel("google:gemini-3.7-flash")` |

```ts
import { initChatModel } from "langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogle } from "@langchain/google/node";

const claude = new ChatAnthropic({ model: "claude-sonnet-4-6" }); // legge ANTHROPIC_API_KEY
const gemini = new ChatGoogle({ model: "gemini-3.7-flash" });     // legge GOOGLE_API_KEY
const viaStringa = await initChatModel("google:gemini-3.7-flash");

const conTool = claude.bindTools([getWeather]);
```

Nota: gli ID modello sopra sono quelli scritti nella pagina in questo momento; le pagine ufficiali usano ID diversi in punti diversi (es. `claude-sonnet-5` nella pagina Agents). Controllare l'elenco modelli del provider al momento dell'implementazione. Il vantaggio per l'agente: modello Claude e modello Gemini sono intercambiabili nel nodo, perché hanno la stessa interfaccia.

## 4. Umano in mezzo (human-in-the-loop)

Fonte: [Interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts).

Come funziona, in semplice: un nodo chiama `interrupt(domanda)`. Il grafo si ferma, salva lo stato nel checkpointer e restituisce la domanda al chiamante. Quando l'umano risponde, tu richiami il grafo con `new Command({ resume: risposta })` e lo stesso `thread_id`; `interrupt()` restituisce quella risposta e il nodo continua.

Requisiti: un checkpointer e un `thread_id` nella config.

```ts
import { interrupt, Command } from "@langchain/langgraph";

const chiediApprovazione = (state) => {
  const ok = interrupt({ domanda: "Apro la PR con questo Manifest?", bozza: state.manifest });
  return new Command({ goto: ok ? "apriPr" : "scarta" });
};

const config = { configurable: { thread_id: "repo-xyz" } };
await app.invoke({ repoName: "xyz" }, config);          // si ferma all'interrupt
await app.invoke(new Command({ resume: true }), config); // riprende con "approvato"
```

Regole critiche dalle doc:
1. Alla ripresa il nodo **riparte dall'inizio**, non dalla riga dell'interrupt. Gli effetti collaterali messi prima (scrivere, chiamare API) devono essere idempotenti, oppure vanno in un nodo separato dopo.
2. Non mettere `interrupt` in un `try/catch`.
3. Non saltare o riordinare condizionalmente le chiamate a `interrupt` nello stesso nodo.
4. Il valore passato deve essere serializzabile (niente funzioni o istanze di classi).

### Scorciatoia con `createAgent`
`humanInTheLoopMiddleware` mette in pausa le chiamate a certi tool e permette decisioni `approve`, `edit` (cambia gli argomenti) o `reject` (con messaggio). Richiede comunque un checkpointer. [Human-in-the-loop](https://docs.langchain.com/oss/javascript/langchain/human-in-the-loop)

```ts
import { createAgent, humanInTheLoopMiddleware } from "langchain";
import { MemorySaver, Command } from "@langchain/langgraph";

const agent = createAgent({
  model: "anthropic:claude-sonnet-5",
  tools: [writeFileTool, readDataTool],
  middleware: [humanInTheLoopMiddleware({ interruptOn: { write_file: true, read_data: false } })],
  checkpointer: new MemorySaver(),
});
await agent.invoke(new Command({ resume: { decisions: [{ type: "approve" }] } }), config);
```

## Limiti di questa ricerca

- Le pagine sono state lette tramite un riassunto automatico di ogni URL, non copiate integralmente; gli snippet vanno ricontrollati sulla pagina prima di usarli in codice reale.
- Gli ID dei modelli e la distinzione `@langchain/google` vs il vecchio `@langchain/google-genai` non sono stati verificati oltre la pagina Models.
- Non verificato: versioni minime di `langchain`/`@langchain/langgraph` richieste, e il comportamento con più interrupt paralleli.

## Fonti

- https://docs.langchain.com/oss/javascript/langgraph/overview
- https://docs.langchain.com/oss/javascript/langgraph/graph-api
- https://docs.langchain.com/oss/javascript/langgraph/workflows-agents
- https://docs.langchain.com/oss/javascript/langgraph/persistence
- https://docs.langchain.com/oss/javascript/langgraph/interrupts
- https://docs.langchain.com/oss/javascript/langchain/agents
- https://docs.langchain.com/oss/javascript/langchain/models
- https://docs.langchain.com/oss/javascript/langchain/human-in-the-loop
- https://github.com/langchain-ai/langgraphjs
