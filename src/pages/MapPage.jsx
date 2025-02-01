import Map from "@/Map/Map";
import MapNavigation from "@/Map/MapNavigation";
import MapBottom from "@/Map/MapBottom/MapBottom";
import Loader from "@/Loader/Loader";
import Menu from "@/Menu/Menu";

import { useEffect, useState } from "react";

import styles from '../styles/mapCotaniner.module.css'

function MapPage({ setIsSoundOn }) { 
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
        <Loader setIsSoundOn={setIsSoundOn} />
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
  
  export default MapPage;
