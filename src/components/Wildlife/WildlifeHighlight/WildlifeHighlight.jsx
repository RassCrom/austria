import { useFetchAnimals } from '../../../store/features/animal/animalSlice';
import WildlifeHighlightCard from './WildlifeHighlightCard';
import styles from '../Wildlife.module.css';

const WildlifeHighlight = () => {
  const { data, error, isLoading } = useFetchAnimals();
  const animal = data
  console.log(data)

  return (
    <div className={styles.wildlife_highlight}>
      {animal.length > 0 
        ? animal.slice(0).map(
          (el, idx) => <WildlifeHighlightCard key={idx} animal={el} />
        )
        : 'Loading'}
    </div>
  );
};

export default WildlifeHighlight;