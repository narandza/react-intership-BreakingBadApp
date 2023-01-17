import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ViewCharacterPage.module.scss";
import { removeEverythingAfterExtension } from "../../components/CharacterCard/CharacterCard";
import backIcon from "../../assets/icons/back-icon.png";
import AppearanceTable from "../../components/AppearanceTable/AppearanceTable";

const server = "http://localhost:8000";

interface ICharacter {
  id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  appearance: number[];
  nickname: string;
  portrayed: string;
  quote: string;
}

function ViewCharacterPage() {
  const [character, setCharacter] = useState({} as ICharacter);
  const [loading, setLoading] = useState(false);
  const [appearances, setAppeaances] = useState<number[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server}/characters/${id}`)
      .then((response) => {
        setLoading(true);
        setCharacter(response.data);
        setLoading(false);
        setAppeaances(response.data.appearance);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleBackClick = (): void => {
    navigate("/characters");
  };

  return (
    <section className={styles.viewCharacter}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.viewCharacterBackground} />
          <div className={styles.viewCharacterContent}>
            <div className={styles.contentTop}>
              <img
                src={backIcon}
                alt="back-icon"
                className={styles.backIcon}
                onClick={handleBackClick}
              />
              <p className={styles.returnText}>Return to Characters Page</p>
            </div>
            <div className={styles.contentMain}>
              <div className={styles.mainLeft}>
                <p className={styles.characterStatus}>
                  Status:{" "}
                  {character.status === "Alive" ? (
                    <span className={styles.statusAlive}>
                      {character.status}
                    </span>
                  ) : (
                    <span className={styles.statusDeceased}>
                      {character.status}
                    </span>
                  )}
                </p>
                <img
                  src={
                    character?.img &&
                    removeEverythingAfterExtension(character.img)
                  }
                  alt={character.name}
                  className={styles.characterImage}
                />
                <p className={styles.characterQuote}>"{character.quote}"</p>
              </div>
              <div className={styles.mainRight}>
                <h2 className={styles.characterName}>{character.name}</h2>
                <p className={styles.characterInfo}>
                  <b className={styles.infoBold}>{character.name}</b> (born{" "}
                  {character.birthday}) also known by their alias{" "}
                  <b className={styles.infoBold}>{character.nickname}</b>,{" "}
                  {character.status === "Alive" ? <>is</> : <>was</>} a citizen
                  of Albuquerque. Their{" "}
                  {character?.occupation?.length > 1 ? (
                    <>
                      occupations{" "}
                      {character.status === "Alive" ? "are:" : "were:"}{" "}
                    </>
                  ) : (
                    <>
                      occupation {character.status === "Alive" ? "is" : "was"}{" "}
                    </>
                  )}
                  {character?.occupation?.map((occ, index) => {
                    if (index === character?.occupation?.length - 1) {
                      return <span key={index}>{occ}.</span>;
                    }
                    return <span key={index}>{occ}, </span>;
                  })}
                </p>
                <h3 className={styles.characterAppearances}>Appearances</h3>
                <AppearanceTable appearedInSeasons={appearances} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ViewCharacterPage;
