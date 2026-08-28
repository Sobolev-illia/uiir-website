import Image from "next/image";
import LocalizedLink from "./LocalizedLink";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ locale, project, detailsLabel }) {
  const title = project.title[locale];
  const description = project.description[locale];
  return (
    <LocalizedLink locale={locale} href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.image}>
        <Image src={project.cover} alt="" fill sizes="(max-width: 820px) 100vw, 50vw" />
        <span className={styles.category}>{project.category[locale]}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}><span>{project.location[locale]}</span><span>{project.year}</span></div>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className={styles.link}>{detailsLabel}<b aria-hidden="true">→</b></span>
      </div>
    </LocalizedLink>
  );
}
