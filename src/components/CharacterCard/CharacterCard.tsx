import styles from "./CharacterCard.module.scss";
import favoritesBlank from "../../assets/icons/favourites-blank.svg";
import favoritesFill from "../../assets/icons/favourites-full.svg";
import { toast } from "react-toastify";
import { useState } from "react";
import { ICharacter } from "../../pages/CharactersPage/CharactersPage";

interface ICharacterCard {
  charater: ICharacter;
  isFavourite?: boolean;
  addToFavourites: (Character: ICharacter) => void;
  removeFromFavourites: (id: number) => void;
}

export const removeEverythingAfterExtension = (url: string): string => {
  if (url.indexOf(".jpg") === -1) {
    const newUrl = url.substring(0, url.indexOf(".png"));
    return newUrl + ".png";
  }
  const newUrl = url.substring(0, url.indexOf(".jpg"));
  return newUrl + ".jpg";
};

const limitFavourites = (): boolean => {
  const localData = JSON.parse(localStorage.getItem("favourites")!);
  if (localData.length >= 4) {
    return true;
  }
  return false;
};

function CharacterCard({
  charater,
  addToFavourites,
  removeFromFavourites,
  isFavourite,
}: ICharacterCard) {
  const [isFavourited, setIsFavourited] = useState(isFavourite);

  const handleFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFavourited) {
      if (limitFavourites()) {
        toast.error("Favourite limit reached! (max 4)", {
          toastId: Math.random(),
        });
      } else {
        addToFavourites(charater);
        setIsFavourited(true);
        toast.success("Added to Favourites", {
          toastId: charater.id,
        });
      }
    } else {
      removeFromFavourites(charater.id);
      setIsFavourited(false);
      toast.info("Removed from Favourites", {
        toastId: charater.id,
      });
    }
  };

  const imagePositionTopClass = [
    styles.cardImage,
    styles.imagePositionTop,
  ].join(" ");

  return (
    <div className={styles.characterCard} key={charater.id}>
      <div className={styles.cardTop}>
        <div className={styles.topHeader}>
          <h3 className={styles.heading}>{charater.nickname}</h3>
          <span className={styles.favourites} onClick={handleFavourites}>
            {isFavourited ? (
              <img
                className={styles.favouritesIconFill}
                src={favoritesFill}
                alt="remove from favorites"
              />
            ) : (
              <img
                className={styles.favouritesIconBlank}
                src={favoritesBlank}
                alt="add to favorites"
              />
            )}
          </span>
        </div>

        {charater.nickname === "Heisenberg" ? (
          <img
            className={imagePositionTopClass}
            src={removeEverythingAfterExtension(charater.img)}
            alt={charater.name}
          />
        ) : (
          <img
            className={styles.cardImage}
            src={removeEverythingAfterExtension(charater.img)}
            alt={charater.name}
          />
        )}
      </div>
      <div className={styles.cardBottom}>
        <h4 className={styles.fullName}>{charater.name}</h4>
        <p className={styles.jobTitle}>
          {charater.occupation.map((job, index) =>
            index === charater.occupation.length - 1 ? (
              <span className={styles.jobTitleItem} key={index}>
                {job}
              </span>
            ) : (
              <span className={styles.jobTitleItem} key={index}>
                {job},
              </span>
            )
          )}
        </p>
      </div>
    </div>
  );
}

export default CharacterCard;
