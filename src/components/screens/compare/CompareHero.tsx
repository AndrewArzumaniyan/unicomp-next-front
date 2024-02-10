import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

interface Slide {
  paginationName: string;
  text: string;
  link: string;
  current: boolean;
}

const CompareHero: FC = () => {
  const slides: Slide[] = [
    {
      paginationName: 'сравнение',
      text: "СРАВНЕНИЕ ",
      link: "/",
      current: true
    },
    {
      paginationName: 'гид',
      text: "ПУТЕВОДИТЕЛЬ ",
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
    <Hero slides={slides} />
  );
}

export default CompareHero;
