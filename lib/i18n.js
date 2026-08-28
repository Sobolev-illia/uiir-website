import uk from "@/locales/uk/common.json";
import en from "@/locales/en/common.json";

export const locales = ["uk", "en"];
export const defaultLocale = "uk";

export const resources = {
  uk: { translation: uk },
  en: { translation: en },
};

export function isLocale(value) {
  return locales.includes(value);
}

export function getDictionary(locale) {
  return resources[isLocale(locale) ? locale : defaultLocale].translation;
}

export function localeHref(locale, href = "/") {
  const [pathname, query] = href.split("?");
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const localized = clean === "/" ? `/${locale}` : `/${locale}${clean}`;
  return query ? `${localized}?${query}` : localized;
}
