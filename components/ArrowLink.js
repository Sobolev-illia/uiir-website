import styles from "./ArrowLink.module.css";

export default function ArrowLink({ children }) {
  return <span className={styles.link}>{children}<span aria-hidden="true">→</span></span>;
}
