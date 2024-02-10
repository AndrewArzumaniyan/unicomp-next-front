import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

interface Slide {
  paginationName: string;
  text: string;
  link: string;
  current: boolean;
}

const GuideHero: FC = () => {
  const slides: Slide[] = [
    {
      paginationName: 'сравнение',
      text: "СРАВНЕНИЕ ",
      link: "/",
      current: false
    },
    {
      paginationName: 'гид',
      text: "ПУТЕВОДИТЕЛЬ ",
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
    <Hero slides={slides} />
  );
};

export default GuideHero;
