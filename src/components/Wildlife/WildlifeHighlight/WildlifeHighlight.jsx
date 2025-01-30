import { useFetchData } from '@hooks/useFetchData';
import WildlifeHighlightCard from "./WildlifeHighlightCard";
import styles from "../Wildlife.module.css";

const WildlifeHighlight = () => {
  const { data, error, isLoading } = useFetchData(
    "public/jsons/animals.json"
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data available";

  return (
    <div className={styles.wildlife_highlight}>
      {data.length > 0
        ? data.map((animal, idx) => <WildlifeHighlightCard key={idx} animal={animal} />)
        : "Loading"}
    </div>
  );
};

export default WildlifeHighlight;
