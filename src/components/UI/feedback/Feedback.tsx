import { FC, useEffect, useState } from "react";
import styles from "./Feedback.module.scss";

interface FeedbackProps {
  openModal: any
}
 
const Feedback: FC<FeedbackProps> = ({ openModal }) => {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', (el) => {
      if (window.scrollY > (window.innerHeight / 1.5)) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    })
  }, [])

  return (
    <div className={`${scrollY || styles['disable']} ${styles["feedback-box"]}`} onClick={() => openModal()}>
      <span className={styles["feedback-descr"]}>предложения | жалобы</span>
      <span className={styles["feedback-icon"]}>?</span>
    </div>
   );
}
 
export default Feedback;