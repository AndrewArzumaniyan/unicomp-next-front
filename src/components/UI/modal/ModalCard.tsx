import React, { FC } from "react";
import Modal from "./Modal";
import styles from "./ModalCard.module.scss";
import Link from "next/link";

interface ModalProps {
  visible: boolean;
  delVisible: () => void;
  univer: any
}

const MarketModal: FC<ModalProps> = ({visible, delVisible, univer}) => {
  function createMarketDescr(field : (string | number), title : string) {
    if (!field || field === '-')
      return
    return (
      <div className="market-modal__descr-box">
        <h5 className="market-modal__subtitle">
          {title}
        </h5>
        <p className="market-modal__descr-info">
          {field}
        </p>
      </div>
    )
  } 

  return (
    <Modal visible={visible} delVisible={delVisible} className={`${styles["market-modal"]} market-modal`} modalClose={false}>
      <div
        className={styles["market-modal__bg"]}
        style={{backgroundImage: `url(/images/universities/${univer.img ? univer.img.trim() : "bg.png"})`}}
      ></div>
      <div className={styles["market-modal__info"]}>
        <Link href={`/univer/${univer._id ? univer._id.toString() : ''}`} target="_blank" className={styles["market-modal__title"]}>
          {univer.visibleName ? univer.visibleName : univer.name}
        </Link>
          <h4 className={styles["market-modal__address"]}>
            {univer.city}, {univer.address}
          </h4>
          {createMarketDescr(univer.price, "Цена обучения на бакалавриате:")}
          {createMarketDescr(univer.campus, "Общежитие:")}
          {createMarketDescr(univer.ENTgrants, "Гранты по ЕНТ:")}
          {createMarketDescr(univer.lang, "Язык обучения:")}
          {createMarketDescr(univer.internalGrants, "Внутренние гранты:")}
          {createMarketDescr(univer.magistracy, "Магистратура:")}
          {createMarketDescr(univer.priceMagistracy, "Цена обучения на магистратуре:")}
          {createMarketDescr(univer.doctoral, "Докторантура:")}
          {createMarketDescr(univer.priceDoctoral, "Цена обучения на докторантуре:")}
          {createMarketDescr(univer.exchangeStudy, "Академическая мобильность:")}
          {createMarketDescr(univer.tel, "Телефон:")}
          {createMarketDescr(univer.mail, "Email:")}
        </div>
        {/* </div> */}
    </Modal>
  );
}

export default MarketModal