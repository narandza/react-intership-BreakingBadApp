import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";

interface navLinks {
  text: string;
  href: string;
}

function Header() {
  const navLinksData: navLinks[] = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Characters",
      href: "/characters",
    },
    {
      text: "Favourites",
      href: "/favourites",
    },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    };
  });

  const scrollDown = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 50 ? setIsScrolled(true) : setIsScrolled(false);
  };

  const isScrolledDown = isScrolled ? styles.active : "";
  const headerClasses = [styles.header, isScrolledDown].join(" ");

  return (
    <header className={headerClasses}>
      <a
        className={styles.logo}
        href="https://www.netflix.com/rs/title/70143836"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logo} alt="logo" />
      </a>
      <nav className={styles.mainNavigation}>
        {navLinksData.map((link, index) => {
          return (
            <Link to={link.href} key={index} className={styles.navLink}>
              {link.text}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
