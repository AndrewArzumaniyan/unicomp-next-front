import React, { FC, useState } from "react";
import CategorySwiper from "@/components/UI/category-swiper/CategorySwiper";
import axios from "axios";
import styles from "./Category.module.scss";
import { Category } from "@/interfaces/category.interface";

interface CategoryProps {
  checkedCategories: any[];
  setCheckedCategories: (categories: any[]) => void;
  categories: Category[];
}

const Category: FC<CategoryProps> = ({ checkedCategories, setCheckedCategories, categories }) => {
  let [allCategories, isAllCategories] = useState(false);

  const changeAllCategories = () => {
    isAllCategories(!allCategories);
  }

  return (
    <section id="main" className={styles.category}>
      <div className="container">
      <h2 className={`${styles['category__title']} title`}>
          Выбрать категории
          <span>Необходимо выбрать минимум одну категорию!</span>
        </h2>
        <span onClick={changeAllCategories} className={styles['category__all-btn']}>выбрать все</span>
        <CategorySwiper categories={categories} allCategories={allCategories} checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} />
      </div>
    </section>
  );
}

export default Category;
