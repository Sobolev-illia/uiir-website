import styles from "./ActivityCard.module.css";

export default function ActivityCard({ index, title, description, compact = false }) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className={styles.arrow} aria-hidden="true">↗</span>
    </article>
  );
}
