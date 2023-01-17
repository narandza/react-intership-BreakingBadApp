import { useState } from "react";
import styles from "./Accordion.module.scss";
import arrow from "../../assets/icons/arrow-up.svg";

interface IAccordion {
  children: React.ReactNode;
  title: string;
}

function Accordion({ children, title }: IAccordion) {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`${styles.accordion} ${
        collapsed ? "" : `${styles.background}`
      }`}
    >
      <div className={styles.category} onClick={handleCollapse}>
        <h2 className={styles.categoryTitle}>{title}</h2>
        <img
          src={arrow}
          alt="collapse arrow"
          className={`${styles.collapseArrow} ${
            collapsed ? `${styles.collapsed}` : ""
          }`}
        />
      </div>
      <div
        className={`${styles.accordionConent} ${
          collapsed ? `${styles.collapsed}` : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;
