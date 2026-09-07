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
    ];

    const socials = [
        {
            name: "Instagram",
            href: "https://www.instagram.com/uiir_ua?igsi=MXA0emt5Y28xYmRjOA==",
            icon: "instagram",
        },
        {
            name: "Facebook",
            href: "https://www.facebook.com/share/1BkmsDmMFL/?mibextid=wwXIfr",
            icon: "facebook",
        },
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
                                    <div key={label}>
                                        <dt>{label}</dt>
                                        <dd>{value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <div className={styles.socialBlock}>
                                <p className={styles.socialLabel}>{d.contact.socialLabel}</p>

                                <div className={styles.socials}>
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.socialLink}
                                            aria-label={social.name}
                                        >
                                            <span className={styles.socialIcon}>
                                                {social.icon === "instagram" && (
                                                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                                        <rect x="3" y="3" width="18" height="18" rx="5" />

                                                        <circle cx="12" cy="12" r="4" />

                                                        <circle cx="17.5" cy="6.5" r="0.8" />
                                                    </svg>
                                                )}

                                                {social.icon === "facebook" && (
                                                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                                                        <path d="M14 21v-8h3l.5-3H14V8.1c0-1.2.4-2.1 2.2-2.1H18V3.2c-.4-.1-1.3-.2-2.4-.2C12.7 3 11 4.8 11 7.8V10H8v3h3v8" />
                                                    </svg>
                                                )}
                                            </span>

                                            <span className={styles.socialName}>{social.name}</span>

                                            <span className={styles.socialArrow} aria-hidden="true">
                                                ↗
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
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
