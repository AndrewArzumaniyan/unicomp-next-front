import React, { useState, useMemo, FC } from "react";
import SearchBox from "@/components/UI/searchbox/SearchBox";
import useLoadBd from "@/hooks/useLoad";
import styles from "./UniverMarket.module.scss";
import { Univer } from "@/interfaces/univer.interface";

interface MarketProps {
  setPickedUniver: (univer: any) => void; // Укажите правильный тип для univer
  openModal: () => void;
  isResize: number;
  universities: Univer[]
}

const Market: FC<MarketProps> = ({setPickedUniver, openModal, isResize, universities}) => {
  let [cities, setCities] = useState<string[]>([]);
  let [searchQuery, setSearchQuery] = useState<string>('');
  let [selectQuery, setSelectQuery] = useState<{ city: string, campus: string, ENTgrants: string }>({ 'city': 'все', 'campus': 'все', 'ENTgrants': 'все' });
  let [page, setPage] = useState<number>(1);

  function changeSelectQuery(e: React.ChangeEvent<HTMLSelectElement>) {
    let tmp = { ...selectQuery };
    const name = e.target.name as keyof typeof tmp; // Приводим к типу ключа объекта tmp
    console.log(e.target.value);
    tmp[name] = e.target.value;
    setSelectQuery(tmp);
  }

  useMemo(() => {
    if (!universities.length) return
    let tmp = ['все']
    universities.forEach((univer: any) => {
      if (!tmp.includes(univer.city))
        tmp.push(univer.city)
    })
    setCities(tmp)
  }, [universities])

  const universitiesSearch = useMemo(() => {
    if (!universities) return
    setPage(1)
    return universities.filter((univer: any) => univer.name.toLowerCase().includes(searchQuery) || (univer.visibleName && univer.visibleName.toLowerCase().includes(searchQuery))).sort((a: any, b: any) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    })
  }, [searchQuery, universities])

  const universitiesFilter = useMemo(() => {
    if (!universities) return
    setPage(1)
    let result;

    if (universitiesSearch)
      result = [...universitiesSearch];

    if (result) {
      for (let key in selectQuery) {
        const selectKey = key as keyof typeof selectQuery; // Приводим key к типу ключа объекта selectQuery
        if (selectQuery[selectKey] !== 'все') {
          result = result.filter((univer) => univer[selectKey as keyof typeof univer] && univer[selectKey as keyof typeof univer].toString().toLowerCase() === selectQuery[selectKey].toLowerCase())
        }
      }

      return result.sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
    }
  }, [selectQuery, universitiesSearch])

  function changePage(event: React.MouseEvent<HTMLElement>) {
    const textContent = event.currentTarget.textContent;
    if (textContent) {
      setPage(+textContent.trim());
      document.getElementById('main')?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }


  return (
    <section id="main" className={styles.market}>
      <div className={styles.market__container}>
      <div className={styles["market__title-box"]}>
        <h2 className={`${styles.market__title} title`}>каталог университетов</h2>
        {isResize >= 730
        ? <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        : ''
        } 
      </div>
      <div className={styles.market__wrapper}>
        <aside className={styles.market__aside}>
          <div className={styles["market__subtitle-box"]}>
            <h3 className={styles.market__subtitle}>Фильтры</h3>
            {isResize < 730
            ? <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            : ''
            } 
          </div>
          <div className={styles.market__list}>
              <div className={styles["market__filters-box"]}>
              <div className={`${styles['market__filters-city']} ${styles['market__filters-filter']}`}>
                <h4 className={styles["market__filters-title"]}>город:</h4>
                <select onChange={changeSelectQuery} name="city" id="">
                  {cities.map((city) => (
                    <option
                      className={selectQuery.city === city ? 'active' : ''}
                      key={`market-${city}`}
                      value={city}
                    >
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className={`${styles['market__filters-campus']} ${styles['market__filters-filter']}`}>
                <h4 className={styles["market__filters-title"]}>общежитие:</h4>
                <select onChange={changeSelectQuery} name="campus" id="">
                  {['все', 'да', 'нет'].map((ans) => (
                    <option
                      className={selectQuery.campus === ans ? 'active' : ''}
                      key={`market-${ans}`}
                      value={ans}
                    >
                      {ans}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`${styles['market__filters-entgrants']} ${styles['market__filters-filter']}`}>
                <h4 className={styles["market__filters-title"]}>грант по ЕНТ:</h4>
                <select onChange={changeSelectQuery} name="ENTgrants" id="">
                  {['все', 'да', 'нет'].map((ans) => (
                    <option
                      className={selectQuery.ENTgrants === ans ? 'active' : ''}
                      key={`market-${ans}`}
                      value={ans}
                    >
                      {ans}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </aside>
        
        <div className={styles["market__cards-box"]}>
          {universitiesFilter && universitiesFilter.length ? universitiesFilter.slice(0 + (page - 1) * 24, 24 + (page - 1) * 24).map((univer) => (
            <div key={`market-${univer._id}`} onClick={() => {setPickedUniver(univer); openModal()}} className={`${styles.market__card} ${styles.card}`}>
              <div
                className={styles.card__bg}
                style={{background: `url(/images/universities/${univer.img ? univer.img.trim() : "bg.png"})`}}
              ></div>
              <div className={styles.card__info}>
                <h3 className={styles.card__title}>
                  {univer.visibleName || univer.visibleName ? univer.visibleName : univer.name}
                </h3>
                <h4 className={styles.card__subtitle}>
                  {univer.city}
                </h4>
                <span className={styles.card__clicked}></span>
              </div>
            </div>
          )) : "Ничего не найдено:("
          }
          <div className={styles["market__pagination-box"]}>
            {universitiesFilter
            ? Array.from({
              length: universitiesFilter.length % 24 === 0 
                ? universitiesFilter.length / 24 
                : Math.floor(universitiesFilter.length / 24) + 1
              }, (_, i) => i + 1).map((pag) => (
              <div 
                onClick={changePage} 
                key={`market-pag-${pag}`} 
                className={`${styles['market__pagination-bullet']} ${pag === page ? 'active' : ''}`}
                style={ pag === page ? { backgroundColor: 'rgba(46, 108, 169, 0.43)' } : {}}
              >
                {pag}
              </div>
            ))
            : ''
            }
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Market