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
  isBurgerOpen: boolean;
  setIsBurgerOpen: any;
}

const Main: FC<MainProps> = ({ isResize, categories, universities, isBurgerOpen, setIsBurgerOpen }) => {
  let [isUnicardModalOpen, setUnicardModalOpen] = useState(false);
  let [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  let [checkedUniversities, setCheckedUniversities] = useState<any[]>([]);
  let [tableUniversities, setTableUniversities] = useState<Univer[]>([]);
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
    setTimeout(() => {
      document.getElementById("category")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 300)
  }

  const giveInfo = () => {
    if (checkedCategories.length < 1 ) {
      const element = document.getElementById('category');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      return;
    } else if (checkedUniversities.length < 1) {
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

    tmp = [...checkedUniversities]

    setTableUniversities(tmp);
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
      <Hero isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      {/* <Univers /> */}
      <UnicardModal 
        isResize={isResize} 
        addUniCards={addUniCards} 
        checkeds={checkedUniversities} 
        setCheckeds={setCheckedUniversities} 
        isOpen={isUnicardModalOpen} 
        unicardModalClose={closeUnicardModal} 
        universities={universities}
      />
      <Unicard cardsUnivers={cardsUnivers} unicardModalOpen={openUnicardModal} />
      <Category checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} categories={categories} giveInfo={giveInfo} />
      <FeedbackModal visible={isFeedbackModalOpen} delVisible={closeFeedbackModal} />
      <Feedback openModal={openFeedbackModal} />
      <div id="table"></div>
      {rows.length
        ? isResize >= 970
          ? <DesktopTable universities={tableUniversities} rows={rows} />
          : <MobileTable universities={tableUniversities} rows={rows} size={isResize} />
        : ''
      }
    </main>
  );
}

export default Main;
