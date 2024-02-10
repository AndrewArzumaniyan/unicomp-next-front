import React, { FC, HTMLProps } from "react";
import styles from "./Unicard.module.scss";
import { Univer } from "@/interfaces/univer.interface";

interface UnicardFillProps extends HTMLProps<HTMLDivElement> {
  univer: Univer
}

const UnicardFill: FC<UnicardFillProps> = ({ univer, ...props }) => {
  return (
    <div {...props} className={styles["unicard__card"] + " " + styles["slide"]}>
      <div
        className={styles["unicard__card-bg"]}
        style={{ backgroundImage: `url(/images/universities/${univer.img ? univer.img.trim() : "bg.png"})` }}
      ></div>
      <p className={styles["unicard__card-name"]}>
        {univer.visibleName ? univer.visibleName.trim() : univer.name.trim()}
      </p>
    </div>
  );
};

export default UnicardFill;
