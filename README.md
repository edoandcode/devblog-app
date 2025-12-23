# DevBlog

DevBlog è un progetto full‑stack pensato come riferimento pratico per il deploy automatico di un'applicazione web moderna basata su **Strapi** (backend headless CMS) e **Next.js** (frontend), utilizzando **Docker**, **GitHub Actions** e una **VM Linux** (VPS).

L'obiettivo del repository è duplice:
- fornire un esempio reale e funzionante di architettura di deploy
- permettere a chiunque cloni il progetto di replicare l'intero setup sulla propria VM


---

## Architettura generale

Il progetto è composto da tre elementi principali:

```
DevBlog
├── backend/                 # Strapi + database
├── frontend/                # Next.js
├── .github/
│   └── workflows/           # Pipeline GitHub Actions (CI/CD)
├── _deployment/
│   ├── docker/              # File docker-compose
│   │   └── docker-compose.*.yaml
│   ├── nginx/               # Configurazioni Nginx (reverse proxy + SSL)
│   │   └── *.conf
│   └── scripts/             # Submodule: vps-setup
│       ├── 00_setup_root_ssh_key.sh
│       ├── 01_setup_vps.sh
│       ├── 02_install_docker_on_vps.sh
│       ├── 03_setup_ssl.sh
│       ├── 04_push_project_files.sh
│       ├── 05_setup_github_secrets.sh
│       ├── setup.sh
│       ├── config.env
│       └── README.md
└── README.md                # Documentazione principale
```

### Componenti

- **Backend**
  - Strapi (Node.js)
  - Database (PostgreSQL / SQLite a seconda dell'ambiente)
  - Esposto solo internamente o tramite reverse proxy

- **Frontend**
  - Next.js (App Router)
  - Build e runtime containerizzati
  - Comunicazione con Strapi via API

- **vps-setup (submodule)**
  - Repository separato che contiene script Bash per:
    - provisioning iniziale della VM
    - creazione utente di deploy
    - installazione Docker e Docker Compose
    - configurazione SSL (Let's Encrypt)
    - setup filesystem
    - gestione variabili d'ambiente
    - sincronizzazione dei secret con GitHub Secrets

---

## Filosofia del deploy

Il deploy è pensato per essere:

- **riproducibile**: nessuna configurazione manuale sulla VM
- **automatizzato**: tutto passa da GitHub Actions
- **sicuro**: i secret non sono mai committati nel repository
- **container‑based**: nessuna dipendenza installata direttamente sul sistema

La VM diventa un host Docker minimale. Tutta la logica applicativa vive nei container.

---

## Prerequisiti

Per replicare il progetto sono necessari:

- una **VM Linux** (Ubuntu 20.04+ consigliato)
- accesso **SSH** con utente root (solo per il bootstrap iniziale)
- **due domini DNS configurati** (record A verso la VM):
  - un **dominio di primo livello** (es. `example.com`) su cui verrà servito il **frontend**
  - un **sottodominio di secondo livello** (es. `api.example.com`) su cui verrà servito il **backend (Strapi)**
- **GitHub CLI (`gh`) installata e autenticata localmente** (`gh auth login`)

Localmente:

- Git
- Node.js (solo per sviluppo locale, opzionale)
- Docker (opzionale)

---

## Submodule: vps-setup

Questo progetto utilizza `vps-setup` come **Git submodule**.

Il submodule è responsabile di tutta la parte infrastrutturale.
La sua documentazione è contenuta nel [repository dedicato](https://github.com/edoandcode/vps-setup) ed è da considerarsi parte integrante del progetto.

Clonazione corretta del repository:

```bash
git clone --recurse-submodules https://github.com/edoandcode/devblog-app.git
```

Se il repository è già clonato senza submodule:

```bash
git submodule update --init --recursive
```

---

## Variabili d'ambiente

Il progetto utilizza variabili d'ambiente per:

- configurazione Strapi
- credenziali database
- URL pubblici frontend/backend
- token di deploy
- secret di GitHub Actions

Nel repository **non** sono presenti file `.env` reali.

È fornito un file:

```
.env.example
```

che documenta tutte le variabili richieste. I file `.env.production` vanno copiati e adattati **solo localmente** o sulla VM tramite gli script di `vps-setup`.

---

## Flusso di deploy (alto livello)

1. Setup iniziale
    - configurazione dei record DNS (dominio di primo livello per il frontend e sottodominio per il backend) puntati alla VM
    - login tramite GitHub CLI (gh auth login)
2. Provisioning VM tramite `vps-setup`
3. Push su `master`
4. GitHub Actions:
   - build immagini Docker
   - deploy remoto via SSH
   - restart controllato dei container


---

## Come usare questo repository

Questo README fornisce una visione d'insieme.

La documentazione dettagliata è suddivisa nei seguenti file:

- `/backend/README.md` → configurazione e deploy Strapi
- `/frontend/README.md` → configurazione e deploy Next.js
- `_deployment/scripts/README.md` → provisioning infrastrutturale

Si consiglia di seguire la lettura **in quest'ordine**.

---

## Licenza

MIT License

---

## Note finali

Il progetto evolve insieme ai miei workflow personali. Le scelte architetturali sono motivate dalla semplicità, dalla trasparenza e dalla manutenibilità, non dall'iper‑ottimizzazione.

Se qualcosa non è chiaro, probabilmente merita più documentazione: è parte del lavoro.

