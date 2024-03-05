import React, { FC } from "react";
import styles from "./Unicard.module.scss";
import UnicardEmpty from "./UnicardEmpty";
import UnicardFill from "./UnicardFill";

interface UnicardProps {
  unicardModalOpen: () => void;
  cardsUnivers: any[];
}

const Unicard: FC<UnicardProps> = ({ unicardModalOpen, cardsUnivers }) => {
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
    <section id="main" className={styles.unicard}>
      <div className={styles.color}></div>
      <div className="container">
        <h2 className={`${styles["unicard__tile-head"]} title`}>СРАВНИ УНИВЕРСИТЕТЫ</h2>
        <h4 className={styles["unicard__subtitle"]}>выбери ВУЗы</h4>
      </div>
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
    </section>
  );
};

export default Unicard;
