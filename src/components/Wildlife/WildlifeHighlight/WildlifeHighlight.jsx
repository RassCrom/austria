import { useFetchData } from '@hooks/useFetchData';
import WildlifeHighlightCard from "./WildlifeHighlightCard";
import styles from "../Wildlife.module.css";
import Loader from '@/Loader/Loader';
import ErrorPage from '@pages/ErrorPage';

const WildlifeHighlight = ({ json }) => {
  const { data, error, isLoading } = useFetchData(
    `jsons/${json}`
  );

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage />;

  if (!data || !Array.isArray(data)) return "No data available or data is not in expected format";

  return (
    <div className={styles.wildlife_highlight}>
      {data.length > 0
        ? data.map((el, idx) => <WildlifeHighlightCard key={idx} animal={el} />)
        : <Loader />}
    </div>
  );
};

export default WildlifeHighlight;
