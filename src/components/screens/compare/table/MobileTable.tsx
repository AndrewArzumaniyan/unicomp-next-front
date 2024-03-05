import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import styles from "./Table.module.scss";
import { Univer } from "@/interfaces/univer.interface";

interface MobileTableProps {
  universities: Univer[];
  rows: any[];
  size: number;
}

const MobileTable: FC<MobileTableProps> = ({ universities, rows, size }) => {
  return (
    <section id="table" className={styles["mobile-table"]}>
      <div className={`container ${styles["mobile-table__container"]}`}>
        <Swiper
          modules={[Navigation, Grid]}
          loop={true}
          navigation={{
            nextEl: '.mobile-table__btn-next',
            prevEl: '.mobile-table__btn-prev',
          }}
          allowTouchMove={false}
        >
          {universities.map((university) => (
            <SwiperSlide key={university._id}>
              <div className={styles["mobile-table__slide-bg"]} style={{ backgroundImage: `url(/images/universities/${university.img ? university.img : "bg.png"})` }}></div>
              <h3 className={styles["mobile-table__slide-title"]}>
                <Link href={`/univer/${university._id ? university._id : ''}`} target="_blank" >{university.visibleName ? university.visibleName : university.name}</Link>
              </h3>
            </SwiperSlide>
          ))}
          <div className="mobile-table__btn-prev swiper-button-prev"></div>
          <div className="mobile-table__btn-next swiper-button-next"></div>
        </Swiper>

        {rows.map((row, index) => (
          <div key={`row-${index}`} className={styles["mobile-table__info"]}>
            <h4 className={styles["mobile-table__info-title"]}>
              {row[0]}
            </h4>
            <Swiper
              modules={[Navigation, Grid]}
              loop={true}
              navigation={{
                nextEl: '.mobile-table__btn-next',
                prevEl: '.mobile-table__btn-prev',
              }}
              allowTouchMove={false}
            >
              {row.map((el : any, ind : any) => {
                if (ind === 0)
                  return ''
                return (
                  <SwiperSlide key={`row-slide${ind}`}>
                    {el}
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MobileTable;
