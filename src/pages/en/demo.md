---
layout: ../../layouts/GuideLayout.astro
title: A complete demo, on your infrastructure
description: Requirements, service wiring and Kubernetes deployment. Obtain a Licman demo key and move to a paid license while retaining your data and services.
lang: en
contents:
  - { id: requirements, label: Requirements }
  - { id: license, label: Obtain a demo key }
  - { id: template, label: Fork and verified release }
  - { id: wiring, label: Connect the services }
  - { id: configuration, label: Values and secrets }
  - { id: deployment, label: Deploy and verify }
  - { id: inference, label: Complete a first inference }
  - { id: purchase, label: Buy and activate a license }
  - { id: operations, label: Operations and recovery }
---

<h2 id="requirements">Requirements: prepare these first</h2>

The demo uses the **complete licensed distribution**, with the same services and
data you will retain after purchase. Its authorization lasts for the period granted
by Licman. Development images and builds without license enforcement are not needed.

| Requirement | What you need |
| --- | --- |
| Cluster | Kubernetes **1.36 or 1.37**, Linux **amd64** nodes, a verified HTTPS API, a NetworkPolicy-enforcing CNI and persistent StorageClass. |
| Capacity | CPU/RAM for the combined workload requests, databases, observability and Jobs, plus operating headroom. A single-node demo can use `postgres.instances: 1`; it is not highly available. GPUs are needed at an inference target when its runtime requires them, not on every portal node. |
| Storage and backup | The bundled PostgreSQL defaults to three 100 GiB instances; allow additional storage for Valkey, notifications and telemetry. Size PVCs and prepare a data bucket and off-cluster backup destination. A persistent volume is not a backup. |
| Domain and TLS | A domain you control, six public hosts, wildcard chat DNS, ingress and valid certificates. Use DNS-01 or an existing wildcard certificate for wildcard chat. |
| Tools | Git, Python 3.12+, Helm and kubectl on the administrative machine. Customers install published binaries/images without compiling Rust, Node or Python. |
| Access | A dedicated kubeconfig and initial namespace/RBAC/shared-bootstrap privileges. Use scoped operational identities afterward. |
| External services | Working SMTP, S3-compatible storage, OpenBao for secret custody and a reachable inference target. Social/OAuth login and payments for your own service are separate integrations. |
| Release and trust | An actually published Ventic release, its signed manifest and the release public key obtained from the owner through an independent trusted channel. The Licman public key is separate. |
| License | A verified Licman company account and **Ventic On Premise** demo key. Licensing requires HTTPS access to Licman and a synchronized clock. |

**The software demo includes no hardware, inference credit or paid model-provider
account.** A complete request also needs a configured model and, where required,
confirmed funding for the workspace. Never use production databases/accounts as fixtures.

Choose a stable name such as `acme-demo`. The chart creates four dedicated
namespaces: `acme-demo-edge`, `acme-demo-app`, `acme-demo-data`, `acme-demo-ops`.
OpenBao can use a separate `acme-credentials` namespace. Retain these names,
encryption keys and installation identity when switching to paid use.

<h2 id="license">1. Obtain the Licman demo key</h2>

