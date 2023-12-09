import React from "react";
import styles from "../css/components/FirstHero.module.css";

const FirstHero = () => {
  return (
    <>
      <div className={styles.heroContainer}>
        <h2>
          Exploring mindsDb & traning the <span>AI model</span>{" "}
        </h2>
        <p>
          The easiest way to manage, build, and ship video/audio experiences on
          the frontend. Starting with React & Next.js.
        </p>
        <div className={styles.btnCon}>
          <button className={styles.btn_github}>GitHub</button>
          <button className={styles.btn_join}>Join</button>
        </div>
      </div>
    </>
  );
};

export default FirstHero;
