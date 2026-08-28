import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import LocalizedLink from "@/components/LocalizedLink";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return buildMetadata({ locale, path: "/activities", title: d.seo.activitiesTitle, description: d.seo.activitiesDescription });
}

export default async function ActivitiesPage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <PageIntro eyebrow={d.brand.short} title={d.activities.title} text={d.activities.intro} />
      <section className={styles.listSection}>
        <div className={styles.list}>
          {d.activities.items.map((item, index) => (
            <Reveal key={item.title}>
              <article className={styles.item}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.titleCol}><h2>{item.title}</h2><p>{item.description}</p></div>
                <div className={styles.points}><h3>{item.label}</h3><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className={styles.cta}><div><Reveal><h2>{d.home.ctaTitle}</h2></Reveal><Reveal delay={80}><LocalizedLink locale={locale} href="/contact?topic=proposal">{d.nav.proposal}<span>↗</span></LocalizedLink></Reveal></div></section>
    </>
  );
}
