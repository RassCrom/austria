import { useFetchData } from "@hooks/useFetchData";

import MapInfoSideCard from "./MapInfoSideCard";

const MapInfoSide = () => {
  const { data, error, isLoading } = useFetchData(
    "public/jsons/animals.json"
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data available";

  return (
    <>
      {data.length > 0 &&
        data.map((animal, idx) => (
          <MapInfoSideCard key={idx} animal={animal} />
        ))}
    </>
  );
};

export default MapInfoSide;
