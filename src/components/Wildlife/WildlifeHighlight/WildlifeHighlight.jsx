import {useEffect, useState} from 'react';
import WildlifeHighlightCard from './WildlifeHighlightCard';
import { fetchAnimalData } from '../../../api/FetchAnimalData';
import styles from '../Wildlife.module.css';

const WildlifeHighlight = () => {
  const [animal, setAnimal] = useState([]);

  const getAnimalData = async () => {
    const res = await fetchAnimalData();
    setAnimal(res)
  }

  useEffect(() => {
    getAnimalData();
  }, [])


  return (
    <div className={styles.wildlife_highlight}>
      {animal.length > 0 
        ? animal.slice(1).map(
          (el, idx) => <WildlifeHighlightCard key={idx} animal={el} />
        )
        : 'Loading'}
    </div>
  );
};

export default WildlifeHighlight;