import React, { useState, useEffect, FC } from "react";
import GeographyHero from "./GeographyHero";
import ModalCard from "@/components/UI/modal/ModalCard";
import Map from "./Map";
import { UniverData } from "@/interfaces/univer.interface";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import('./Map'), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
});

interface MapProps {
  setPickedUniver: (univer: any) => void;
  openModal: () => void;
  googleMapURL: string;
  loadingElement: JSX.Element;
  containerElement: JSX.Element;
  mapElement: JSX.Element;
}

const GeographyMain: FC<any> = ({ universities, isBurgerOpen, setIsBurgerOpen }) => {
  const [pickedUniver, setPickedUniver] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (document.body.classList.contains('hidden')) {
      document.body.classList.remove('hidden')
    }

  }, [])

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('hidden');
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('hidden');
  };

  return (
    <div className="main">
      <GeographyHero isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen}/>

      <ModalCard univer={pickedUniver} visible={isModalOpen} delVisible={closeModal}/>
      
      <div id="main" className="map" style={{ width: `100vw`, height: `100vh` }}>
        <DynamicMap
          setPickedUniver={setPickedUniver}
          openModal={openModal}
          universities={universities}
        />
      </div>
    </div>
  );
};

export default GeographyMain;
