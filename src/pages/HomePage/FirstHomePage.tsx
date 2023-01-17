import styles from "./FirstHomePage.module.scss";

function FirstHomePage() {
  type relevantLinks = {
    text: string;
    href: string;
  };

  const cardContent: {
    title: string;
    description: string;
    relevantLinks: relevantLinks[];
  } = {
    title: "breaking bad",
    description:
      "Walt White's transformation from a well-meaning family man to ruthless drug kingpin is almost complete. Newly empowered and increasingly remorseless, Walt finds himself attempting to control a tenuous empire. But uneasy lies the head that wears the crown.",
    relevantLinks: [
      {
        text: "Watch Trailer",
        href: "https://www.youtube.com/watch?v=HhesaQXLuRY",
      },
      {
        text: "Watch on Netflix",
        href: "https://www.netflix.com/rs/title/70143836",
      },
      {
        text: "IMDb",
        href: "https://www.imdb.com/title/tt0903747/",
      },
    ],
  };

  return (
    <div className={styles.firstHomePage}>
      <div className={styles.firstHomePageBackground}>
        <div className={styles.backgroundImage} />
      </div>
      <div className={styles.firstHomePageContent}>
        <div className={styles.contentItem}>
          <h1 className={styles.itemHeading}>{cardContent.title}</h1>
          <p className={styles.itemContent}>{cardContent.description}</p>
          <div className={styles.itemLinks}>
            {cardContent.relevantLinks.map((link, index) => {
              return (
                <a
                  className={styles.linkButton}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  {link.text}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstHomePage;
