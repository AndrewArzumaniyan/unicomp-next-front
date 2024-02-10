import React, { FC } from "react";
import styles from "./PageLoading.module.scss";

const PageLoading = ({}) => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["scene"]}>
        <div className={styles["cube-wrapper"]}>
          <div className={styles["cube"]}>
            <div className={styles["cube-faces"]}>
              <div className={`${styles["cube-face"]} ${styles["shadow"]}`}></div>
              <div className={`${styles["cube-face"]} ${styles["bottom"]}`}></div>
              <div className={`${styles["cube-face"]} ${styles["top"]}`}></div>
              <div className={`${styles["cube-face"]} ${styles["left"]}`}></div>
              <div className={`${styles["cube-face"]} ${styles["right"]}`}></div>
              <div className={`${styles["cube-face"]} ${styles["back"]}`}></div>
              <div className={`${styles["cube-face"]} ${styles["front"]}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default PageLoading;