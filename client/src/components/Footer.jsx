import React from "react";
import styles from "../css/components/Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.foot_con}>
      <div className={styles.left_side}>
        Apexa.tech <span> © All right reserved</span>
      </div>
      <div className={styles.middle}>
        Thanks to{" "}
        <a className={styles.outLinks} href="https://mindsdb.com/">
          mindsDb{" "}
        </a>{" "}
        and
        <a className={styles.outLinks} href="https://hashnode.com/">
          {" "}
          Hashnode
        </a>
      </div>
      <div className={styles.right}>
        Made with 💖 by{" "}
        <a
          className={styles.outLinks}
          href="https://github.com/rajeshkhadka200"
        >
          Rajesh{" "}
        </a>
        and{" "}
        <a
          className={styles.outLinks}
          href="https://github.com/utsavbhattarai007"
        >
          Utsav
        </a>
      </div>
    </div>
  );
};

export default Footer;
