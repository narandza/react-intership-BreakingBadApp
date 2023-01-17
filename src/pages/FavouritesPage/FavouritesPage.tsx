import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "../../components/Accordion/Accordion";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { ICharacter } from "../CharactersPage/CharactersPage";
import styles from "./FavouritesPage.module.scss";

function FavouritesPage() {
  const [favourites, setFavourites] = useState<ICharacter[]>(
    localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites")!)
      : []
  );
  const addToFavourites = (Character: ICharacter) => {
    setFavourites([...favourites, Character]);
  };

  const removeFromFavourites = (id: number) => {
    setFavourites(favourites.filter((character) => character.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <section className={styles.favouritesPage}>
      <div className={styles.favouritesPageBackground} />
      <div className={styles.favouritesPageContent}>
        <h1 className={styles.contentHeading}>favourites</h1>
        {favourites.length ? (
          <div className={styles.contentMain}>
            <Accordion title="characters">
              <div className={styles.mainCards}>
                {favourites.map((favouriteCharacter: ICharacter) => {
                  return (
                    <Link
                      to={`/characters/${favouriteCharacter.id}`}
                      key={"link" + favouriteCharacter.id}
                    >
                      <CharacterCard
                        charater={favouriteCharacter}
                        addToFavourites={addToFavourites}
                        removeFromFavourites={removeFromFavourites}
                        isFavourite={true}
                        key={favouriteCharacter.id}
                      />
                    </Link>
                  );
                })}
              </div>
            </Accordion>
          </div>
        ) : (
          <p className={styles.emptyContent}>
            You have not added any characters as favourite.
          </p>
        )}
      </div>
    </section>
  );
}

export default FavouritesPage;
