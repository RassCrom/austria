import { useFetchData } from '@hooks/useFetchData';
import WildlifeHighlightCard from "./WildlifeHighlightCard";
import styles from "../Wildlife.module.css";

const WildlifeHighlight = () => {
  const { data, error, isLoading } = useFetchData(
    "jsons/animals.json"
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data || !Array.isArray(data)) return "No data available or data is not in expected format";

  return (
    <div className={styles.wildlife_highlight}>
      {data.length > 0
        ? data.map((el, idx) => <WildlifeHighlightCard key={idx} animal={el} />)
        : "Loading"}
    </div>
  );
};

export default WildlifeHighlight;
