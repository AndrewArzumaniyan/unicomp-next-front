import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Scrollbar, Mousewheel } from "swiper/modules";
import styles from "./CategorySwiper.module.scss";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Category {
  id: string;
  name: string;
}

interface CategorySwiperProps {
  allCategories: boolean;
  checkedCategories: Category[];
  setCheckedCategories: (categories: Category[]) => void;
  categories: Category[];
}

const CategorySwiper: React.FC<CategorySwiperProps> = ({
  allCategories,
  checkedCategories,
  setCheckedCategories,
  categories,
}) => {
  const [checked, setChecked] = useState<boolean[]>([]);

  function createPairs<T>(array: any[]): [any, any][] {
    const pairs: [any, any][] = [];
    for (let i = 0; i < array.length; i += 2) {
      pairs.push([array[i], array[i + 1]]);
    }
    return pairs;
  }

  const changeChecked = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const index = Number(target.dataset.index);
    let res = [...checked];
    res[index] = !res[index];

    console.log(target)
    console.log(res)

    setChecked(res);
    let tmpCheckeds = [...checkedCategories];

    if (res[index]) {
      let tmp = categories.find((category) => category.id === target.id);
      if (tmp) tmpCheckeds.push(tmp);
    } else {
      tmpCheckeds = tmpCheckeds.filter((el) => el.id !== target.id);
    }
    setCheckedCategories(tmpCheckeds);
  };

  useEffect(() => {
    let tmp: boolean[] = [];

    if (allCategories) {
      for (let i = 0; i < categories.length; i++) {
        tmp.push(true);
      }
      setCheckedCategories(categories);
    } else {
      for (let i = 0; i < categories.length; i++) {
        tmp.push(false);
      }
      setCheckedCategories([]);
    }

    setChecked(tmp);
  }, [allCategories, categories, setCheckedCategories]);

  return (
    <div className='category__swiper'>
      <Swiper
        modules={[Grid, Scrollbar, Mousewheel]}
        grabCursor={true}
        mousewheel={true}
        scrollbar={true}
        // grid={{
        //   rows: 2,
        // }}
        breakpoints={{
          1140: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          820 : {
            slidesPerView: 4,
            spaceBetween: 30
          },
          700: {
            slidesPerView: 3.2,
            spaceBetween: 15,
          },
          400: {
            slidesPerView: 2.2,
            spaceBetween: 15
          },
          0: {
            slidesPerView: 1.5,
            spaceBetween: 15
          }
        }}
      >
        {createPairs(categories).map((pair , pair_index) => (
          <SwiperSlide
            key={`swiper-${pair_index}`}
            id={`${pair_index}`}
          >
            {pair.map(({id, name}, index) => (
              <div 
                className={`swiper-slide-el ${checked[pair_index * 2 + index] ? "checked" : ""}`} 
                key={`swiper_el-$${index}`}
                onClick={changeChecked}
                data-index={pair_index * 2 + index}
                id={id}
              >
                {name}
              </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySwiper;
