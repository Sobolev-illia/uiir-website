import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/projects",
    title: d.seo.projectsTitle,
    description: d.seo.projectsDescription,
  });
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <PageIntro eyebrow={d.brand.short} title={d.projects.title} text={d.projects.outro} />

      <section className={styles.scope}>
        <div className={styles.scopeInner}>
          <Reveal>
            <div className={styles.scopeLead}>
              <span className="eyebrow">01 · {d.projects.title}</span>
              <h2>{d.projects.intro}</h2>
            </div>
          </Reveal>
          <div className={styles.scopeGrid}>
            {d.projects.areas.map((area, index) => (
              <Reveal key={area} delay={(index % 4) * 45}>
                <div className={styles.scopeItem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{area}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className={styles.outro}>{d.projects.outro}</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.projectsSection} aria-labelledby="project-list-title">
        <div className={styles.projectsInner}>
          <Reveal>
            <div className={styles.headingRow}>
              <span className="eyebrow">02</span>
              <h2 id="project-list-title">{d.projects.title}</h2>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>
          </Reveal>
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 75}>
                <ProjectCard locale={locale} project={project} detailsLabel={d.common.details} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
