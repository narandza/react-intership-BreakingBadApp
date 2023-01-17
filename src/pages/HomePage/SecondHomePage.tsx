import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./SecondHomePage.module.scss";

interface IRandomQuote {
  id: number;
  quote: string;
  author: string;
}

const server = "http://localhost:8000";

const cast: string[] = [
  "Bryan Cranston",
  "Dean Norris",
  "Bob Odenkirk",
  "Giancarlo Espostio",
];

const genres: string[] = ["Crime TV Shows", " TV Thrillers", "TV Dramas"];

const description: string[] = ["Violent", "Gritty", "Dark"];

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

function SecondHomePage() {
  const [randomQuote, setRandomQuote] = useState<IRandomQuote>();

  useEffect(() => {
    axios({
      method: "get",
      url: server + "/quotes/" + getRandomNumber(1, 30),
      responseType: "json",
    })
      .then((response) => {
        setRandomQuote(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const listItems = (array: string[]) => {
    const result = array.map((item, index) => {
      if (index === array.length - 1) {
        return item;
      }
      return item + ", ";
    });
    return result.join("");
  };

  return (
    <div className={styles.secondHomePage}>
      <div className={styles.secondHomePageBackground} />
      <div className={styles.secondHomePageContent}>
        <h1 className={styles.conentHeading}>more details</h1>
        <div className={styles.contentMain}>
          <div className={styles.contentItem}>
            <h2 className={styles.itemTitle}>Cast</h2>
            <ul className={styles.itemList}>
              {cast.map((actor, key) => (
                <li key={key}> {actor}</li>
              ))}
            </ul>
          </div>
          <div className={styles.contentItem}>
            <h2 className={styles.itemTitle}>Genres</h2>
            <p className={styles.itemText}>{listItems(genres)}</p>
          </div>
          <div className={styles.contentItem}>
            <h2 className={styles.itemTitle}>This show is...</h2>
            <p className={styles.itemText}>{listItems(description)}</p>
          </div>
        </div>
        <div className={styles.randomQuote}>
          <h2 className={styles.randomQuoteHeading}>Random Quote</h2>
          {randomQuote ? (
            <p className={styles.randomQuoteContent}>
              {randomQuote.quote.length > 120
                ? randomQuote.quote.slice(0, 120) + "..."
                : randomQuote.quote}
              <span className={styles.quoteName}>-{randomQuote.author}</span>
            </p>
          ) : (
            <p className={styles.randomQuoteContent}>
              Opps! An error occured. No quotes available right now. Please try
              again in few moments.
              <span className={styles.quoteName}>:/</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecondHomePage;
