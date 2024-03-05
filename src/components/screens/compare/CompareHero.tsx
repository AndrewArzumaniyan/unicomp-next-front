import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

interface Slide {
  paginationName: string;
  text: string;
  link: string;
  current: boolean;
}

const CompareHero: FC<any> = ({isBurgerOpen, setIsBurgerOpen}) => {
  const slides: Slide[] = [
    {
      paginationName: 'сравнение',
      text: "СРАВНЕНИЕ ",
      link: "/",
      current: true
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
      current: false
    },
  ];

  return (
    <Hero slides={slides} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
  );
}

export default CompareHero;
