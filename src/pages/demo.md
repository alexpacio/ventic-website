---
layout: ../layouts/GuideLayout.astro
title: Una demo completa, sulla tua infrastruttura
description: Requisiti, collegamenti e installazione di Ventic su Kubernetes. Richiedi una chiave demo Licman e passa alla licenza pagata mantenendo dati e servizi.
lang: it
contents:
  - { id: requirements, label: Requisiti }
  - { id: license, label: Ottenere la chiave demo }
  - { id: template, label: Fork e release verificata }
  - { id: wiring, label: Collegare i servizi }
  - { id: configuration, label: Valori e segreti }
  - { id: deployment, label: Installare e verificare }
  - { id: inference, label: Abilitare una prima inferenza }
  - { id: purchase, label: Acquistare e attivare la licenza }
  - { id: operations, label: Gestione e recupero }
---

<h2 id="requirements">Requisiti: cosa preparare prima</h2>

La demo usa la **distribuzione completa con licenza**: stessi servizi e stessi
dati che conserverai dopo l'acquisto. La durata dell'autorizzazione è quella
concessa da Licman. Non occorrono immagini di sviluppo o build senza licenza.

| Requisito | Cosa serve |
| --- | --- |
| Cluster | Kubernetes **1.36 o 1.37**, nodi Linux **amd64**, accesso HTTPS verificato, CNI che applica NetworkPolicy e StorageClass persistente. |
| Capacità | RAM/CPU per le richieste di tutti i workload, database, osservabilità e Job, più margine operativo. Per una demo su singolo nodo puoi usare `postgres.instances: 1`; non offre alta disponibilità. Le GPU sono necessarie sul target di inferenza se il runtime scelto le richiede, non su ogni nodo del portale. |
| Storage e backup | Nel profilo bundled PostgreSQL usa per default tre istanze da 100 GiB; aggiungi Valkey, notifiche e telemetria. Dimensiona i PVC, prepara un bucket dati e una destinazione backup esterna. Un PVC non è un backup. |
| Dominio e TLS | Un dominio controllato, sei host pubblici, wildcard chat, ingress e certificati validi. Per il wildcard serve DNS-01 oppure un certificato wildcard già disponibile. |
| Strumenti | Git, Python 3.12+, Helm e kubectl sulla macchina amministrativa. Il cliente installa binari e immagini pubblicate: non deve compilare Rust, Node o Python. |
| Accessi | Accesso GitHub al template Contoso (richiedi l’invito se necessario), kubeconfig dedicato e permessi iniziali per namespace/RBAC e prerequisiti condivisi. Dopo il bootstrap usa identità operative limitate. |
| Servizi esterni | SMTP funzionante, storage compatibile S3, OpenBao per la custodia dei segreti e un target di inferenza raggiungibile. OAuth/social login e pagamenti del tuo servizio sono integrazioni separate. |
| Release e fiducia | Una release Ventic effettivamente pubblicata, il suo manifest firmato e la chiave pubblica release ottenuta dal proprietario attraverso un canale fidato indipendente. La chiave pubblica Licman è distinta. |
| Licenza | Account aziendale Licman verificato e chiave demo **Ventic On Premise**. Il controllo licenza richiede accesso HTTPS a Licman e un orologio sincronizzato. |

**La demo software non comprende hardware, credito per inferenza o un account a
pagamento presso un provider di modelli.** Per provare una richiesta completa devi
anche configurare un modello e l'eventuale finanziamento del workspace attraverso
un pagamento confermato. Non usare database o account di produzione per fixture.

Scegli un nome stabile, per esempio `acme-demo`. Il chart creerà quattro namespace
dedicati: `acme-demo-edge`, `acme-demo-app`, `acme-demo-data`, `acme-demo-ops`.
OpenBao può vivere separatamente in `acme-credentials`. Mantieni questi nomi,
le chiavi di cifratura e l'identità dell'installazione quando passerai a pagamento.

<h2 id="license">1. Ottenere la chiave demo da Licman</h2>

