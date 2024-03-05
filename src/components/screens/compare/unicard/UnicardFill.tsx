import React, { FC, HTMLProps, useContext } from "react";
import styles from "./Unicard.module.scss";
import { Univer } from "@/interfaces/univer.interface";
import { ThemeContext } from "@/contexts/theme.context";

interface UnicardFillProps extends HTMLProps<HTMLDivElement> {
  univer: Univer
}

const UnicardFill: FC<UnicardFillProps> = ({ univer, ...props }) => {
  const { theme } = useContext(ThemeContext);

  const stBg = theme === 'light' ? 'url(/images/hero-light.png' : 'url(/images/universities/bg.png';
  const bgPath = univer.img ? `url(/images/universities/${univer.img.trim()}` : stBg;

  return (
    <div {...props} className={styles["unicard__card"] + " " + styles["slide"]}>
      <div
        className={`${styles["unicard__card-bg"]}`}
        style={{ backgroundImage: bgPath }}
      ></div>
      {
        <p className={styles["unicard__card-name"]}>
          {univer.visibleName ? univer.visibleName.trim() : univer.name.trim()}
        </p>
      }
    </div>
  );
};

export default UnicardFill;
