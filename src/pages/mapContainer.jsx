import Map from "../components/Map/Map";
import MapNavigation from "../components/Map/MapNavigation";
import MapBottom from "../components/Map/MapBottom";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";

import styles from '../styles/mapCotaniner.module.css'

function MapContainer() {
    const [isLoading, setIsLoading] = useState(true);
  
    // useEffect(() => {
    //   const loadComponents = async () => {
    //     // Simulate data fetching or async setup
    //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
    //     setIsLoading(false);
    //   };
  
    //   loadComponents();
    // }, []);
  
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <MapNavigation />
            <Map />
            <MapBottom />
          </>
        )}
      </>
    );
  }
  
  export default MapContainer;