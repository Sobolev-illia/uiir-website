import styles from "./SectionTitle.module.css";

export default function SectionTitle({ eyebrow, title, link }) {
  return (
    <div className={styles.row}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {link && <div className={styles.link}>{link}</div>}
    </div>
  );
}
