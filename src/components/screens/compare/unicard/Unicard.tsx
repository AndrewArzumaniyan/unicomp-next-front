import React, { FC } from "react";
import styles from "./Unicard.module.scss";
import UnicardEmpty from "./UnicardEmpty";
import UnicardFill from "./UnicardFill";

interface UnicardProps {
  unicardModalOpen: () => void;
  cardsUnivers: any[];
  giveInfo: () => void;
}

const Unicard: FC<UnicardProps> = ({ unicardModalOpen, cardsUnivers, giveInfo }) => {
  const newCardsUnivers = () => {
    let res = [...cardsUnivers];

    if (cardsUnivers.length < 3) {
      for (let i = cardsUnivers.length; i < 3; i++) {
        res.push("");
      }
    }

    return res;
  };

  return (
    <section className={styles.unicard}>
      <div className={styles.color}></div>
      <div className={styles["unicard__slider"]}>
        <h3 className={styles["unicard__title"]}>Выберите хотя бы один ВУЗ</h3>
        <div className={styles["unicard__box"]}>
          {!cardsUnivers.length
            ? [1, 2, 3].map((el) => <UnicardEmpty key={el} onClick={unicardModalOpen} />)
            : newCardsUnivers().map((univer, ind) => {
                if (univer !== "")
                  return <UnicardFill key={univer.id} univer={univer} onClick={unicardModalOpen} />;
                else return <UnicardEmpty key={ind} onClick={unicardModalOpen} />;
              })}
        </div>
      </div>

      <div className={styles["unicard__btn-box"]}>
        <span onClick={giveInfo} className={`${styles["unicard__btn"]} btn`}>
          сравнить
        </span>
        <p className={styles["compare-error-text"]}></p>
      </div>
    </section>
  );
};

export default Unicard;
