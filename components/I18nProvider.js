"use client";

import { useEffect, useState } from "react";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { resources } from "@/lib/i18n";

export default function I18nProvider({ locale, children }) {
  const [instance] = useState(() => {
    const i18n = createInstance();
    i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: "uk",
      interpolation: { escapeValue: false },
      initImmediate: false,
    });
    return i18n;
  });

  useEffect(() => {
    if (instance.language !== locale) instance.changeLanguage(locale);
    document.documentElement.lang = locale === "uk" ? "uk" : "en";
  }, [instance, locale]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
