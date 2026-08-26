import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang] | string, params?: Record<string, string | number>): string {
    const dict = ui[lang] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    let value = dict[key] ?? fallback[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replaceAll(`{${k}}`, String(v));
      }
    }
    return value;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  if (path.startsWith("/#")) {
    return `/${lang}/${path.slice(1)}`;
  }
  if (path === "/") return `/${lang}/`;
  if (path.startsWith(`/${lang}`)) return path;
  const hashIndex = path.indexOf("#");
  if (hashIndex !== -1) {
    const base = path.slice(0, hashIndex);
    const hash = path.slice(hashIndex);
    if (base === "/") return `/${lang}/${hash}`;
    return `/${lang}${base}${hash}`;
  }
  return `/${lang}${path}`;
}

export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  const currentLang = getLangFromUrl(new URL(currentPath, "https://example.com"));
  let stripped = currentPath;
  if (currentLang !== defaultLang) {
    stripped = stripped.replace(new RegExp(`^/${currentLang}`), "") || "/";
  }
  // stripped always starts with "/"
  if (targetLang === defaultLang) return stripped || "/";
  if (stripped === "/") return `/${targetLang}/`;
  return `/${targetLang}${stripped}`;
}

export function getLocalizedUrl(url: URL, lang: Lang): string {
  return getLocalizedPath(url.pathname + url.search + url.hash, lang);
}
