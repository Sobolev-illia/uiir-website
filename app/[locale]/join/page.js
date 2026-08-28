import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import LocalizedLink from "@/components/LocalizedLink";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, isLocale } from "@/lib/i18n";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return buildMetadata({ locale, path: "/join", title: d.seo.joinTitle, description: d.seo.joinDescription });
}

export default async function JoinPage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <PageIntro eyebrow={d.brand.short} title={d.join.title} text={d.join.paragraphs[0]} />
      <section className={styles.section}>
        <div className={styles.inner}>
          <Reveal><p className="eyebrow">01 · {d.join.title}</p></Reveal>
          <div className={styles.content}>
            {d.join.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 70}><p className={index === 0 ? styles.lead : ""}>{paragraph}</p></Reveal>
            ))}
            <Reveal delay={140}>
              <LocalizedLink locale={locale} href="/contact?topic=membership" className={styles.cta}>
                {d.join.cta}<span aria-hidden="true">↗</span>
              </LocalizedLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
