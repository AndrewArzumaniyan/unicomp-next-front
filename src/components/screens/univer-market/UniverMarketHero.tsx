import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

const MarketHero: FC = () => {
  const slides = [
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
    <Hero slides={slides} />
  );
}

export default MarketHero;