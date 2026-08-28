import Image from "next/image";
import styles from "./TeamCard.module.css";

export default function TeamCard({ name, position, description, image = "/images/placeholders/team.svg" }) {
  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Image src={image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
      </div>
      <div className={styles.body}>
        <p className={styles.position}>{position}</p>
        <h3>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
