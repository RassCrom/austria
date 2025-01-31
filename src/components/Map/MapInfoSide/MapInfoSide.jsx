import { useDispatch } from "react-redux";

import { useFetchData } from "@hooks/useFetchData";
import { clearActiveInfo } from "@store/features/activeInfo/activeInfoSlice";

import MapInfoSideCard from "./MapInfoSideCard";
import Loader from '../../Loader/Loader';

const MapInfoSide = ({ activeInfo }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchData("jsons/animals.json");

  if (isLoading) return <Loader />;
  if (error) return <p>An error has occurred: {error.message}</p>;
  if (!data || data.length === 0) return <p>No data available</p>;

  const animal = data.find((animal) => animal.id === activeInfo);

  if (!animal) return null;

  return (
    <MapInfoSideCard 
      animal={animal} 
      onClear={() => dispatch(clearActiveInfo())} 
    />
  );
};

export default MapInfoSide;
