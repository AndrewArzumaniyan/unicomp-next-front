import React, { FC, useState, useEffect } from "react";
import GeographyMain from "./GeographyMain";
import Header from "@/components/UI/header/Header";
import { UniverData } from "@/interfaces/univer.interface";
// import HeaderBurger from "@/components/UI/header/HeaderBurger";
// import autoScroll from "./autoScroll.js";

const Geography: FC<UniverData> = ({ universities }) => {
  // autoScroll(1200);
  setTimeout(() => {
    document.getElementById("main")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, 1300)

  let [isBurgerOpen, setIsBurgerOpen] = useState(false);
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
    window.addEventListener("resize", (el: any) => {
      setIsResize(el.target.innerWidth);
    });
  });

  const changeIsBurgerOpen = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <div className="wrapper">
      {/* {isResize < 700 ? (
        <HeaderBurger isBurgerOpen={isBurgerOpen} changeIsBurgerOpen={changeIsBurgerOpen}></HeaderBurger>
      ) : (
        ""
      )} */}
      <Header isBurgerOpen={isBurgerOpen}/>
      <GeographyMain universities={universities} />
    </div>
  );
};

export default Geography;
