# Frontend – Next.js

Questo repository contiene il **frontend del progetto DevBlog**, basato su **Next.js** e pensato per essere eseguito in **container Docker** in produzione, comunicando con il backend Strapi tramite API.

Il frontend fornisce:

* Interfaccia utente per leggere articoli

Non è previsto l'avvio del frontend al di fuori dei container in produzione; tutte le modifiche passano da GitHub Actions e Docker.

---

## Ruolo del frontend nell'architettura

* Servito su **dominio principale** (es. `example.com`)
* Riceve dati dal backend Strapi tramite API
* Accesso HTTPS terminato da Nginx (reverse proxy)

**Nota:** il frontend non gestisce direttamente SSL. Tutto il traffico HTTPS esterno viene terminato da Nginx.

---

## Ambiente di esecuzione

* **Node.js**: 22 (alpine)
* **Runtime**: Docker container
* **Process manager**: `node server.js` (standalone output di Next.js)
* **NODE_ENV**: `production`

In produzione il frontend viene:

* buildato tramite `next build` in un container builder
* avviato tramite Docker Compose come container non-root

---

## Variabili d'ambiente

Il frontend utilizza le seguenti variabili d'ambiente, che vengono passate durante la build e runtime:

```env
NEXT_PUBLIC_SITE_URL=<url of your deployed frontend>
NEXT_PUBLIC_BASE_PATH=""
NEXT_PUBLIC_API_ENDPOINT=<url of your deployed backend API>
```

* `NEXT_PUBLIC_SITE_URL`: URL pubblico del frontend
* `NEXT_PUBLIC_BASE_PATH`: percorso base dell'applicazione, se diverso da `/`
* `NEXT_PUBLIC_API_ENDPOINT`: URL pubblico delle API backend

⚠️ Non committare file `.env` reali.

---

## Accesso a GitHub Packages

Alcune librerie private (UI Kit) vengono pubblicate su **GitHub Packages**.

### 1. Configure access to GitHub Packages

Crea un file **`.npmrc`** nella root del progetto (stesso livello di `package.json`) con il seguente contenuto:

```bash
@edoandcode:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=COPY_PERSONAL_ACCESS_TOKEN_HERE
```

Sostituisci `COPY_PERSONAL_ACCESS_TOKEN_HERE` con un **GitHub Personal Access Token** con permesso `read:packages`.

Questo è necessario per installare la libreria privata:

```bash
@edoandcode/ui-kit-grid
```

⚠️ Non committare mai file `.npmrc` contenenti token personali.

---

## Dockerfile di produzione

Il frontend utilizza un **Dockerfile multi-stage** ottimizzato per produzione:

### Base stage

* Base image: `node:22-alpine`
* Installazioni minime necessarie (`libc6-compat`)

### Deps stage

* Copia lockfile (`yarn.lock`, `package-lock.json`, `pnpm-lock.yaml`) e `.npmrc`
* Installa le dipendenze usando il package manager appropriato

### Builder stage

* Passa gli ARG per le variabili pubbliche di Next.js
* Copia `node_modules` dal stage deps
* Esegue `next build` (build standalone)

### Runner stage

* Utente non-root: `nextjs`
* Copia `/public` e output standalone `.next/standalone` dal builder
* Imposta permessi corretti per prerender cache e `.next/static`
* Porta esposta: 3000
* Comando finale: `node server.js`

Questo approccio garantisce sicurezza, container leggero e separazione tra build e runtime.

---

## Avvio del frontend

In produzione:

* Non viene avviato manualmente
* Gestito da Docker Compose e GitHub Actions
* Qualsiasi modifica triggera pipeline e build di una nuova immagine

Per sviluppo locale (opzionale):

```bash
yarn install
yarn dev
```

⚠️ Questa modalità è separata dal flusso di produzione.

---

## Note finali

* Frontend **immutabile in produzione**
* Configurazione tramite variabili d'ambiente e token GitHub
* HTTPS gestito da Nginx

