import { useFetchData } from "@hooks/useFetchData";

import MapInfoSideCard from "./MapInfoSideCard";
import Loader from '@/Loader/Loader';
import ErrorPage from '@pages/ErrorPage';

const MapInfoSide = ({ activeInfo }) => {
  const { data, error, isLoading } = useFetchData("jsons/animals.json");

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage />;
  if (!data || data.length === 0) return <p>No data available</p>;

  const animal = data.find((animal) => animal.id === activeInfo);

  if (!animal) return null;

  return (
    <MapInfoSideCard 
      animal={animal} 
    />
  );
};

export default MapInfoSide;
