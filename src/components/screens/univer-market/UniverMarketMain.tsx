import React, { useState, FC } from "react";
import ModalCard from "@/components/UI/modal/ModalCard";
import Market from "./UniverMarketCatalog";
import MarketHero from "./UniverMarketHero";
import { Univer } from "@/interfaces/univer.interface";

interface marketMainProps {
  isResize: number;
  universities: Univer[];
}

const MarketMain: FC<marketMainProps> = ({ isResize, universities }) => {
  let [pickedUniver, setPickedUniver] = useState({})
  let [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    document.body.classList.add('hidden')
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    document.body.classList.remove('hidden')
  }

  return (
    <main className="main">
      <MarketHero/>
      
      <ModalCard univer={pickedUniver} visible={isModalOpen} delVisible={closeModal}/>
      <Market universities={universities} isResize={isResize} setPickedUniver={setPickedUniver} openModal={openModal}/>
    </main>
  );
}

export default MarketMain