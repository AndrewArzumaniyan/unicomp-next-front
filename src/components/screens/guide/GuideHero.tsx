import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

interface Slide {
  paginationName: string;
  text: string;
  link: string;
  current: boolean;
}

const GuideHero: FC<any> = ({ isBurgerOpen, setIsBurgerOpen }) => {
  const slides: Slide[] = [
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
      current: true
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
      current: false
    },
  ];

  return (
    <Hero slides={slides} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
  );
};

export default GuideHero;
