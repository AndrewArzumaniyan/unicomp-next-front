import React, { FC, useContext, useEffect, useState } from "react";
import { Univer as UniverInterface } from "@/interfaces/univer.interface";
import Link from "next/link";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapTheme } from "./mapStyles";
import Footer from "@/components/UI/footer/Footer";
import styles from "./Univer.module.scss";
import Feedback from "@/components/UI/feedback/Feedback";
import Header from "@/components/UI/header/Header";
import FeedbackModal from "@/components/UI/feedback/FeedbackModal";
import CustomMarker from "@/components/UI/custom-marker/CustomMarker";
import { ThemeContext } from "@/contexts/theme.context";


interface UniverProps {
  university: UniverInterface
}

interface category {
  name: string;
  value: string;
}

interface degree {
  name: string;
  value: string;
  price: string | null;
}

interface contact {
  tel: string;
  mail: string;
}

interface cardInfoInterface {
  contact: contact;
  address: string;
  site: string;
  bachelor: degree;
  magistracy: category;
  doctoral: category;
  categories: category[];
}

const Univer: FC<UniverProps> = ({ university }) => {
  let [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const [cardInfo, setCardInfo] = useState<cardInfoInterface | null>(null)

  const { theme } = useContext(ThemeContext);

  const stBg = theme === 'light' ? '/images/hero-light.png' : '/images/hero-bg.jpg';
  const bgPath = university.img ? `/images/universities/${university.img.trim()}` : stBg;

  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA-zai589VLK5bztyCdsgutMH0I3a1luUM',
  });

  const openFeedbackModal = () => {
    setFeedbackModalOpen(true)
    document.body.classList.add('hidden')
  }
  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false)
    document.body.classList.remove('hidden')
  }

  useEffect(() => {
    if (document.body.classList.contains('hidden')) {
      document.body.classList.remove('hidden')
    }

    let campus: string,
        entGrants: string, 
        lang: string, 
        type: string, 
        excahgeStudy: string;

    if (university['campus'])
      campus = university['campus'].toLowerCase()
    else 
      campus = 'нет информации'

    if (university['ENTgrants'])
      entGrants = university['ENTgrants'].toLowerCase()
    else 
      entGrants = 'нет информации'

    if (university['lang'])
      lang = university['lang'].toLowerCase()
    else 
      lang = 'нет информации'

    if (university['univerType'])
      type = university['univerType'].toLowerCase()
    else 
      type = 'нет информации'

    if (university['exchangeStudy'])
      excahgeStudy = university['exchangeStudy'].toLowerCase()
    else 
      excahgeStudy = 'нет информации'

    let cardInfoTmp: cardInfoInterface = {
      contact: {
        tel: university['tel'],
        mail: university['mail']
      },
      address: 'г. ' + university['city'] + ', ' + university['address'],
      bachelor: {
        name: 'бакалавриат',
        value: 'да',
        price: university['price'] ? university['price'] : 'нет информации'
      },
      magistracy: {
        name: 'магистратура',
        value: university['magistracy']
      },
      doctoral: {
        name: 'докторантура',
        value: university['doctoral']
      },
      site: university['site'],
      categories: [
        {
          name: 'общежитие',
          value: campus
        },
        {
          name: 'гранты по ЕНТ',
          value: entGrants
        },
        {
          name: 'языки обучения',
          value: lang
        },
        {
          name: 'тип университета',
          value: type
        },
        {
          name: 'учеба по обмену',
          value: excahgeStudy
        },
      ]
    };

    setCardInfo(cardInfoTmp)
  }, [university])

  return (
    <>
      {/* <header className={`${styles["header"]}`}>
        <div className={`${styles["container"]}`}>
          <nav className={`${styles["header__nav"]}`}>
            <ul className={`${styles["header__list"]}`}>
              <li className={`${styles["header__item"]}`}>
                <Link href="/">сравнение</Link>
              </li>

              <li className={`${styles["header__item"]}`}>
                <Link href="/guide">гид</Link>
              </li>

              <li className={`${styles["header__item"]}`}>
                <Link href="/geography">география</Link>
              </li>

              <li className={`${styles["header__item"]}`}>
                <Link href="/market">каталог</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}

      <Header isBurgerOpen={isBurgerOpen} />

      <main className={`${styles["main"]}`}>
        <div className={`${styles["container"]}`}>
          <h1 className={`${styles["title"]}`}>{university.name}</h1>

          <div
            className={`${styles.burger} ${isBurgerOpen ? styles['active'] : ''}`} 
            onClick={() => { setIsBurgerOpen(!isBurgerOpen) }} 
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`${styles["main__body"]}`}>
            <article className={`${styles["article"]}`}>
              <div className={`${styles["article__img"]}`}>
                <img src={bgPath} alt={`фото университета ${university.name}`} />
              </div>

              <div className={`${styles["article__info"]}`}>
                {university.info.split('<br>').map((pr, i) => (
                  <p key={`arcticle-pr-${i}`} className={`${styles["articel__info-paragraph"]}`}>{pr}</p>
                ))}
              </div>
            </article>


            <aside className={`${styles["aside"]}`}>
              {cardInfo && (
                <ul className={`${styles["aside__list"]}`}>
                  {cardInfo.site && (
                    <li className={`${styles["aside__item"]}`}>
                      <h4 className={`${styles["aside__title"]}`}>сайт</h4>
                      <Link  className={styles.link} href={cardInfo.site}>{cardInfo.site}</Link>
                    </li>
                  )}
                  

                  <li className={`${styles["aside__item"]}`}>
                    <h4 className={`${styles["aside__title"]}`}>контакты</h4>
                    <ul>
                      <li>
                        <span>{cardInfo.contact.mail}</span>
                        <span>{cardInfo.contact.tel}</span>
                      </li>
                    </ul>
                  </li>

                  <li className={`${styles["aside__item"]}`}>
                    <h4 className={`${styles["aside__title"]}`}>адреса</h4>
                    <ul>
                      <li>
                        {cardInfo.address}
                      </li>
                    </ul>
                  </li>

                  <li className={`${styles["aside__item"]}`}>
                    <h4 className={`${styles["aside__title"]}`}>{cardInfo.bachelor.name}</h4>
                    <p>
                      {cardInfo.bachelor.value}
                    </p>
                  </li>

                  <li className={`${styles["aside__item"]}`}>
                    <h4 className={`${styles["aside__title"]}`}>стоимость</h4>
                    <p>{cardInfo.bachelor.price}</p>
                  </li>

                  <li className={`${styles["aside__item"]}`}>
                    <h4 className={`${styles["aside__title"]}`}>{cardInfo.magistracy.name}</h4>
                    <p>{cardInfo.magistracy.value}</p>
                  </li>

                  <li className={`${styles["aside__item"]}`}>
                    <h4 className={`${styles["aside__title"]}`}>{cardInfo.doctoral.name}</h4>
                    <p>{cardInfo.doctoral.value}</p>
                  </li>

                  {cardInfo.categories.map((category, i) => (
                    <li key={`category-element-${i}`} className={`${styles["aside__item"]}`}>
                      <h4 className={`${styles["aside__title"]}`}>{category.name}</h4>
                      <p>{category.value}</p>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
          
          {isLoaded && (
            <section className={`${styles["map"]}`}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                zoom={11}
                center={{ lat: university.coordinates[0], lng: university.coordinates[1] }}
                options={{ styles: theme === 'dark' ? mapTheme : [] }}
              >
                {theme === 'dark' ? (
                  <CustomMarker 
                    coordinates={university.coordinates}
                    onclickFunction={() => {}}
                  />
                ) : (
                  <Marker 
                    position={{
                      lat: university.coordinates[0],
                      lng: university.coordinates[1]
                    }}
                    onClick={() => {}}
                  />
                )}
              </GoogleMap>
            </section>  
          )}
        </div>
      </main>

      <FeedbackModal visible={isFeedbackModalOpen} delVisible={closeFeedbackModal} />
      <Feedback openModal={openFeedbackModal} />
      <Footer></Footer>
    </>
  );
}

export default Univer