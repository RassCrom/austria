import Map from "../components/Map/Map";
import MapNavigation from "../components/Map/MapNavigation";
import MapBottom from "../components/Map/MapBottom/MapBottom";
import Loader from "../components/Loader/Loader";
import Menu from "../components/Menu/Menu";
import { useEffect, useState } from "react";

import styles from '../styles/mapCotaniner.module.css'

function MapContainer() { 
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] = useState('hidden');

    const displayMenuHandler = () => {
      display === 'hidden' ? setDisplay('flex') : setDisplay('hidden')
    }
  
    useEffect(() => {
      const loadComponents = async () => {
        // Simulate data fetching or async setup
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
        setIsLoading(false);
      };
  
      loadComponents();
    }, []);
  
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Menu display={display} displayMenuHandler={displayMenuHandler} />
            <MapNavigation displayMenuHandler={displayMenuHandler} />
            <Map />
            <MapBottom />
          </>
        )}
      </>
    );
  }
  
  export default MapContainer;