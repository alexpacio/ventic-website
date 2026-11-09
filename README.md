# Ventic website

Public Italian/English Astro website. The requirements-first self-hosted demo guide
is at `/demo/` and `/en/demo/`, linked from the navigation/footer. It covers the
Contoso fork, signed release, Kubernetes/service wiring, OpenBao, Licman demo keys,
verified paid activation and ongoing operations.

```sh
npm ci
npm run build
npm run test:guide
```

Guide source: `src/pages/demo.md`, `src/pages/en/demo.md`; shared presentation:
`src/layouts/GuideLayout.astro`. Browser checks serve only the built `dist/` tree
on loopback. No credentials or runtime configuration belong in this repository.
