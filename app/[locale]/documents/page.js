import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const d = getDictionary(locale);
    return buildMetadata({ locale, path: "/documents", title: d.seo.documentsTitle, description: d.seo.documentsDescription });
}

export default async function DocumentsPage({ params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const d = getDictionary(locale);

    return (
        <>
            <PageIntro eyebrow={d.brand.short} title={d.documents.title} text={d.seo.documentsDescription} />
            <section className={styles.section}>
                <div className={styles.inner}>
                    {d.documents.items.map((item, index) => (
                        <Reveal key={item} delay={(index % 4) * 55}>
                            <article className={styles.document}>
                                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                                <h2>{item}</h2>
                                <span className={styles.status}>{d.common.filePending}</span>
                                <span className={styles.icon} aria-hidden="true">
                                    ↗
                                </span>
                            </article>
                        </Reveal>
                    ))}
                    {/* <p className={styles.note}>/public/documents/</p> */}
                </div>
            </section>
        </>
    );
}
