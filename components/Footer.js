"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { siteConfig } from "@/lib/siteConfig";
import { localeHref } from "@/lib/i18n";
import styles from "./Footer.module.css";

const nav = [
    ["about", "/about"],
    ["activities", "/activities"],
    ["projects", "/projects"],
    ["join", "/join"],
    ["documents", "/documents"],
    ["contact", "/contact"],
];

export default function Footer({ locale }) {
    const { t } = useTranslation();
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brandCol}>
                    <Image className={styles.logo} src={siteConfig.logo} alt={t("brand.name")} width={2048} height={401} />
                    <p>{t("footer.statement")}</p>
                </div>
                <nav className={styles.nav} aria-label="Footer navigation">
                    {nav.map(([key, href]) => (
                        <Link key={key} href={localeHref(locale, href)}>
                            {t(`nav.${key}`)}
                        </Link>
                    ))}
                </nav>
                <div className={styles.ctaCol}>
                    <p className="eyebrow">{t("nav.contact")}</p>
                    <Link className={styles.cta} href={`${localeHref(locale, "/contact")}?topic=proposal`}>
                        {t("nav.proposal")} <span>↗</span>
                    </Link>
                </div>
            </div>
            <div className={styles.bottom}>
                <span>
                    © {new Date().getFullYear()} {t("brand.short")}. {t("footer.rights")}
                </span>

                <div className={styles.bottomRight}>
                    <span>{t("footer.location")}</span>

                    <a className={styles.credit} href="https://digital-empire.dev/en" target="_blank" rel="noopener noreferrer">
                        Made by Digital Empire <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
