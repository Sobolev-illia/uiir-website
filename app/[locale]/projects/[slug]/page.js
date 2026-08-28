import { notFound } from "next/navigation";
import LocalizedLink from "@/components/LocalizedLink";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import StructuredData from "@/components/StructuredData";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./page.module.css";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.title[locale],
    description: project.description[locale],
    image: project.cover,
  });
}

export default async function ProjectDetailPage({ params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  const d = getDictionary(locale);
  const title = project.title[locale];
  const description = project.description[locale];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    inLanguage: locale === "uk" ? "uk-UA" : "en",
    url: `${siteConfig.siteUrl}/${locale}/projects/${project.slug}`,
    image: project.gallery.map((image) => new URL(image, siteConfig.siteUrl).toString()),
    locationCreated: project.location[locale],
  };

  return (
    <>
      <StructuredData data={schema} />
      <article>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <Reveal>
              <LocalizedLink locale={locale} href="/projects" className={styles.backLink}>
                <span aria-hidden="true">←</span>{d.common.backToProjects}
              </LocalizedLink>
            </Reveal>
            <div className={styles.titleGrid}>
              <Reveal><p className="eyebrow">{project.category[locale]}</p></Reveal>
              <Reveal delay={70}><h1>{title}</h1></Reveal>
            </div>
            <div className={styles.metaGrid}>
              <Reveal><div><span>01</span><p>{project.location[locale]}</p></div></Reveal>
              <Reveal delay={50}><div><span>02</span><p>{project.year}</p></div></Reveal>
              <Reveal delay={100} className={styles.description}><p>{description}</p></Reveal>
            </div>
          </div>
        </header>

        <section className={styles.gallerySection} aria-label={title}>
          <div className={styles.galleryInner}>
            <Reveal>
              <div className={styles.galleryHeading}>
                <p className="eyebrow">{d.common.gallery}</p>
                <span>{String(project.gallery.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <Gallery images={project.gallery} title={title} />
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <Reveal><p className="eyebrow">{d.brand.short}</p><h2>{d.home.ctaTitle}</h2></Reveal>
            <Reveal delay={80}>
              <LocalizedLink locale={locale} href="/contact?topic=proposal">{d.nav.proposal}<span aria-hidden="true">↗</span></LocalizedLink>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
