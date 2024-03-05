import { FC, useContext } from "react";
import styles from "./Table.module.scss";
import { Univer } from "@/interfaces/univer.interface";
import Link from "next/link";
import { ThemeContext } from "@/contexts/theme.context";

interface DesktopTableProps {
  universities: Univer[];
  rows: string[][];
}

const DesktopTable: FC<DesktopTableProps> = ({ universities, rows }) => {
  const { theme } = useContext(ThemeContext);

  const stBg = theme === 'light' ? 'url(/images/hero-light.png' : 'url(/images/universities/bg.png';
  const bgPath = (univer: Univer) => {
    return univer.img ? `url(/images/universities/${univer.img.trim()}` : stBg;
  }

  return (
    <section id="table" className={styles.table}>
      <div className={"container" + " " + styles.table__container}>
        <table>
          <thead>
            <tr>
              <th>Категории</th>
              {universities.map((university) => (
                <th key={university._id}>
                  <div 
                    className={styles.table__bg} 
                    style={{height: `${100 * rows.length + 80}px`, background: `${bgPath(university)}`}}
                  ></div>
                  <span className={styles.table__headText}>
                    <Link href={`/univer/${university._id ? university._id : ''}`} >{university.visibleName ? university.visibleName : university.name}</Link>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((el, idx) => (
                  <td key={idx}>{el}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DesktopTable;
