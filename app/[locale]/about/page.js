import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import TeamCard from "@/components/TeamCard";
import LocalizedLink from "@/components/LocalizedLink";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return buildMetadata({ locale, path: "/about", title: d.seo.aboutTitle, description: d.seo.aboutDescription });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const team = Array.from({ length: 3 }, () => d.about.teamPlaceholder);

  return (
    <>
      <PageIntro eyebrow={d.brand.short} title={d.about.title} text={d.about.intro[0]} />
      <nav className={styles.anchorNav} aria-label="About page sections">
        <div>
          <a href="#profile">01 — {d.about.title}</a>
          <a href="#team">02 — {d.about.foundersTitle} / {d.about.leadershipTitle}</a>
          <a href="#structure">03 — {d.about.orgTitle}</a>
          <a href="#mission">04 — {d.about.missionTitle}</a>
          <a href="#vision">05 — {d.about.visionTitle}</a>
        </div>
      </nav>

      <section id="profile" className={styles.section}>
        <div className={styles.split}>
          <Reveal><p className="eyebrow">01 · {d.about.title}</p><h2>{d.brand.name}</h2></Reveal>
          <Reveal className={styles.copy} delay={90}>
            {d.about.intro.map((p) => <p key={p}>{p}</p>)}
            <p className={styles.centersIntro}>{d.about.centersIntro}</p>
          </Reveal>
        </div>
        <div className={styles.centersGrid}>
          {d.about.centers.map((center, index) => <Reveal key={center} delay={(index % 4) * 45}><div className={styles.center}><span>{String(index + 1).padStart(2, "0")}</span><h3>{center}</h3></div></Reveal>)}
        </div>
      </section>

      <section id="team" className={`${styles.section} ${styles.teamSection}`}>
        <Reveal><div className={styles.sectionHeading}><p className="eyebrow">02</p><h2>{d.about.foundersTitle}</h2></div></Reveal>
        <div className={styles.teamGrid}><Reveal><TeamCard {...team[0]} /></Reveal></div>
        <Reveal><div className={`${styles.sectionHeading} ${styles.leadershipHeading}`}><h2>{d.about.leadershipTitle}</h2></div></Reveal>
        <div className={styles.teamGrid}>{team.map((member, index) => <Reveal key={index} delay={index * 70}><TeamCard {...member} /></Reveal>)}</div>
      </section>

      <section id="structure" className={styles.darkSection}>
        <div className={styles.darkInner}>
          <Reveal><p className="eyebrow">03</p><h2>{d.about.orgTitle}</h2></Reveal>
          <Reveal className={styles.darkCopy} delay={90}>
            <p className={styles.lead}>{d.about.orgIntro}</p>
            <p>{d.about.orgPowersIntro}</p>
            <ol>{d.about.orgPowers.map((item) => <li key={item}>{item}</li>)}</ol>
            <p>{d.about.orgManagement}</p>
            <p>{d.about.principlesIntro}</p>
            <div className={styles.principles}>{d.about.principles.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div>
          </Reveal>
        </div>
      </section>

      <section id="mission" className={styles.missionSection}>
        <div className={styles.sectionInner}>
          <Reveal><p className="eyebrow">04</p><h2>{d.about.missionTitle}</h2></Reveal>
          <div className={styles.missionGrid}>{d.about.mission.map((p, index) => <Reveal key={p} delay={index * 70}><p className={index === 0 ? styles.missionLead : ""}>{p}</p></Reveal>)}</div>
        </div>
      </section>

      <section id="vision" className={styles.visionSection}>
        <div className={styles.sectionInner}>
          <Reveal><div className={styles.sectionHeading}><p className="eyebrow">05</p><h2>{d.about.visionTitle}</h2></div></Reveal>
          <div className={styles.visionList}>
            {d.about.vision.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <article className={styles.visionItem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <div>{item.paragraphs.map((p) => <p key={p}>{p}</p>)}{item.items && <ul>{item.items.map((point) => <li key={point}>{point}</li>)}</ul>}</div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal><LocalizedLink locale={locale} href="/contact?topic=proposal" className={styles.contactLink}>{d.nav.proposal}<span>↗</span></LocalizedLink></Reveal>
        </div>
      </section>
    </>
  );
}
