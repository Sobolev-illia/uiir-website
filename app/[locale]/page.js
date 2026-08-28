import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ActivityCard from "@/components/ActivityCard";
import ProjectCard from "@/components/ProjectCard";
import LocalizedLink from "@/components/LocalizedLink";
import ArrowLink from "@/components/ArrowLink";
import StructuredData from "@/components/StructuredData";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const d = getDictionary(locale);
    return buildMetadata({ locale, title: d.seo.homeTitle, description: d.seo.homeDescription });
}

export default async function HomePage({ params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const d = getDictionary(locale);
    const featured = d.activities.items.slice(0, 4);

    return (
        <>
            <StructuredData
                data={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: d.brand.name,
                    url: new URL(`/${locale}`, siteConfig.siteUrl).toString(),
                    logo: new URL(siteConfig.logo, siteConfig.siteUrl).toString(),
                }}
            />
            <Hero
                locale={locale}
                kicker={d.home.heroKicker}
                titleLines={d.home.heroTitleLines}
                text={d.home.heroText}
                media={siteConfig.heroMedia}
                ctaLabel={d.common.viewProjects}
            />

            <section className={styles.stats}>
                <div className={styles.statsInner}>
                    {[
                        [d.home.foundedValue, d.home.foundedLabel],
                        [d.home.centersValue, d.home.centersLabel],
                        [d.home.activityValue, d.home.activityLabel],
                    ].map(([value, label], index) => (
                        <Reveal key={label} className={styles.stat} delay={index * 80}>
                            <strong>{value}</strong>
                            <span>{label}</span>
                        </Reveal>
                    ))}
                    <Reveal className={styles.statStatement} delay={240}>
                        <span>{d.brand.eyebrow}</span>
                    </Reveal>
                </div>
            </section>

            <section className={styles.aboutPreview}>
                <div className={styles.aboutGrid}>
                    <Reveal>
                        <p className="eyebrow">{d.nav.about}</p>
                        <h2>{d.home.aboutTitle}</h2>
                    </Reveal>
                    <Reveal className={styles.aboutCopy} delay={100}>
                        {d.home.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                        <LocalizedLink locale={locale} href="/about">
                            <ArrowLink>{d.common.learnMore}</ArrowLink>
                        </LocalizedLink>
                    </Reveal>
                </div>
            </section>

            <section className={styles.missionBand}>
                <div className={styles.missionInner}>
                    <Reveal>
                        <p className={styles.missionKicker}>{d.home.missionKicker}</p>
                    </Reveal>
                    <Reveal delay={80}>
                        <blockquote>{d.home.missionQuote}</blockquote>
                    </Reveal>
                </div>
            </section>

            <section className={styles.activities}>
                <div className={styles.sectionInner}>
                    <Reveal>
                        <SectionTitle
                            eyebrow={d.nav.activities}
                            title={d.home.featuredActivities}
                            link={
                                <LocalizedLink locale={locale} href="/activities">
                                    <ArrowLink>{d.common.allActivities}</ArrowLink>
                                </LocalizedLink>
                            }
                        />
                    </Reveal>
                    <div className={styles.activityGrid}>
                        {featured.map((item, index) => (
                            <Reveal key={item.title} delay={index * 70}>
                                <ActivityCard index={index} title={item.title} description={item.description} compact />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.projects}>
                <div className={styles.sectionInner}>
                    <Reveal>
                        <SectionTitle eyebrow={d.projects.title} title={d.home.featuredProjects} />
                    </Reveal>

                    <div className={styles.projectGrid}>
                        {projects.slice(0, 3).map((project, index) => (
                            <Reveal key={project.slug} delay={index * 80}>
                                <ProjectCard locale={locale} project={project} detailsLabel={d.common.details} />
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <div className={styles.projectsFooter}>
                            <LocalizedLink locale={locale} href="/projects" className={styles.allProjectsButton}>
                                <span>{d.common.viewProjects}</span>
                                <span className={styles.allProjectsArrow}>↗</span>
                            </LocalizedLink>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className={styles.ctaBand}>
                <div className={styles.ctaInner}>
                    <Reveal>
                        <h2>{d.home.ctaTitle}</h2>
                    </Reveal>
                    <Reveal className={styles.ctaCopy} delay={100}>
                        <p>{d.home.ctaText}</p>
                        <LocalizedLink locale={locale} href="/contact">
                            <span className={styles.ctaButton}>
                                {d.common.contactUs}
                                <b>↗</b>
                            </span>
                        </LocalizedLink>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
