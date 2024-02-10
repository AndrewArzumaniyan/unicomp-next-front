import React, { useState, useMemo, FC } from "react";
import axios from "axios";
import Checkbox from "@/components/UI/checkbox/Checkbox";
import styles from "./Unicard.module.scss";
import SearchBox from "@/components/UI//searchbox/SearchBox";
import Modal from "@/components/UI/modal/Modal";
import useLoadBd from "@/hooks/useLoad";
import { Univer } from "@/interfaces/univer.interface";

interface UnicardModalProps {
  isResize: number;
  isOpen: boolean;
  unicardModalClose: () => void;
  checkeds: any[];
  setCheckeds: (checked: any[]) => void;
  addUniCards: () => void;
  universities: Univer[];
}

const UnicardModal: FC<UnicardModalProps> = ({
  isResize,
  isOpen,
  unicardModalClose,
  checkeds,
  setCheckeds,
  addUniCards,
  universities
}) => {
  // let [data, dataLoading] = useLoadBd("http://www.unicomp.kz/api/universities");
  let [searchQuery, setSearchQuery] = useState('');

  const universitiesSearch = useMemo(() => {
    if (!universities) return null;
    return universities
      .filter((univer: any) => univer.name.toLowerCase().includes(searchQuery) || (univer.visibleName && univer.visibleName.toLowerCase().includes(searchQuery)))
      .sort((a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
  }, [searchQuery, universities]);

  return (
    <Modal visible={isOpen} className={`uni-modal ${styles["uni-modal"]}`} delVisible={unicardModalClose}>
      <div className={styles["uni-modal__title-box"]}>
        <h2 className={`${styles["uni-modal__title"]} title`}>Выберите университет:</h2>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className={`checkbox__list-box ${styles["uni-modal__list-box"]}`}>
        {universitiesSearch && universitiesSearch.length ? isResize >= 600
          ? [0, 1].map((key) => (
            <ul key={key} className="checkbox__list">
              {
                !key
                  ? universitiesSearch && universitiesSearch.slice(0, Math.round(universitiesSearch.length / 2)).map((university: any) => (
                    <li key={university._id} className="checkbox__item">
                      <Checkbox checkeds={checkeds} setCheckeds={setCheckeds} elem={university} />
                    </li>
                  ))
                  : universitiesSearch && universitiesSearch.slice(Math.round(universitiesSearch.length / 2)).map((university: any) => (
                    <li key={university._id} className="checkbox__item">
                      <Checkbox checkeds={checkeds} setCheckeds={setCheckeds} elem={university} />
                    </li>
                  ))
              }
            </ul>
          ))
          : [3].map((key) => (
            <ul key={key} className="checkbox__list">
              {universitiesSearch && universitiesSearch.map((university: any) => (
                <li key={university._id} className="checkbox__item">
                  <Checkbox checkeds={checkeds} setCheckeds={setCheckeds} elem={university} />
                </li>
              ))}
            </ul>
          )) : "Ничего не найдено:("
        }
      </div>
      <span onClick={addUniCards} className={`${styles["uni-modal__btn"]} btn`}>Выбрать</span>
    </Modal>
  );
};

export async function getStaticProps() {
  let universities = [];

  try {
    const response = await axios.get('http://www.unicomp.kz/api/universities');
    universities = response.data;
  } catch (error) {
    console.error("An error occurred while fetching the universities:", error);
  }

  return {
    props: { universities },
    revalidate: 120 // Перегенерация страницы каждые 2 минуты
  };
}

export default UnicardModal;