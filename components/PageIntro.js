import styles from "./PageIntro.module.css";

export default function PageIntro({ eyebrow, title, text, aside }) {
    return (
        <section className={styles.intro}>
            <div className={styles.inner}>
                <div>
                    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                    <h1>{title}</h1>
                </div>
                {/* <div className={styles.copy}>
                    {text && <p>{text}</p>}
                    {aside && <div className={styles.aside}>{aside}</div>}
                </div> */}
            </div>
        </section>
    );
}
