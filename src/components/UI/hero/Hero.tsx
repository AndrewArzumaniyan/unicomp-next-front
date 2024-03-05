import React, { FC, useContext } from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";
import "swiper/css/pagination";
import Link from "next/link";
import { ThemeContext } from "@/contexts/theme.context";

interface Slide {
  paginationName: string;
  text: string;
  link: string;
  current: boolean;
}

interface HeroProps {
  slides: Slide[];
  isBurgerOpen: boolean;
  setIsBurgerOpen: any;
}

const Hero: FC<HeroProps> = ({ slides, isBurgerOpen, setIsBurgerOpen }) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  
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
        <div
          className={`${styles.burger} ${isBurgerOpen ? styles['active'] : ''}`} 
          onClick={() => { setIsBurgerOpen(!isBurgerOpen) }} 
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div onClick={toggleTheme} className={`${styles['theme-toggler']} ${styles[`${theme}-theme`]}`}>
          <div className={`${theme === 'dark' ? styles['visible'] : ''}`}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">

              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

              <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="5" stroke="#ffffff" strokeWidth="1.5"/> <path d="M12 2V4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path d="M12 20V22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path d="M4 12L2 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path d="M22 12L20 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/> </g>
            </svg>
          </div>

          <div className={`${theme === 'light' ? styles['visible'] : ''}`}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

              <g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0E1225"/> </g>

            </svg>
          </div>
        </div>
        <div className={`${styles.hero__logo} ${isBurgerOpen ? styles['active'] : ''}`}>
          <Link href="/" >UNICOMP</Link>
        </div>
        <div className={styles.hero__slide}>
          <div className={styles.hero__bg}>
            <Image priority={true} src={`${theme === 'light' ? '/images/hero-light.png' : '/images/hero-bg.jpg'}`} alt="" fill className={styles["hero__bg-img"]} />
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