1. Apri [Licman SaaS](https://licman-saas.netter.io/) e scegli la registrazione.
   Registra la tua azienda e il primo amministratore; verifica l'indirizzo email.
   Se l'azienda esiste già, fatti invitare dal suo amministratore.
2. Accedi al catalogo e apri **Ventic**. Per installarlo sulla tua infrastruttura
   seleziona **On Premise** e richiedi la demo, se disponibile per la tua azienda.
3. Leggi durata e diritti mostrati dal catalogo. La durata non va dedotta da questa
   pagina: è configurata per prodotto e inizia alla prima attivazione online.
4. Salva la chiave mostrata una sola volta in un file privato `0600`, per esempio
   `private/staging/license.key`. Non incollarla in Git, shell history, ticket,
   immagini o valori Helm. Se perdi la chiave usa la rigenerazione consentita
   dal portale; i token delle installazioni già attive sono indipendenti.
5. Ottieni dal proprietario la chiave pubblica Ed25519 Licman e fissala in
   `license.publicKey`. Il prodotto verificato dal software resta
   `netter-ai-platform`, anche se il nome commerciale nel portale è Ventic.

La demo non avvia automaticamente un abbonamento pagato. La registrazione a Licman
non crea il cluster, non fornisce credenziali S3/SMTP e non configura i modelli.
Usa una release supportata da un server Licman compatibile con l'installazione.

<h2 id="template">2. Partire dal fork Contoso e verificare la release</h2>

Crea un fork del [template Contoso](https://github.com/nettersrl/ventic-provider-template)
e clona il tuo fork. Contoso Ltd è fittizia: sostituisci identità, domini e artwork.
Non clonare un provider reale insieme a dati, credenziali, backup o documenti legali.

```sh
git clone <URL-DEL-TUO-FORK> acme-provider
cd acme-provider
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-installer.txt
install -d -m 700 private private/staging
make help
```

Salva la chiave pubblica **release** in `private/release.pub`, tramite il canale
fidato del proprietario. Configura `config/distribution.yaml` con la versione
pubblicata che hai ricevuto, l'origine S3/CDN ufficiale e `publicKeyFile`.
Non sostituire una chiave fidata con una chiave scaricata accanto al pacchetto.

```sh
make release-fetch
make release-check
VENTIC_INSTALLER="$(python scripts/binary-release.py path)"
```

Questi comandi verificano firma, prodotto, modo licenziato, piattaforma,
checksum e inventario. Non compilano la piattaforma. Una versione citata in un
esempio o un Git push non provano che immagini e artefatti siano già pubblicati.
Il file `stack.lock.json` serve allo sviluppo da sorgente; il percorso demo usa
la release binaria firmata.

<h2 id="wiring">3. Collegare dominio, cluster e servizi</h2>

Usiamo `demo.example.org` come dominio di esempio: sostituiscilo con un dominio
di tua proprietà. I nomi pubblici arrivano all'ingress/WAF, non direttamente a
PostgreSQL, Valkey, OpenBao o alla telemetria.

| Collegamento | Configurazione e controllo |
| --- | --- |
| Sito → ingress | DNS `demo.example.org`, valore `domains.marketing`. Immagini grandi e sito personalizzato appartengono al tuo sito, non ai Secret. |
| Portale/identità → ingress | `portal.demo.example.org`. L'identità OIDC è sotto lo stesso host, `/identity/realms/netter`; redirect e Origin devono corrispondere all'URL reale, incluso l'eventuale numero di porta. |
| API e documentazione → ingress | `api.demo.example.org` e `docs.demo.example.org`. Configura URL coerenti nel profilo; non esporre direttamente i servizi interni. |
| Chat → ingress | `chat.demo.example.org` e `*.chat.demo.example.org`, con wildcard DNS/TLS. Verifica WebSocket e timeout. |
| Notifiche → ingress | `push.demo.example.org`. Configura il dominio effettivo nel chart. |
| Cluster → SMTP | Host, porta, utente e mittente pubblici in `settings`; password in OpenBao. Verifica email di accesso/invito e le impostazioni del dominio mittente. |
| Cluster → S3 | Bucket dati, regione ed endpoint in `settings`; access key/secret in OpenBao. Usa bucket del tuo servizio, non quello pubblico delle release Ventic. |
| Controller e servizi → OpenBao | HTTPS con CA verificata, autenticazione Kubernetes, ruoli legati ai ServiceAccount dell'installazione e policy ristrette. I Secret Kubernetes sono copie di consegna. |
| Ventic → modelli | Endpoint approvato o agente remoto su hardware tuo, rete/TLS e credenziale limitata al provider. Se abiliti PII prepara anche il relativo target e la sua policy di trattamento. |
| Ventic → Licman | HTTPS in uscita verso `licman-saas.netter.io:443`, chiave pubblica fissata e orologio UTC corretto. Nessuna credenziale publisher Docker Hub/S3 serve al cliente. |

Registra il kubeconfig in `private/staging/kubeconfig` (`0600`) e ispeziona l'UID
del cluster; non usare il contesto globale implicito e non disabilitare TLS:

```sh
kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \
  get namespace kube-system -o jsonpath='{.metadata.uid}'
```

Imposta `context`, `clusterUID`, `privateDirectory`, `values` e `distribution: true`
in `config/environments/staging.yaml`. Usa un file valori distinto, per esempio
`config/demo.yaml`. Non applicare la configurazione staging al cluster di produzione.

I controller condivisi **non sono compilati o installati dal chart applicativo**.
L'amministratore può usare il bootstrap separato, che mantiene quelli già presenti
e installa solo i mancanti da pacchetti Helm ufficiali verificati:

```sh
python "$VENTIC_INSTALLER/scripts/controllers.py" \
  --context acme-demo --kubeconfig private/staging/kubeconfig \
  --cluster-uid <UID-ISPEZIONATO> \
  --openbao-values config/openbao.yaml --openbao-namespace acme-credentials
```

Il catalogo comprende KEDA, cert-manager, ingress, CloudNativePG/Barman,
External Secrets e Reloader. Un controller esistente non viene aggiornato
automaticamente. Configura `ingress.className`, namespace, label e CIDR fidati
per l'ingress realmente installato; non usare `0.0.0.0/0` come proxy fidato.
L'ingress deve conservare SSE non bufferizzato e WebSocket.

<h2 id="configuration">4. Valori pubblici, asset e segreti</h2>

Parti da `config/production.yaml` del template e salvalo come `config/demo.yaml`.
Mantieni `localBuild: false`. Per esempio, personalizza:

```yaml
installation: acme-demo
domain: demo.example.org
profile: bundled
localBuild: false
imagePullSecrets: []
provider:
  name: Acme Demo
  company: Acme Example
  support_email: support@example.org
  logo_url: /brand/acme.svg
  logo_light_url: /brand/acme-light.svg
  logo_dark_url: /brand/acme-dark.svg
  terms_url: https://legal.example.org/acme/termini
  privacy_url: https://legal.example.org/acme/privacy
  legal_version: 'versione-approvata-dal-titolare'
postgres:
  instances: 1
storage:
  className: <STORAGECLASS-DEL-CLUSTER>
settings:
  SMTP_HOST: smtp.example.org
  SMTP_PORT: '587'
  SMTP_FROM: noreply@example.org
  SMTP_USER: acme-mail
  S3_BUCKET: acme-demo-data
  S3_REGION: <REGIONE-DEL-TUO-STORAGE>
  S3_ENDPOINT: https://s3.example.org
```

Completa anche `license.publicKey`, issuer/certificati TLS, ingress, DNS resolver,
riferimenti OpenBao, destinazione backup e retention. Il blocco sopra è un insieme
di override: non sostituisce tutti i prerequisiti del template. Il profilo `bundled`
inizializza PostgreSQL, Valkey, osservabilità, tabelle e dashboard. `external`
richiede servizi compatibili, TLS, ruoli/database dedicati e le estensioni per
i contenuti cifrati di Open WebUI.

- **Branding:** piccoli SVG passivi/PNG/WebP/ICO in `artwork/portal/`, massimo
  500 KiB ciascuno e 700000 byte base64 totali. Il wrapper li carica nel ConfigMap.
  I nomi dei loghi chiaro/scuro sono espliciti. Questi file sono pubblici.
- **Documenti legali:** usa termini e privacy approvati dal titolare, su URL
  permanenti. I documenti pubblicati da Netter o sul sito Ventic non diventano
  automaticamente i termini del tuo provider.
- **Custodia:** installa OpenBao con TLS e il seal scelto; inizializzalo una sola
  volta, conserva le quote di recupero privatamente e separatamente e non
  rigenerare chiavi durante gli upgrade. Predisponi KV-v2 e autenticazione Kubernetes.
- **Bootstrap privato:** `private/staging/openbao-runtime.json` seleziona `address`
  HTTPS, `runtimeAddress` coerente con il chart, `caFile`, `tokenFile` oppure
  identità JWT scoped, `kvMount` e `path` del record bootstrap. Tutti i file
  privati sono `0600`; non usare il root token come identità permanente.
- **Record KV iniziale:** almeno stringhe `NETTER_ADMIN_EMAILS`, `SMTP_PASSWORD`,
  `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`; aggiungi credenziali backup e integrazioni
  abilitate. Il wrapper genera e conserva le altre chiavi, aggiornando il record
  con controllo di versione. La CA va consegnata nei namespace interessati.
- **Ruoli:** `ventic-secret-delivery` legge il bootstrap soltanto per i quattro
  ServiceAccount `secret-delivery`; `ventic-runtime-control` è riservato al
  ServiceAccount `runtime` del namespace app e ai suoi percorsi di stato/credenziali.

Esempio di `private/staging/openbao-runtime.json` (i file indicati sono relativi
al JSON, non contengono credenziali inline):

```json
{
  "address": "https://bao.example.org",
  "runtimeAddress": "https://openbao.acme-credentials.svc:8200",
  "caFile": "openbao-ca.crt",
  "tokenFile": "openbao-installer.token",
  "kvMount": "secret",
  "path": "providers/acme-demo/bootstrap"
}
```

L'endpoint amministrativo `address` deve essere raggiungibile dalla tua rete/VPN
con TLS verificato; `runtimeAddress` deve coincidere con `secrets.openbao.address`
nei valori. Il certificato OpenBao copre il servizio e
`*.openbao-internal.acme-credentials.svc`, oltre all'eventuale host amministrativo.
Il chart `ventic-secrets` richiede `image` upstream verificata per digest,
`tlsSecret` esistente, StorageClass, seal e namespace client: includi il namespace
reale di External Secrets oltre a quelli applicativi. Non pubblicare OpenBao come
uno degli host del portale.

Per il primo avvio con seal Shamir, dopo che TLS e processo OpenBao sono pronti:

```sh
umask 077
test ! -e private/staging/openbao-initialization.json &&
kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \
  -n acme-credentials exec openbao-0 -- bao operator init -format=json \
  > private/staging/openbao-initialization.json
kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \
  -n acme-credentials exec -it openbao-0 -- bao operator unseal
```

Ogni custode fornisce la quota al prompt; non metterla negli argomenti shell.
Non inizializzare nuovamente un vault già esistente. Configura mount KV-v2, auth
Kubernetes con audience `openbao`, reviewer TokenReview e policy dei ruoli prima
del deploy. Le policy runtime sono limitate allo scope dell'installazione, derivato
dall'ID stabile `k8s:<UID-cluster>:<UID-namespace-app>`; l'installer gestisce tale ID.
Le guide dettagliate sono anche nel pacchetto verificato, sotto
`$VENTIC_INSTALLER/docs/provider/redistribuzione.md` e
`$VENTIC_INSTALLER/docs/provider-settings-and-recovery.md`.

La [guida operativa completa](https://gitlab.com/nettersrl/ventic/ventic-frontend/-/blob/main/apps/docs/content/provider/redistribuzione.md)
contiene il formato JSON privato, TLS OpenBao, parametri del chart, backup e
recupero. Prepara questi collegamenti prima del deploy, non dopo il primo errore
di autenticazione al vault.

<h2 id="deployment">5. Installare e controllare la demo</h2>

Con il record OpenBao pronto e la chiave demo nel file privato:

```sh
make deploy-plan ENVIRONMENT=staging
make deploy-release ENVIRONMENT=staging
make deploy-verify ENVIRONMENT=staging
```

`deploy-plan` è il controllo offline degli input. Il deploy verifica firma,
immagini per digest, TLS e UID del cluster, poi applica Helm e i Job di bootstrap /
migrazione. Non installa modelli o pesi implicitamente. Il lease di configurazione
viene rilasciato prima della readiness; quello deployment resta attivo fino al termine.
L'attivazione usa la chiave demo senza ricompilazione o sostituzione dei binari.

Dopo l'attivazione riuscita, conserva la chiave in custodia ma rinomina
`private/staging/license.key`, per esempio in `license.original.key`: quel nome
è un input di prima attivazione, non va ripresentato a ogni upgrade. La credenziale
dell'installazione è già custodita in OpenBao; PostgreSQL ne conserva il riferimento.

Prima di considerare concluso il setup verifica:

1. Tutti i workload e i Job di migrazione sono pronti, senza riavvii continui.
2. Gli host HTTPS mostrano certificati corretti; il portale completa login, logout
   e ritorno OIDC. I soli utenti configurati hanno il ruolo amministratore.
3. Portale, sito, documentazione e chat mostrano branding e URL coerenti.
4. Le email arrivano, i contenuti passano nel bucket corretto, log/metriche/tracce
   compaiono nelle dashboard e i servizi interni non sono pubblicamente esposti.
5. La pagina **Piattaforma → Identità e licenza** mostra una licenza attiva;
   esegui anche una richiesta completa al modello e una prova di cancellazione/export.
6. Un backup esterno e un ripristino verificato comprendono database e chiavi.

Readiness Kubernetes non dimostra da sola login, streaming, pagamento o ripristino.

<h2 id="inference">6. Collegare il modello e completare il primo utilizzo</h2>

Accedi al portale come amministratore. Configura il provider upstream in
`/app/models/providers`, la credenziale in custodia e il modello da esporre.
Puoi usare un endpoint già disponibile oppure approvare l'agente remoto sul
tuo hardware e un runtime supportato. Prepara DNS/reti/TLS del target e capacità
GPU/RAM adatte al modello; il chart del portale non include pesi o noleggio GPU.

Crea un workspace, assegna utenti/ruoli, scegli i modelli consentiti e le policy.
Se richiedi PII, configura e verifica il target prima di imporla al workspace:
un target obbligatorio mancante blocca la richiesta. Emetti una chiave API limitata
al workspace e verifica una risposta, SSE, contabilizzazione, revoca ed export.

I wallet non ricevono credito gratuito dalla demo software. Per flussi che
richiedono fondi usa un pagamento confermato. Una demo con pagamenti di test deve
avere account/modalità sandbox, dati e database dedicati; il ritorno da Checkout
non conferma un incasso. Se abiliti Stripe per i tuoi utenti, configura le tue
chiavi e il webhook del tuo portale `/api/v1/stripe/webhook` in OpenBao e nel
dashboard Stripe. Le credenziali Stripe del tuo servizio non sono quelle Licman.

<h2 id="purchase">7. Acquistare la licenza e finalizzare</h2>

1. Accedi alla stessa azienda in [Licman SaaS](https://licman-saas.netter.io/).
   Richiedi l'offerta Ventic **On Premise** adatta ai diritti e alla capacità
   desiderati. Fai riferimento all'offerta effettiva, non a prezzi riportati in
   un esempio o nella pagina marketing.
2. Attendi l'approvazione dell'offerta, controlla durata/diritti/importi e completa
   l'acquisto. Il periodo pagato viene concesso soltanto dopo verifica dell'incasso
   da parte di Licman; un redirect del browser non basta.
3. Se ottieni una nuova chiave pagata, salvala come
   `private/staging/paid-license.key` (`0600`) e sostituisci la demo **prima della
   sua scadenza**:

```sh
KUBECONFIG=private/staging/kubeconfig \
python "$VENTIC_INSTALLER/scripts/providerctl.py" license-replace \
  --context acme-demo --values config/demo.yaml \
  --release-manifest "$VENTIC_INSTALLER/release.json" \
  --release-public-key-file private/release.pub \
  --license-key-file private/staging/paid-license.key
```

Il server verifica la nuova lease e salva atomicamente il token prima di ritirare
quello precedente. Una chiave errata non sostituisce l'autorizzazione valida.
Non rilasciare prima la demo con `license-release`: per la sostituzione non
servono riavvii dei pod, un nuovo cluster, cambio namespace o migrazione dei dati.
Se il rinnovo riguarda la stessa licenza, il token esistente viene aggiornato
dalla verifica periodica, senza reinserire chiavi a ogni periodo pagato.

È disponibile anche `license.activation` con riferimento a un Secret e revisione
esplicita nei valori Helm, senza chiave in chiaro; vedi la guida operativa.
Verifica lo stato attivo, la copertura pagata e una nuova richiesta al modello,
poi rimuovi la copia temporanea della chiave dal percorso operativo.

Se hai usato pagamenti sandbox, conserva quel contesto separato: non trasformare
incassi di test in incassi reali quando attivi la licenza.

Per aprire il servizio oltre la demo, completa inoltre termini/privacy del tuo
provider, backup/ripristino, monitoraggio, alert, accessi amministrativi, quota e
policy utenti. Se avevi una sola istanza PostgreSQL, progetta separatamente HA e
dimensionamento: acquistare la licenza non aggiunge nodi o risorse al cluster.

<h2 id="operations">8. Dopo la demo: gestione, scadenza e recupero</h2>

Il controllo avviene ogni cinque minuti. Le nuove lease Licman hanno attualmente
un limite firmato di 12 ore e non superano la copertura commerciale; un outage
non estende quel termine. Scadenza o rifiuto bloccano nuovo lavoro licenziato,
mentre conguagli, riconciliazione pagamenti, erasure, export e recupero restano
disponibili. Conserva contatto amministrativo, accessi cluster e custodia OpenBao.

Gli upgrade usano una nuova release verificata, gli stessi namespace e le stesse
chiavi, mantenendo pianificazioni e journal. Un rollback Helm non annulla le
migrazioni SQL. Non usare il cluster o il database di un altro ambiente per prove.

Per trasferimento offline esiste un bundle opzionale di immagini OCI e chart
upstream già compilati. Non è una modalità senza controlli Licman e non concede
automaticamente avvio o rinnovo senza rete.
