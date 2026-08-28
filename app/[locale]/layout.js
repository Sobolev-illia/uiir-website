import { notFound } from "next/navigation";
import I18nProvider from "@/components/I18nProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteLoader from "@/components/SiteLoader";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <I18nProvider locale={locale}>
      <a className="skipLink" href="#main-content">{d.common.skipToContent}</a>
      <SiteLoader />
      <Header locale={locale} />
      <main id="main-content" className="pageShell">{children}</main>
      <Footer locale={locale} />
    </I18nProvider>
  );
}