1. Open [Licman SaaS](https://licman-saas.netter.io/) and register your company and
   its first administrator, then verify the email address. If your company already
   exists, ask its administrator for an invitation.
2. Sign in, open **Ventic** in the catalog, choose **On Premise** for your own
   infrastructure and request the demo if your company is eligible.
3. Read the duration and rights shown in the catalog. The duration is configured
   per product and starts on first online activation; do not infer it from this page.
4. Save the one-time key in a private mode-`0600` file such as
   `private/staging/license.key`. Do not paste it into Git, shell history, tickets,
   images or Helm values. If lost, use the portal's permitted key-regeneration
   flow; existing installation tokens remain independent of the activation key.
5. Obtain the owner's trusted Licman Ed25519 public key and pin it in
   `license.publicKey`. The signed product verified by the software remains
   `netter-ai-platform`, while the portal uses the commercial name Ventic.

The demo does not automatically become a paid subscription. Licman registration
does not provision a cluster, create SMTP/S3 credentials or configure models.
Use a supported Ventic release with a compatible Licman server version.

<h2 id="template">2. Fork Contoso and obtain a verified release</h2>

Fork the [Contoso template](https://gitlab.com/nettersrl/ventic/netter-contoso-provider)
and clone your fork. Contoso Ltd is fictional: replace identity, domains and
artwork. Do not copy a live provider together with credentials, data, backups or
historical legal documents.

```sh
git clone <YOUR-FORK-URL> acme-provider
cd acme-provider
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-installer.txt
install -d -m 700 private private/staging
make help
```

Save the trusted **release** public key at `private/release.pub`, using the owner's
independent trust channel. Set `config/distribution.yaml` to the published version
you received, the official public S3/CDN origin and `publicKeyFile`. Do not replace
a trusted key with one downloaded beside the package it authenticates.

```sh
make release-fetch
make release-check
VENTIC_INSTALLER="$(python scripts/binary-release.py path)"
```

These commands verify signature, exact product, licensed mode, platform, checksums
and member inventory without compiling the platform. An example version or Git
push is not evidence that images/artifacts have been published. `stack.lock.json`
supports source development; this demo uses the signed binary release.

<h2 id="wiring">3. Wire the domain, cluster and services</h2>

Replace `demo.example.org` with a domain you control. Public hosts point to the
ingress/WAF, not directly to PostgreSQL, Valkey, OpenBao or telemetry services.

| Connection | Configuration and verification |
| --- | --- |
| Marketing → ingress | DNS `demo.example.org`, matching `domains.marketing`. Large artwork/custom marketing content belongs in your site image, not Secrets. |
| Portal/identity → ingress | `portal.demo.example.org`. The OIDC identity endpoint is on the same host at `/identity/realms/netter`; redirects and exact Origin must match the real URL, including any port. |
| API/docs → ingress | `api.demo.example.org` and `docs.demo.example.org`. Keep profile URLs consistent; do not expose internal services directly. |
| Chat → ingress | `chat.demo.example.org` and `*.chat.demo.example.org`, with wildcard DNS/TLS. Verify WebSockets and timeouts. |
| Notifications → ingress | `push.demo.example.org`, selected explicitly in chart domains. |
| Cluster → SMTP | Public host, port, username and sender in `settings`; password in OpenBao. Verify access/invitation emails and your sender-domain configuration. |
| Cluster → S3 | Your data bucket, region and endpoint in `settings`; access key/secret in OpenBao. Do not use the public Ventic release bucket for customer content. |
| Controllers/services → OpenBao | Verified HTTPS/CA, Kubernetes authentication, installation ServiceAccount bindings and scoped policies. Kubernetes Secrets are delivery copies. |
| Ventic → models | An approved endpoint or remote agent on your hardware, network/TLS and a restricted credential. If enforcing PII, prepare its target and processing policy too. |
| Ventic → Licman | Outbound HTTPS to `licman-saas.netter.io:443`, pinned public key and a correct UTC clock. Customers do not need publisher Docker Hub/S3 credentials. |

Store the kubeconfig at `private/staging/kubeconfig` with mode `0600`. Inspect the
cluster UID; never rely on an implicit global context or disable TLS verification:

```sh
kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \
  get namespace kube-system -o jsonpath='{.metadata.uid}'
```

Set `context`, `clusterUID`, `privateDirectory`, `values` and `distribution: true`
in `config/environments/staging.yaml`. Use a separate values file such as
`config/demo.yaml`. Never apply staging settings to a production cluster.

Shared controllers are **not compiled or installed by the application chart**.
The cluster administrator can run the separate bootstrap, which retains existing
controllers and installs only missing ones from checksum-verified official packages:

```sh
python "$VENTIC_INSTALLER/scripts/controllers.py" \
  --context acme-demo --kubeconfig private/staging/kubeconfig \
  --cluster-uid <INSPECTED-UID> \
  --openbao-values config/openbao.yaml --openbao-namespace acme-credentials
```

The catalog covers KEDA, cert-manager, ingress, CloudNativePG/Barman, External
Secrets and Reloader. Existing controllers are not upgraded automatically. Select
`ingress.className`, namespace, pod labels and trusted CIDRs for the ingress
actually installed; do not trust `0.0.0.0/0` as a forwarding hop. Preserve
unbuffered SSE and WebSockets through the ingress.

<h2 id="configuration">4. Supply public values, assets and secrets</h2>

Start from the template's `config/production.yaml`, save a separate `config/demo.yaml`
and retain `localBuild: false`. Example overrides:

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
  terms_url: https://demo.example.org/terms
  privacy_url: https://demo.example.org/privacy
  legal_version: 'owner-approved-version'
postgres:
  instances: 1
storage:
  className: <CLUSTER-STORAGECLASS>
settings:
  SMTP_HOST: smtp.example.org
  SMTP_PORT: '587'
  SMTP_FROM: noreply@example.org
  SMTP_USER: acme-mail
  S3_BUCKET: acme-demo-data
  S3_REGION: <YOUR-STORAGE-REGION>
  S3_ENDPOINT: https://s3.example.org
```

Complete `license.publicKey`, TLS issuer/certificates, ingress, cluster DNS resolver,
OpenBao references, backup destination and retention too. These overrides do not
replace the rest of the template's prerequisites. `bundled` initializes PostgreSQL,
Valkey, observability, tables and dashboards. `external` requires compatible
services, TLS, dedicated roles/databases and the encrypted Open WebUI extensions.

- **Branding:** small passive SVG/PNG/WebP/ICO files in `artwork/portal/`, at most
  500 KiB each and 700000 base64 bytes total. The wrapper validates and loads them
  into a ConfigMap. Light/dark filenames are explicit. These files are public.
- **Legal documents:** permanent terms/privacy URLs approved by your service
  owner. Netter's or this website's documents do not automatically become your
  provider terms.
- **Custody:** deploy OpenBao with TLS and the chosen seal; initialize only once,
  retain recovery shares privately and independently, and never regenerate retained
  keys during upgrades. Configure KV-v2 and Kubernetes authentication.
- **Private bootstrap:** `private/staging/openbao-runtime.json` selects verified
  HTTPS `address`, chart-matching `runtimeAddress`, `caFile`, scoped `tokenFile` or
  JWT identity, `kvMount` and bootstrap-record `path`. Private files are `0600`;
  do not use a root token as a permanent identity.
- **Initial KV record:** at least string values for `NETTER_ADMIN_EMAILS`,
  `SMTP_PASSWORD`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, plus backup credentials
  and enabled integrations. The wrapper generates/preserves remaining keys and
  updates the record with version checks. Deliver the CA in the relevant namespaces.
- **Roles:** `ventic-secret-delivery` reads bootstrap only for the four
  `secret-delivery` ServiceAccounts. `ventic-runtime-control` binds only the app
  namespace's `runtime` ServiceAccount and its state/credential paths.

Example `private/staging/openbao-runtime.json` (file references are relative to
the JSON; no credentials are embedded):

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

The administrative `address` must be reachable over your network/VPN with verified
TLS; `runtimeAddress` must match chart `secrets.openbao.address`. The OpenBao
certificate covers the Service, `*.openbao-internal.acme-credentials.svc` and any
administrative hostname. The `ventic-secrets` chart requires a reviewed digest-pinned
upstream `image`, existing `tlsSecret`, StorageClass, seal mode and client namespaces:
include the actual External Secrets namespace as well as application namespaces.
Do not expose OpenBao as one of the public portal hosts.

For initial Shamir setup, once TLS and the OpenBao process are ready:

```sh
umask 077
test ! -e private/staging/openbao-initialization.json &&
kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \
  -n acme-credentials exec openbao-0 -- bao operator init -format=json \
  > private/staging/openbao-initialization.json
kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \
  -n acme-credentials exec -it openbao-0 -- bao operator unseal
```

Each custodian enters a share at the prompt, never in shell arguments. Never
reinitialize an established vault. Configure KV-v2, Kubernetes authentication with
audience `openbao`, TokenReview reviewer and scoped role policies before deployment.
Runtime policies are limited to the installation scope derived from the stable
`k8s:<cluster-UID>:<app-namespace-UID>` identity managed by the installer. Detailed
guides are also in the verified package at
`$VENTIC_INSTALLER/docs/en/provider/redistribuzione.md` and
`$VENTIC_INSTALLER/docs/provider-settings-and-recovery.md`.

The [complete operational guide](https://gitlab.com/nettersrl/ventic/ventic-frontend/-/blob/main/apps/docs/content/en/provider/redistribuzione.md)
contains private JSON format, OpenBao TLS, chart parameters and backup/recovery
details. Prepare these bindings before deployment, rather than after a first vault
authentication failure.

<h2 id="deployment">5. Deploy and validate the demo</h2>

Once the OpenBao record is ready and the demo key is in the private file:

```sh
make deploy-plan ENVIRONMENT=staging
make deploy-release ENVIRONMENT=staging
make deploy-verify ENVIRONMENT=staging
```

`deploy-plan` checks inputs offline. Deployment verifies the signature, digest-pinned
images, API TLS and cluster UID, then applies Helm and bootstrap/migration Jobs.
It does not implicitly install model weights. The configuration lease releases
before readiness checks while the deployment lease stays held until completion.
The demo key activates the same binaries without recompilation or image replacement.

After successful initial activation, keep the key in custody but rename
`private/staging/license.key`, for example to `license.original.key`. The original
filename is a first-activation input and must not be supplied on every upgrade.
The installation credential is already held in OpenBao; PostgreSQL stores its reference.

Before treating setup as complete, verify:

1. Workloads and migration Jobs are ready without continuous restarts.
2. HTTPS hosts have valid certificates. Portal login, logout and OIDC return work;
   only configured administrators receive platform administration.
3. Portal, marketing, docs and chat show consistent branding and URLs.
4. Email arrives, content reaches the correct bucket and logs/metrics/traces appear
   in dashboards. Internal services remain private.
5. **Platform → Identity and license** reports an active license. Complete a real
   model request and an export/erasure check too.
6. An off-cluster backup and verified restore include databases and encryption keys.

Kubernetes readiness alone does not prove authentication, streaming, payment or recovery.

<h2 id="inference">6. Connect a model and complete first use</h2>

Sign in as platform administrator. Configure the upstream provider at
`/app/models/providers`, its credential in custody and the model you want to expose.
Use an existing endpoint, or approve the remote agent on your hardware with a
supported runtime. Prepare target DNS/network/TLS and sufficient GPU/RAM; the portal
chart includes neither model weights nor GPU rental.

Create a workspace, assign users/roles, choose allowed models and policies. If
requiring PII, configure and validate its target before enforcing it: a missing
required target blocks the request. Issue a restricted workspace API key and
check a response, SSE, accounting, revocation and export.

The software demo does not grant wallet credit. Use a confirmed payment for flows
requiring funds. Payment tests need dedicated sandbox mode/accounts, data and
databases; a Checkout return alone does not confirm payment. If enabling Stripe
for your own customers, configure your credentials and the portal's
`/api/v1/stripe/webhook` endpoint in OpenBao/Stripe. Your service's Stripe credentials
are separate from Licman's software-license purchase flow.

<h2 id="purchase">7. Buy a license and finalize setup</h2>

1. Sign into the same company in [Licman SaaS](https://licman-saas.netter.io/).
   Request the appropriate **Ventic On Premise** offer for your rights and capacity.
   Use the actual offer rather than prices in examples or marketing pages.
2. Wait for approval, review period/rights/amounts and complete payment. Licman
   grants the paid period only after confirming collection; a browser redirect
   is not sufficient.
3. If issued a new paid key, save it as `private/staging/paid-license.key` with
   mode `0600` and replace the demo **before it expires**:

```sh
KUBECONFIG=private/staging/kubeconfig \
python "$VENTIC_INSTALLER/scripts/providerctl.py" license-replace \
  --context acme-demo --values config/demo.yaml \
  --release-manifest "$VENTIC_INSTALLER/release.json" \
  --release-public-key-file private/release.pub \
  --license-key-file private/staging/paid-license.key
```

The server validates the replacement lease and atomically stores its token before
retiring the previous one. A wrong key leaves the valid authorization in place.
Do not run `license-release` before replacement. There is no need to restart pods,
create a cluster, change namespaces or migrate data. Renewals of the same license
refresh the existing token periodically without reinserting a key each paid period.

Helm also supports `license.activation` with an existing Secret reference and
explicit revision, without a plaintext key; see the operational guide. Verify
active status, paid coverage and a new model request, then remove the temporary
key copy from the operational input path.

If you used sandbox payments, retain that context separately: activating a license
does not turn test payments into real collections.

Before opening service beyond the demo, finalize your provider's legal documents,
backup/restore, monitoring, alerts, administrator access, quotas and user policies.
If using one PostgreSQL instance, plan HA/capacity separately: buying a license
does not provision more nodes or resources.

<h2 id="operations">8. Ongoing operations, expiry and recovery</h2>

Validation runs every five minutes. Current new Licman grants have a signed
maximum of 12 hours, never beyond commercial coverage; an outage cannot extend
that bound. Expiry/denial blocks new licensed work while settlement, payment
reconciliation, erasure, export and recovery remain available. Retain administrator
contact, cluster access and independent OpenBao recovery material.

Upgrades use a newly verified release, the same namespaces and retained keys,
preserving schedules and reconciliation journals. Helm rollback does not undo SQL
migrations. Never use another environment's cluster/database as a test fixture.

An optional transport bundle contains prebuilt OCI images and official upstream
charts for offline transfer. It does not disable Licman checks or automatically
grant offline startup/renewal rights.
