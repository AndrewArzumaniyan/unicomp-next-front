import React, { FC } from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";
import "swiper/css/pagination";
import Link from "next/link";

interface Slide {
  paginationName: string;
  text: string;
  link: string;
  current: boolean;
}

interface HeroProps {
  slides: Slide[];
}

const Hero: FC<HeroProps> = ({ slides }) => {
  function smoothScrollLink(anchor: HTMLAnchorElement) {
    const blockId = anchor.getAttribute('href');
    
    if (blockId) {
      const element = document.querySelector(blockId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    setTimeout(smoothScrollLink, 10, target);
  }

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__slide}>
          <div className={styles.hero__bg}>
            <Image priority={true} src='/images/hero-bg.jpg' alt="" fill className={styles["hero__bg-img"]} />
          </div>
          <div className={styles.hero__box}>
            <h1 className={styles.hero__title}>
              {slides.find((slide) => slide.current === true)?.text}
              <span>УНИВЕРСИТЕТОВ</span>
            </h1>
            <a onClick={handleClick} href="#main" className={`${styles.hero__btn} btn`}>перейти</a>
          </div>
        </div>
        <div className={styles.hero__pagination}>
          {slides.map((slide, i) => (
            <Link 
              key={`hero-${i}`}
              href={slide.link} 
              className={`${styles['hero__pagination-bullet']} ${slide.current ? styles.active : ''}`}
            >
              <span>0{i+1}</span> {slide.paginationName}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
