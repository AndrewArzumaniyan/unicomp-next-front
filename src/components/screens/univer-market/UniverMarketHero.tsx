import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

const MarketHero: FC<any> = ({ isBurgerOpen, setIsBurgerOpen }) => {
  const slides = [
    {
      paginationName: 'сравнение',
      text: "СРАВНЕНИЕ ",
      link: "/",
      current: false
    },
    {
      paginationName: 'гайд',
      text: "ГАЙД ",
      link: "/guide",
      current: false
    },
    {
      paginationName: 'география',
      text: "ГЕОГРАФИЯ ",
      link: "/geography",
      current: false
    },
    {
      paginationName: 'каталог',
      text: "КАТАЛОГ ",
      link: "/market",
      current: true
    },
  ]

  return (
    <Hero slides={slides} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
  );
}

export default MarketHero;