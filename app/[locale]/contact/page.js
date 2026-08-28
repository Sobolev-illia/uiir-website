import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return buildMetadata({ locale, path: "/contact", title: d.seo.contactTitle, description: d.seo.contactDescription });
}

const allowedTopics = new Set(["general", "proposal", "partnership", "membership"]);

export default async function ContactPage({ params, searchParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const query = await searchParams;
  const defaultTopic = allowedTopics.has(query?.topic) ? query.topic : "general";

  const contactItems = [
    [d.contact.emailLabel, siteConfig.contact.email],
    [d.contact.phoneLabel, siteConfig.contact.phone],
    [d.contact.socialLabel, siteConfig.contact.social],
  ];

  return (
    <>
      <PageIntro eyebrow={d.brand.short} title={d.contact.title} text={d.contact.intro} />
      <section className={styles.section}>
        <div className={styles.inner}>
          <Reveal>
            <aside className={styles.details}>
              <p className="eyebrow">01 · {d.contact.title}</p>
              <h2>{d.contact.organization}</h2>
              <p className={styles.intro}>{d.contact.intro}</p>
              <dl>
                {contactItems.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </aside>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.formPanel} id="proposal-form">
              <p className="eyebrow">02</p>
              <h2>{d.contact.formTitle}</h2>
              <p>{d.contact.formText}</p>
              <ContactForm defaultTopic={defaultTopic} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
