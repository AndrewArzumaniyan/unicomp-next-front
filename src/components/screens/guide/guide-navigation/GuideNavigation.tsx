import React, { FC } from "react";
import styles from "./GuideNavigation.module.scss";

interface GuideNavigationProps {
  openModal: () => void;
  selectCity: string;
}

const GuideNavigation: FC<GuideNavigationProps> = ({ openModal, selectCity }) => {
  const scroll = (el: React.MouseEvent<HTMLDivElement>) => {
    if (!selectCity) return;
    const target = el.target as HTMLElement;
    let to = document.getElementById(target.dataset.scrollto!);
    to?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="main" className={styles["navigation"]}>
      <div className={styles["guide-container"]}>
        <div className={styles["btn-box"]}>
          <span onClick={openModal} className={`btn ${styles["btn"]}`}>Выбрать город</span>
        </div>
        <div className={styles["navigation__wrapper"]}>
        <div className={`${styles["navigation__column"]} ${styles["navigation__column-left"]}`}>
            <div className={`${selectCity ? styles['enabled'] : styles['disabled']} ${styles["navigation__element"]}`} data-scrollto="food" onClick={scroll}>
              <div
                data-scrollto="food"
                className={styles["navigation__element-bg"]}
                style={{backgroundImage: `url(/images/universities/food.png`}}
              ></div>
              <h3 className={styles["navigation__element-title"]} data-scrollto="food">
                еда
              </h3>
            </div>

            <div className={`${selectCity ? styles['enabled'] : styles['disabled']} ${styles["navigation__element"]}`} data-scrollto="relax" onClick={scroll}>
              <div 
                data-scrollto="relax"
                className={styles["navigation__element-bg"]}
                style={{backgroundImage: `url(/images/universities/relax.png`}}
              ></div>
              <h3 className={styles["navigation__element-title"]} data-scrollto="relax">
                отдых
              </h3>
            </div>
          </div>

          <div className={`${`${selectCity ? styles['enabled'] : styles['disabled']} ${styles["navigation__element"]}`} ${styles["navigation__element-center"]}`} data-scrollto="accomodation" onClick={scroll}>
            <div 
              data-scrollto="accomodation"
              className={styles["navigation__element-bg"]}
              style={{backgroundImage: `url(/images/universities/accomodation.png`}}
            ></div>
            <h3 className={styles["navigation__element-title"]} data-scrollto="accomodation">
              жилье
            </h3>
          </div>

          <div className={`${styles["navigation__column"]} ${styles["navigation__column-right"]}`}>
            <div className={`${selectCity ? styles['enabled'] : styles['disabled']} ${styles["navigation__element"]}`} data-scrollto="application" onClick={scroll}>
              <div 
                data-scrollto="application"
                className={styles["navigation__element-bg"]}
                style={{backgroundImage: `url(/images/universities/application.png`}}
              ></div>
              <h3 className={styles["navigation__element-title"]} data-scrollto="application">
                приложения
              </h3>
            </div>

            <div className={`${selectCity ? styles['enabled'] : styles['disabled']} ${styles["navigation__element"]}`} data-scrollto="transport" onClick={scroll}>
              <div 
                data-scrollto="transport"
                className={styles["navigation__element-bg"]}
                style={{backgroundImage: `url(/images/universities/transport.png`}}
              ></div>
              <h3 className={styles["navigation__element-title"]} data-scrollto="transport">
                транспорт
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideNavigation;
