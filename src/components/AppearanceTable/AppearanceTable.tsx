import styles from "./AppearanceTable.module.scss";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-icon.svg";
import { ReactComponent as CrossIcon } from "../../assets/icons/x-icon.svg";

interface IAppearanceTable {
  appearedInSeasons: number[];
}

function AppearanceTable(props: IAppearanceTable) {
  const seasons = [1, 2, 3, 4, 5];
  const appearedInSeasons = props.appearedInSeasons;

  return (
    <table className={styles.appearanceTable}>
      <tbody className={styles.tableBody}>
        <tr className={styles.trTop}>
          <td className={styles.tdTop}>Seasons</td>
          {seasons.map((season) => {
            return (
              <td className={styles.tdTop} key={season + "top "}>
                {season}
              </td>
            );
          })}
        </tr>
        <tr className={styles.trBottom}>
          <td className={styles.tdBottom}>Appeared</td>
          {seasons.map((season) => {
            return (
              <td className={styles.tdBottom} key={season + "bottom"}>
                {appearedInSeasons.some((s) => s === season) ? (
                  <CheckIcon />
                ) : (
                  <CrossIcon />
                )}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default AppearanceTable;
