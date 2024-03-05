import { useEffect, useState, FC } from 'react';
import Main from './CompareMain';
// import HeaderBurger from '@/components/UI/HeaderBurger';
import Footer from '@/components/UI/footer/Footer';
import Header from "@/components/UI/header/Header";
import { Category } from '@/interfaces/category.interface';
import { Univer } from '@/interfaces/univer.interface';
// import autoScroll from './autoScroll';

interface compareProps {
  categories: Category[];
  universities: Univer[];
}

const Compare: FC<compareProps> = ({ categories, universities }) => {

  let [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isResize, setIsResize] = useState(0);
  
  // Использование useEffect для установки значения только на клиенте
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("main")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 1300)
    setIsResize(window.innerWidth);

    const handleResize = (el: Event) => {
      setIsResize((el.target as Window).innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Удаление обработчика при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsResize(window.innerWidth);
    
    // Привязка события resize
    window.addEventListener('resize', handleResize);
    
    // Очистка обработчика события при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeIsBurgerOpen = () => {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className="wrapper">
      {/* {isResize < 700
        ? <HeaderBurger isBurgerOpen={isBurgerOpen} changeIsBurgerOpen={changeIsBurgerOpen} />
        : null
      }*/}
      <Header isBurgerOpen={isBurgerOpen} />

      <Main isResize={isResize} categories={categories} universities={universities} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />

      <Footer />
    </div>
  );
}

export default Compare;
