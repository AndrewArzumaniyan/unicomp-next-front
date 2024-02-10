import React, { useState, FC } from "react";
import Modal from "@/components/UI/modal/Modal";
import Radio from "@/components/UI/radio/Radio";
import styles from "./GuideModal.module.scss";

interface GuideModalProps {
  isResize: number;
  isOpen: boolean;
  closeModal: () => void;
  setSelectCity: (city: string) => void;
  cities: string[];
}

const GuideModal: FC<GuideModalProps> = ({ isResize, isOpen, closeModal, setSelectCity, cities }) => {
  const [chcity, setChCity] = useState('');

  return (
    <Modal visible={isOpen} className="uni-modal" delVisible={closeModal}>
      <div className="guide-modal__title-box">
        <h3 className={`guide-modal__title title`}>ВЫБРАТЬ ГОРОД</h3>
      </div>
      
      <div className={`checkbox__list-box ${styles["uni-modal__list-box"]}`}>
        {
          isResize >= 600
            ? [0,1].map((key) => (
              <ul key={key} className="checkbox__list">
                {
                !key
                ? cities.slice(0, Math.round(cities.length / 2)).map((city) => (
                  <li key={`guide-${city}`} className="checkbox__item">
                    <Radio setSelected={setChCity} elem={city} name="city"/>
                  </li>
                ))
                : cities.slice(Math.round(cities.length / 2)).map((city) => (
                  <li key={`guide-${city}`} className="checkbox__item">
                    <Radio setSelected={setChCity} elem={city} name="city"/>
                  </li>
                ))
                }
              </ul>
            ))
          : [3].map((key) => (
            <ul key={key} className="checkbox__list">
                {cities.map((city) => (
                  <li key={`guide-${city}`} className="checkbox__item">
                    <Radio setSelected={setChCity} elem={city} name="city"/>
                  </li>
                ))
                }
            </ul>
          )
          )}
      </div>
      <span onClick={() => { setSelectCity(chcity); closeModal() }} className={`btn ${styles["uni-modal__btn"]}`}>Выбрать</span>
    </Modal>
  );
}

export default GuideModal;
