import React, { useState, useEffect, FC } from "react";
import MarketMain from "./UniverMarketMain";
import Header from "@/components/UI/header/Header";
// import HeaderBurger from "@/components/UI/header/HeaderBurger"; // Предполагая, что компонент импортирован правильно
import Footer from "@/components/UI/footer/Footer";
import { UniverData } from "@/interfaces/univer.interface";
// import autoScroll from "./autoScroll.js";

const UniverMarket: FC<UniverData> = ({ universities }) => {
  
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
    const handleResize = (el: any) => { // Определяем тип для обработчика события
      setIsResize(el.target.innerWidth)
    };

    window.addEventListener('resize', handleResize);

    // Очищаем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []); // Добавляем зависимость для предотвращения бесконечного выполнения

  const changeIsBurgerOpen = () => {
    setIsBurgerOpen(!isBurgerOpen);
  }
  
  return (
    <div className="wrapper">
      {/* {isResize < 700
        ? <HeaderBurger isBurgerOpen={isBurgerOpen} changeIsBurgerOpen={changeIsBurgerOpen} />
        : ''
      } */}
      <Header isBurgerOpen={isBurgerOpen}/>
      <MarketMain universities={universities} isResize={isResize} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
      <Footer/>
    </div>
  );
}

export default UniverMarket
