import { notFound } from "next/navigation";

import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";

import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const d = getDictionary(locale);

    return buildMetadata({
        locale,
        path: "/documents",
        title: d.seo.documentsTitle,
        description: d.seo.documentsDescription,
    });
}

export default async function DocumentsPage({ params }) {
    const { locale } = await params;

    if (!isLocale(locale)) notFound();

    const d = getDictionary(locale);

    const documents = [
        {
            title: d.documents.items[0],
            href: "/documents/charter_uiir.pdf",
        },
        {
            title: d.documents.items[1],
            href: "/documents/structure_uiir.pdf",
        },
    ];

    return (
        <>
            <PageIntro eyebrow={d.brand.short} title={d.documents.title} text={d.seo.documentsDescription} />

            <section className={styles.section}>
                <div className={styles.inner}>
                    {documents.map((document, index) => (
                        <Reveal key={document.href} delay={(index % 4) * 55}>
                            <a href={document.href} target="_blank" rel="noopener noreferrer" className={styles.document}>
                                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>

                                <h2>{document.title}</h2>

                                <span className={styles.icon} aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    );
}
