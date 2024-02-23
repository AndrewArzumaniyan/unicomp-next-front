import { FC, useState, useEffect } from "react";
import Category from "./category/Category";
import Hero from "./CompareHero";
import Unicard from "./unicard/Unicard";
import UnicardModal from "./unicard/UnicardModal";
import FeedbackModal from "@/components/UI/feedback/FeedbackModal";
import Univers from "./univers/Univers";
import DesktopTable from "./table/DesktopTable";
import MobileTable from "./table/MobileTable";
import Feedback from "@/components/UI/feedback/Feedback";
import { Category as CategoryInterface } from "@/interfaces/category.interface";
import { Univer } from "@/interfaces/univer.interface";

interface MainProps {
  isResize: number;
  categories: CategoryInterface[];
  universities: Univer[];
}

const Main: FC<MainProps> = ({ isResize, categories, universities }) => {
  let [isUnicardModalOpen, setUnicardModalOpen] = useState(false);
  let [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  let [checkedUniversities, setCheckedUniversities] = useState<any[]>([]);
  let [checkedCategories, setCheckedCategories] = useState<any[]>([]);
  let [cardsUnivers, setCardsUnivers] = useState<any[]>([]);
  let [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    if (document.body.classList.contains('hidden')) {
      document.body.classList.remove('hidden')
    }

  }, [])

  const openUnicardModal = () => {
    setUnicardModalOpen(true)
    document.body.classList.add('hidden')
  }
  const closeUnicardModal = () => {
    setUnicardModalOpen(false)
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

  const addUniCards = () => {
    setCardsUnivers(checkedUniversities)
    closeUnicardModal()
  }

  const giveInfo = () => {
    if (checkedCategories.length < 1 || checkedUniversities.length < 1) {
      const element = document.getElementById('main');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      return;
    }
    setRows([])
    let tmp = [];
    for (let i in checkedCategories) {
      let row = [];
      row.push(checkedCategories[i].name);
      for (let university of checkedUniversities) {
        if (university[checkedCategories[i].id])
          row.push(university[checkedCategories[i].id]);
        else 
          row.push('-');
      }
      tmp.push(row);
    }
    setRows(tmp)

    tmp = []
    for(let university of checkedUniversities) {
      tmp.push(university)
    }
    setTimeout(() => {
      const element = document.getElementById('table');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 200);
  }

  return (
    <main className="main">
      <Hero />
      <Category checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} categories={categories} />
      <Univers />
      <UnicardModal 
        isResize={isResize} 
        addUniCards={addUniCards} 
        checkeds={checkedUniversities} 
        setCheckeds={setCheckedUniversities} 
        isOpen={isUnicardModalOpen} 
        unicardModalClose={closeUnicardModal} 
        universities={universities}
      />
      <FeedbackModal visible={isFeedbackModalOpen} delVisible={closeFeedbackModal} />
      <Feedback openModal={openFeedbackModal} />
      <Unicard giveInfo={giveInfo} cardsUnivers={cardsUnivers} unicardModalOpen={openUnicardModal} />
      <div id="table"></div>
      {rows.length
        ? isResize >= 970
          ? <DesktopTable universities={checkedUniversities} rows={rows} />
          : <MobileTable universities={checkedUniversities} rows={rows} size={isResize} />
        : ''
      }
    </main>
  );
}

export default Main;
