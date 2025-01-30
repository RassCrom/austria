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
        data.map((el, idx) => (
          <MapInfoSideCard key={idx} animal={el} />
        ))}
    </>
  );
};

export default MapInfoSide;
