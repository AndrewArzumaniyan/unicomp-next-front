import React, { FC } from "react";
import Hero from "@/components/UI/hero/Hero";

const GeographyHero: FC = () => {
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
      current: true
    },
    {
      paginationName: 'каталог',
      text: "КАТАЛОГ ",
      link: "/market",
      current: false
    },
  ]

  return (
    <Hero slides={slides} />
  );
}

export default GeographyHero;