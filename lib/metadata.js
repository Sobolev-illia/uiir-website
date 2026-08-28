import { siteConfig } from "@/lib/siteConfig";
import { localeHref } from "@/lib/i18n";

export function buildMetadata({ locale, path = "/", title, description, image }) {
  const localizedPath = localeHref(locale, path);
  const canonical = new URL(localizedPath, siteConfig.siteUrl).toString();
  const ukUrl = new URL(localeHref("uk", path), siteConfig.siteUrl).toString();
  const enUrl = new URL(localeHref("en", path), siteConfig.siteUrl).toString();
  const ogImage = new URL(image || siteConfig.defaultOgImage, siteConfig.siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "uk-UA": ukUrl,
        en: enUrl,
        "x-default": ukUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      alternateLocale: locale === "uk" ? ["en_US"] : ["uk_UA"],
      url: canonical,
      siteName: locale === "uk" ? "Український міжнародний інститут відновлення" : "Ukrainian International Institute of Restoration",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
