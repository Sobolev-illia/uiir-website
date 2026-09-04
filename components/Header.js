"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";

import { siteConfig } from "@/lib/siteConfig";
import { localeHref } from "@/lib/i18n";

const nav = [
    ["about", "/about"],
    ["activities", "/activities"],
    ["projects", "/projects"],
    ["join", "/join"],
    ["documents", "/documents"],
    ["contact", "/contact"],
];

export default function Header({ locale }) {
    const { t } = useTranslation();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const otherLocale = locale === "uk" ? "en" : "uk";

    const switchedPath = useMemo(() => {
        const parts = pathname.split("/").filter(Boolean);

        if (parts[0] === "uk" || parts[0] === "en") {
            parts[0] = otherLocale;
        } else {
            parts.unshift(otherLocale);
        }

        return `/${parts.join("/")}`;
    }, [pathname, otherLocale]);

    /*
     * Close menu whenever route changes.
     */
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    /*
     * Lock page scrolling while mobile menu is open.
     */
    useEffect(() => {
        document.body.classList.toggle("menu-open", open);

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [open]);

    /*
     * Allow Escape to close the menu.
     */
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link className={styles.logo} href={localeHref(locale, "/")} aria-label={t("brand.name")} onClick={() => setOpen(false)}>
                    <Image src={siteConfig.logo} alt={t("brand.name")} width={2048} height={401} priority />
                </Link>

                <nav className={styles.desktopNav} aria-label="Primary navigation">
                    {nav.map(([key, href]) => (
                        <Link key={key} className={styles.navLink} href={localeHref(locale, href)}>
                            {t(`nav.${key}`)}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <div className={styles.language} aria-label="Language switcher">
                        {locale === "uk" ? <span className={styles.activeLanguage}>UA</span> : <Link href={switchedPath}>UA</Link>}

                        <span aria-hidden="true">/</span>

                        {locale === "en" ? <span className={styles.activeLanguage}>EN</span> : <Link href={switchedPath}>EN</Link>}
                    </div>

                    <Link className={styles.proposal} href={`${localeHref(locale, "/contact")}?topic=proposal`}>
                        {t("nav.proposal")}

                        <span aria-hidden="true">↗</span>
                    </Link>

                    <button
                        className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
                        type="button"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? t("nav.close") : t("nav.menu")}
                        onClick={() => setOpen((value) => !value)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            <div id="mobile-menu" className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`} aria-hidden={!open}>
                <nav className={styles.mobileNav} aria-label="Mobile navigation">
                    <div className={styles.mobileLinks}>
                        {nav.map(([key, href], index) => (
                            <Link
                                key={key}
                                href={localeHref(locale, href)}
                                className={styles.mobileLink}
                                style={{ "--i": index }}
                                onClick={() => setOpen(false)}
                            >
                                <span>{String(index + 1).padStart(2, "0")}</span>

                                {t(`nav.${key}`)}
                            </Link>
                        ))}
                    </div>

                    <Link className={styles.mobileProposal} href={`${localeHref(locale, "/contact")}?topic=proposal`} onClick={() => setOpen(false)}>
                        {t("nav.proposal")}

                        <span>↗</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
