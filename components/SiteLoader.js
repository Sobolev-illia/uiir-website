"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./SiteLoader.module.css";

export default function SiteLoader() {
  const [animationData, setAnimationData] = useState(null);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/animations/logo-animation.json")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => active && setAnimationData(data))
      .catch(() => {});

    const finish = () => window.setTimeout(() => active && setReady(true), 520);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      active = false;
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setHidden(true), 650);
    return () => window.clearTimeout(timer);
  }, [ready]);

  if (hidden) return null;

  return (
    <div className={`${styles.loader} ${ready ? styles.leaving : ""}`} aria-hidden="true">
      <div className={styles.content}>
        {animationData ? (
          <Lottie className={styles.lottie} animationData={animationData} loop />
        ) : (
          <Image className={styles.fallbackLogo} src={siteConfig.logo} alt="" width={2048} height={401} priority />
        )}
        <span className={styles.line} />
      </div>
    </div>
  );
}
