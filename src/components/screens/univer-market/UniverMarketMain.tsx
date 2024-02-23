import React, { useState, FC, useEffect } from "react";
import ModalCard from "@/components/UI/modal/ModalCard";
import Market from "./UniverMarketCatalog";
import MarketHero from "./UniverMarketHero";
import { Univer } from "@/interfaces/univer.interface";
import Feedback from "@/components/UI/feedback/Feedback";
import FeedbackModal from "@/components/UI/feedback/FeedbackModal";

interface marketMainProps {
  isResize: number;
  universities: Univer[];
}

const MarketMain: FC<marketMainProps> = ({ isResize, universities }) => {
  let [pickedUniver, setPickedUniver] = useState({})
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false)

  useEffect(() => {
    if (document.body.classList.contains('hidden')) {
      document.body.classList.remove('hidden')
    }

  }, [])

  const openModal = () => {
    setIsModalOpen(true)
    document.body.classList.add('hidden')
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    document.body.classList.remove('hidden')
  }

  const openFeedbackModal = () => {
    setFeedbackModalOpen(true)
    document.body.classList.add('hidden')
  }
  
  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false)
    document.body.classList.remove('hidden')
  }

  return (
    <main className="main">
      <MarketHero/>
      
      <FeedbackModal visible={isFeedbackModalOpen} delVisible={closeFeedbackModal} />
      <Feedback openModal={openFeedbackModal} />
      <ModalCard univer={pickedUniver} visible={isModalOpen} delVisible={closeModal}/>
      <Market universities={universities} isResize={isResize} setPickedUniver={setPickedUniver} openModal={openModal}/>
    </main>
  );
}

export default MarketMain