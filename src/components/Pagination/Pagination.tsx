import styles from "./Pagination.module.scss";
import backwardPagination from "../../assets/icons/backward-pagination.png";
import fowardPagination from "../../assets/icons/foward-pagination.png";

interface IPagination {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: IPagination) {
  const disabledPaginationClass = [styles.disable, styles.paginationItem].join(
    " "
  );
  const currentPaginationClass = [styles.current, styles.paginationItem].join(
    " "
  );

  const pageNumeration = Array.from(
    { length: numberOfPages },
    (value, index) => index + 1
  );

  return (
    <nav className={styles.pagination}>
      {currentPage === 1 ? (
        <button className={disabledPaginationClass}>
          <img
            className={styles.paginationIcon}
            src={backwardPagination}
            alt="backward"
          />
        </button>
      ) : (
        <button
          className={styles.paginationItem}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          <img
            className={styles.paginationIcon}
            src={backwardPagination}
            alt="backward"
          />
        </button>
      )}

      {pageNumeration.map((pageNumber) => {
        if (pageNumber === currentPage) {
          return (
            <button
              className={currentPaginationClass}
              key={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        }
        return (
          <button
            className={styles.paginationItem}
            key={pageNumber}
            onClick={() => {
              setCurrentPage(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        );
      })}
      {currentPage === numberOfPages ? (
        <button className={disabledPaginationClass}>
          <img
            className={styles.paginationIcon}
            src={fowardPagination}
            alt="foward"
          />
        </button>
      ) : (
        <button
          className={styles.paginationItem}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          <img
            className={styles.paginationIcon}
            src={fowardPagination}
            alt="foward"
          />
        </button>
      )}
    </nav>
  );
}

export default Pagination;
