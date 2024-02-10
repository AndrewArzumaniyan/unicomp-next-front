import React, { FC } from "react";
import styles from "./Univers.module.scss";

const Univers: FC = () => {
  return (
    <section className={styles.univers}>
      <div className={styles.color}></div>
      <div className="container">
        <h2 className={`${styles.univers__title} title`}>ВЫБРАТЬ ВУЗЫ</h2>
        <h3 className={styles.univers__subtitle}>Рекомендованные</h3>
      </div>
      <div className={styles.univers__advertisement}>
        Тут могла бы быть ваша реклама!
      </div>
    </section>
  );
};

export default Univers;
