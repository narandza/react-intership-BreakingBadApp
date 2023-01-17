import styles from "./Search.module.scss";
import React, { useEffect, useState } from "react";

interface ISearch {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Search({ setSearch, setCurrentPage }: ISearch) {
  const [input, setInput] = useState("");
  const [timeout, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }

    const newTimeout = setTimeout(() => {
      setSearch(input);
      setCurrentPage(1);
    }, 300);

    setTimeoutId(newTimeout);
  }, [input]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className={styles.searchBar}
        onChange={handleSearch}
      />
    </>
  );
}

export default Search;
