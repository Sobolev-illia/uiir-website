import Image from "next/image";
import LocalizedLink from "./LocalizedLink";
import styles from "./Hero.module.css";

export default function Hero({ locale, kicker, titleLines, text, media, ctaLabel }) {
  return (
    <section className={styles.hero}>
      <div className={styles.media} aria-hidden="true">
        {media?.type === "video" ? (
          <video autoPlay muted loop playsInline poster={media.poster || undefined}>
            <source src={media.src} />
          </video>
        ) : media?.src ? (
          <Image src={media.src} alt={media.alt || ""} fill priority sizes="100vw" />
        ) : (
          <div className={styles.mediaFallback} />
        )}
      </div>
      <div className={styles.scrim} />
      <div className={styles.inner}>
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.title}>
          {titleLines.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}
        </h1>
        <p className={styles.text}>{text}</p>
        <LocalizedLink className={styles.cta} locale={locale} href="/projects">
          {ctaLabel}<span aria-hidden="true">→</span>
        </LocalizedLink>
      </div>
      <div className={styles.scrollCue} aria-hidden="true"><span /></div>
    </section>
  );
}
