# Portfolio

Sito personale che presenta i progetti, l'esperienza e il CV di Antonio Fabrizio Fiume, in italiano e inglese.

## Language

**Progetto**:
Un lavoro mostrato nella sezione Projects del sito, con titolo, descrizione IT/EN, stack, icona e link opzionale.
_Avoid_: Item, card, lavoro

**Progetto curato**:
Un Progetto scritto a mano nel file dati del sito, perché non ha un repo pubblico su GitHub (per esempio Campania in Salute).
_Avoid_: Progetto manuale, progetto statico

**Progetto sincronizzato**:
Un Progetto generato in fase di build a partire da un repo GitHub con il topic `portfolio` e un Manifest valido.
_Avoid_: Progetto automatico, progetto GitHub

**Manifest**:
Il file `portfolio.json` nella radice di un repo, che dichiara come quel repo appare come Progetto (titolo, descrizioni IT/EN, stack, icona).
_Avoid_: Config, metadata

**Agente di redazione**:
L'agente LangGraph che legge un repo con topic `portfolio` e senza Manifest e propone un Manifest in una PR sul repo, per la revisione umana.
_Avoid_: Bot, generatore
