import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./CharactersPage.module.scss";
import Search from "../../components/Search/Search";
import { Link } from "react-router-dom";

const server = "http://localhost:8000";

export interface ICharacter {
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

function CharactersPage() {
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const pageLimit = 6;
  const [favourites, setFavourites] = useState<ICharacter[]>(
    localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites")!)
      : []
  );
  const [randomCharacter, setRandomCharater] = useState(0);

  const addToFavourites = (Character: ICharacter) => {
    setFavourites([...favourites, Character]);
  };

  const removeFromFavourites = (id: number) => {
    setFavourites(favourites.filter((character) => character.id !== id));
  };

  useEffect(() => {
    const allCharactersQuery = `${server}/characters${
      search && `?name_like=${search}`
    }`;

    axios
      .get(allCharactersQuery)
      .then((response) => {
        setNumberOfPages(Math.ceil(response.data.length / pageLimit));
        setRandomCharater(
          response.data[Math.floor(Math.random() * response.data.length)].id
        );
      })
      .catch((error) => console.log(error));
  }, [search]);

  useEffect(() => {
    const paginateCharactersQuery = `${server}/characters?_page=${currentPage}&_limit=${pageLimit}${
      search && `&name_like=${search}`
    }`;

    axios
      .get(paginateCharactersQuery)
      .then((response) => {
        setLoading(true);
        setCurrentCharacters(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [currentPage, search, favourites]);

  return (
    <section className={styles.charactersPage}>
      <div className={styles.charactersPageBackground} />
      <div className={styles.charactersPageContent}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <h1 className={styles.topHeading}>Characters</h1>
            <Link to={`${randomCharacter}`} className={styles.randomButtonLink}>
              <button
                className={styles.randomButton}
                disabled={!randomCharacter && true}
              >
                Random
              </button>
            </Link>
          </div>
          <div className={styles.contentTopRight}>
            <Search setSearch={setSearch} setCurrentPage={setCurrentPage} />
          </div>
        </div>
        {loading ? (
          <div className={styles.contentMain}> Loading... </div>
        ) : (
          <div className={styles.contentMain}>
            {currentCharacters.length ? (
              currentCharacters.map((character: ICharacter) => {
                return (
                  <Link
                    to={`/characters/${character.id}`}
                    key={"link" + character.id}
                  >
                    <CharacterCard
                      charater={character}
                      addToFavourites={addToFavourites}
                      removeFromFavourites={removeFromFavourites}
                      isFavourite={favourites.some((item: ICharacter) => {
                        return item.id === character.id;
                      })}
                      key={character.id}
                    />
                  </Link>
                );
              })
            ) : (
              <p className={styles.nothingToShow}>No characters to show</p>
            )}
          </div>
        )}
        <div className={styles.contentBottom}>
          {numberOfPages ? (
            <Pagination
              numberOfPages={numberOfPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default CharactersPage;
