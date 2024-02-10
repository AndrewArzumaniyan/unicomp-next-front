import React, { FC } from "react";
import styles from "./GuideArticle.module.scss";

interface GuideArticleProps {
  guideEl: {
    common_description: { title: string; info: string };
    img: string;
    [key: string]: any;
  };
}

const GuideArticle: FC<GuideArticleProps> = ({ guideEl }) => {
  return (
    <section className="article">
      <div className={styles["article-container"]}>
        <div className={styles["article-wrapper"]}>
          <div className={styles["article__common"]}>
            <h3 className={`${styles['article__common-title']} ${styles['article-title']}`}>
              {guideEl["common_description"]["title"]}
            </h3>
            <div className={styles["article__common-info"]}>
              <div 
                className={styles["article__common-info-bg"]}
                style={{ backgroundImage: `url(/images/universities/${guideEl["img"]})`}}
              ></div>
              <div className={styles["article__common-info-pars"]}>
                {guideEl["common_description"]["info"].split('\\n').map((par, index) => (
                  <p key={par}>
                    {par}
                  </p>
                ))}

              </div>
            </div>
          </div>

          {Object.keys(guideEl).filter((el) => el !== 'common_description' && el !== "_id" && el !== "name" && el !== "img").map((key) => (
            <div key={Math.random()} id={`${key}`} className={styles["article__part"]}>
              <h3 className={`${styles['article__part-title']} ${styles['article-title']}`}>
                {guideEl[key]["title"]}
              </h3>

              {Object.keys(guideEl[key]).filter((el) => el !== "title").map((key_key) => (
                <div key={`${Math.random()}`} className={styles["article__part-part"]}>
                  <h4 className={styles["article__part-subtitle"]}>
                    {guideEl[key][key_key]["title"].toUpperCase()}
                  </h4>

                  <p className={styles["article__part-part-info"]}>
                    {guideEl[key][key_key]["info"]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideArticle;
