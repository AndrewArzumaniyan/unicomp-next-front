import React, { useState, useEffect, FC } from "react";
import GuideMain from "./GuideMain";
import Header from "@/components/UI/header/Header";
// import HeaderBurger from "../components/UI/HeaderBurger";
// import autoScroll from "./autoScroll";
import Footer from "@/components/UI/footer/Footer";

const Geography: FC<any> = ({ cities }) => {
  // autoScroll(1300);
  setTimeout(() => {
    document.getElementById("main")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, 1300)

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isResize, setIsResize] = useState(0);

  // Использование useEffect для установки значения только на клиенте
  useEffect(() => {
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
    const handleResize = (el: Event) => {
      const event = el as UIEvent; // Приведение типов к UIEvent
      setIsResize((event.target as Window).innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Очистка обработчика события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const changeIsBurgerOpen = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <div className="wrapper">
      {/* {isResize < 700
        ? <HeaderBurger isBurgerOpen={isBurgerOpen} changeIsBurgerOpen={changeIsBurgerOpen}></HeaderBurger>
        : ''
      } */}
      <Header isBurgerOpen={isBurgerOpen}/>
      <GuideMain isResize={isResize} data={cities} />
      <Footer/>
    </div>
  );
}

export default Geography;
