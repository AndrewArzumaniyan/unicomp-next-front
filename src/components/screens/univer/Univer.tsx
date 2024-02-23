import React, { FC, useEffect, useState } from "react";
import { Univer as UniverInterface } from "@/interfaces/univer.interface";
import Link from "next/link";
import Footer from "@/components/UI/footer/Footer";
import styles from "./Univer.module.scss";
import Feedback from "@/components/UI/feedback/Feedback";
import FeedbackModal from "@/components/UI/feedback/FeedbackModal";
import Image from "next/image";


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
  const [cardInfo, setCardInfo] = useState<cardInfoInterface | null>(null)

  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

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

    let cardInfoTmp: cardInfoInterface = {
      contact: {
        tel: university['tel'],
        mail: university['mail']
      },
      address: university['city'] + 'г. ' + university['address'],
      bachelor: {
        name: 'бакалавриат',
        value: 'да',
        price: university['price']
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
          value: university['campus'].toLowerCase()
        },
        {
          name: 'гранты по ЕНТ',
          value: university['ENTgrants'].toLowerCase()
        },
        {
          name: 'языки обучения',
          value: university['lang'].toLowerCase()
        },
        {
          name: 'тип университета',
          value: university['univerType'].toLowerCase()
        },
        {
          name: 'учеба по обмену',
          value: university['exchangeStudy'].toLowerCase()
        },
      ]
    };

    setCardInfo(cardInfoTmp)
  }, [university])

  return (
    <>
      <header className={`${styles["header"]}`}>
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
      </header>


      <main className={`${styles["main"]}`}>
        <div className={`${styles["container"]}`}>
          <h1 className={`${styles["title"]}`}>{university.name}</h1>

          <div className={`${styles["main__body"]}`}>
            <article className={`${styles["article"]}`}>
              <div className={`${styles["article__img"]}`}>
                <Image src="/images/universities/bg.png" alt={`фото университета ${university.name}`} />
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
        </div>
      </main>

      <FeedbackModal visible={isFeedbackModalOpen} delVisible={closeFeedbackModal} />
      <Feedback openModal={openFeedbackModal} />
      <Footer></Footer>
    </>
  );
}

export default Univer