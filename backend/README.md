# Backend – Strapi

Questo repository contiene il **backend headless CMS** del progetto DevBlog, basato su **Strapi** e pensato per essere eseguito **esclusivamente in container Docker** in ambiente di produzione.

Il backend fornisce:

* API REST per il frontend Next.js
* pannello di amministrazione Strapi
* gestione contenuti del blog

Non è previsto l'uso di Strapi in modalità "standalone" sulla VM: **tutto il ciclo di vita passa da Docker e GitHub Actions**.

---

## Ruolo del backend nell'architettura

All'interno dell'architettura complessiva:

* il backend è servito su un **sottodominio dedicato** (es. `api.example.com`)
* è esposto tramite **Nginx come reverse proxy**
* comunica con:

  * il database (container dedicato)
  * il frontend via HTTP/HTTPS

**Nota importante**: il backend non gestisce SSL direttamente. Tutto il traffico HTTPS esterno viene terminato da Nginx, che poi inoltra il traffico al container Strapi via HTTP interno. In altre parole:

Il browser parla HTTPS con Nginx, Nginx parla HTTP con Strapi.

---

## Ambiente di esecuzione

* **Node.js**: 22 (alpine)
* **Runtime**: Docker container
* **Process manager**: Strapi (`yarn start`)
* **NODE_ENV**: `production`

In produzione il backend viene:

* buildato tramite **Docker multi-stage build**
* avviato come container non-root (`node` user)

---

## Variabili d'ambiente

Tutta la configurazione del backend è demandata alle **variabili d'ambiente**.

Nel repository **non sono presenti** file `.env.production` reali.
È invece fornito un file di riferimento:

```
.env.example
```

che documenta **tutte le variabili richieste da Strapi**.

### Server

```env
HOST=0.0.0.0
PORT=1337
```

* Strapi ascolta su tutte le interfacce
* la porta è esposta **solo internamente** al network Docker

---

### Secret Strapi (obbligatori)

```env
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
ENCRYPTION_KEY=
```

Questi secret:

* **devono essere unici e sicuri**
* non vanno mai committati
* vengono caricati come **GitHub Secrets** tramite gli script di deploy

Sono fondamentali per:

* autenticazione admin
* token API
* sicurezza delle sessioni

---

### Ambiente Node

```env
NODE_ENV=production
```

Il backend viene sempre eseguito in modalità production.

---

### Database

```env
DATABASE_CLIENT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
```

Il database viene eseguito come **servizio Docker separato**.

Note:

* `DATABASE_HOST` è il nome del servizio Docker
* `DATABASE_SSL` è disabilitato perché la comunicazione avviene su network privato

#### Variabili Postgres (allineate)

```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

Queste variabili devono essere **coerenti** con quelle del database Strapi:

* `POSTGRES_USER` = `DATABASE_USERNAME`
* `POSTGRES_PASSWORD` = `DATABASE_PASSWORD`
* `POSTGRES_DB` = `DATABASE_NAME`

---

### Email (opzionale)

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=
```

Utilizzate da Strapi per:

* notifiche
* reset password
* email transazionali

Se non configurate, le funzionalità email rimangono disabilitate.

---

### Integrazione frontend

```env
CONTACT_FORM_EMAIL_RECIPIENT=
FRONTEND_SITE_URL=
```

* `FRONTEND_SITE_URL`: URL pubblico del frontend deployato
* utilizzato per CORS, redirect e integrazioni

---

### URL pubblico backend

```env
PUBLIC_URL=
```

Deve contenere l'URL pubblico del backend (es. `https://api.example.com`).

È utilizzato da Strapi per:

* generazione URL
* asset pubblici
* link nel pannello admin

---

## Dockerfile di produzione

Il backend utilizza un **Dockerfile multi-stage** ottimizzato per produzione.

### Build stage

* installa tool di compilazione nativi
* installa solo dipendenze di produzione
* esegue `yarn build`

Questo stage **non viene incluso** nell'immagine finale.

---

### Production stage

* base image: `node:22-alpine`
* copia solo:

  * `node_modules`
  * build Strapi
* esegue il container come **utente non root**

```dockerfile
EXPOSE 1337
CMD ["yarn", "start"]
```

Il container espone la porta 1337, che viene poi gestita da Docker Compose e Nginx.

---

## Avvio del backend

In produzione:

* il backend **non viene avviato manualmente**
* viene gestito da:

  * Docker Compose
  * GitHub Actions

Qualsiasi modifica:

* viene committata
* triggera la pipeline
* produce una nuova immagine

---

## Sviluppo locale (opzionale)

Per sviluppo locale è possibile:

* utilizzare un file `.env` locale
* avviare Strapi con:

```bash
yarn develop
```

⚠️ Questa modalità è **separata** dal flusso di produzione e non influisce sul deploy.

---

## Note finali

Questo backend è progettato per:

* essere **immutabile in produzione**
* ricevere configurazione solo tramite variabili d'ambiente
* non richiedere accesso SSH post-deploy

Ogni modifica passa dal repository, non dalla VM.

Questo approccio garantisce:

* tracciabilità
* riproducibilità
* sicurezza
