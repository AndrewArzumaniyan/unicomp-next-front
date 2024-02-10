import React, { FC, HTMLProps } from "react";
import styles from "./Unicard.module.scss";

const UnicardEmpty: FC<HTMLProps<HTMLDivElement>> = ({ ...props }) => {
  return (
    <div {...props} className={styles["unicard__card"] + " " + styles["slide"]}>
      <div className={styles["unicard__icon"]}></div>
      <div className={styles["unicard__text"]}>
        <p className={styles["unicard__text-el"]}>Добавить</p>
        <p className={styles["unicard__text-el"]}>университет</p>
      </div>
    </div>
  );
};

export default UnicardEmpty;
