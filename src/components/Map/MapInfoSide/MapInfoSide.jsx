
import { useFetchAnimals } from '../../../store/features/animal/animalSlice';

import MapInfoSideCard from './MapInfoSideCard';

const MapInfoSide = () => {
  const { data, error, isLoading } = useFetchAnimals();
  console.log(data)

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return 'No data available';
  
  return (<>
    {data.length > 0 
      && data.map((animal, idx) => <MapInfoSideCard key={idx} animal={animal} />)}
  </>);
};

export default MapInfoSide;