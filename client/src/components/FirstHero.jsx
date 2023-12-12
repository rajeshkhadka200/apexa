import React from "react";
import styles from "../css/components/FirstHero.module.css";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const FirstHero = () => {
  return (
    <>
      <div className={styles.heroContainer}>
        <h2>
          Exploring mindsDb & traning the <br /> <span>AI model</span>{" "}
        </h2>
        <p>
          The easiest way to manage, build, and ship video/audio experiences on
          the frontend. Starting with React & Next.js.
        </p>
        <div className={styles.btnCon}>
          <a target="_blank" href="https://github.com/rajeshkhadka200/apexa">
            <button className={styles.btn_github}>GitHub</button>
          </a>
          <button className={styles.btn_join}>
            <NavLink to="/app" className={styles.join_text}>
              Join <BsArrowRight className={styles.right_icon} size={25} />
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default FirstHero;
