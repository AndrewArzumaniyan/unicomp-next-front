import React, { useState, useMemo, FC } from "react";
import GeographyHero from "./GuideHero";
import GuideNavigation from "./guide-navigation/GuideNavigation";
import useLoadBd from "@/hooks/useLoad";
import GuideModal from "./modal/GuideModal";
import GuideArticle from "./article/GuideArticle";

interface GuideMainProps {
  isResize: number;
  data: any;
}

const GuideMain: FC<GuideMainProps> = ({ isResize, data }) => {
  let [isModalOpen, setModalOpen] = useState(false);
  let [selectCity, setSelectCity] = useState('');

  const selectGuide = useMemo(() => {
    if (!data) return null;
    return data.filter((el: any) => el.name === selectCity)[0];
  }, [selectCity]);

  const readyCities = useMemo(() => {
    if (!data) return [];
    let tmp: string[] = [];
    for (let el of data) {
      tmp.push(el.name);
    }
    return tmp;
  }, [data]);

  const openModal = () => {
    setModalOpen(true);
    document.body.classList.add('hidden');
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove('hidden');
  };

  return (
    <div className="main">
      <GuideModal isResize={isResize} setSelectCity={setSelectCity} isOpen={isModalOpen} closeModal={closeModal} cities={readyCities}/>
      <GeographyHero/>
      <GuideNavigation selectCity={selectCity} openModal={openModal}/>
      {selectGuide ?
        <GuideArticle guideEl={selectGuide}/>
      : ""
      }
    </div>
  );
};

export default GuideMain;
