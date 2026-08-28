"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Gallery.module.css";

export default function Gallery({ images, title }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const closeButtonRef = useRef(null);

  const close = useCallback(() => setActive(null), []);
  const previous = useCallback(() => setActive((current) => current === null ? null : (current - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((current) => current === null ? null : (current + 1) % images.length), [images.length]);

  useEffect(() => {
    if (active === null) return;
    document.body.classList.add("lightbox-open");
    closeButtonRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, previous, next]);

  if (!images?.length) return null;

  return (
    <>
      <div className={styles.grid}>
        {images.map((src, index) => (
          <button key={`${src}-${index}`} type="button" className={styles.item} onClick={() => setActive(index)} aria-label={`${t("common.openImage")} ${index + 1}`}>
            <Image src={src} alt={`${title} — ${t("common.image")} ${index + 1}`} fill sizes="(max-width: 720px) 100vw, 50vw" />
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div className={styles.lightboxTop}>
            <span>{String(active + 1).padStart(2, "0")} {t("common.of")} {String(images.length).padStart(2, "0")}</span>
            <button ref={closeButtonRef} type="button" onClick={close} aria-label={t("common.closeGallery")}>×</button>
          </div>
          <div className={styles.stage}>
            <Image src={images[active]} alt={`${title} — ${t("common.image")} ${active + 1}`} fill sizes="100vw" priority />
          </div>
          {images.length > 1 && (
            <>
              <button type="button" className={`${styles.navButton} ${styles.prev}`} onClick={previous} aria-label={t("common.previousImage")}>←</button>
              <button type="button" className={`${styles.navButton} ${styles.next}`} onClick={next} aria-label={t("common.nextImage")}>→</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
