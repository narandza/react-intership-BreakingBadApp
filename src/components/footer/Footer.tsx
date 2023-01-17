import styles from "./Footer.module.scss";

function Footer() {
  const footerLinks: {
    href: string;
    text: string;
  }[] = [
    {
      href: "#",
      text: "Terms of Service",
    },
    {
      href: "#",
      text: "Privacy Policy",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.footerBottom}>
        <div className={styles.footerLeft}>
          <p>
            &#169; <span>Dimitrije Jovanovic</span>. All rights reserved.
          </p>
        </div>
        <div className={styles.footerRight}>
          {footerLinks.map((link, index) => {
            return (
              <a href={link.href} key={index} className={styles.links}>
                {link.text}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
