import Map from "@/Map/Map";
import MapNavigation from "@/Map/MapNavigation";
import MapBottom from "@/Map/MapBottom/MapBottom";
import Menu from "@/Menu/Menu";
import Loader from "@/Loader/Loader";

import { useState } from "react";

function MapPage({ setIsSoundOn }) { 
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState('hidden');

  const displayMenuHandler = () => {
    display === 'hidden' ? setDisplay('flex') : setDisplay('hidden')
  }
  
  return (
    <>
      {isLoading && <Loader setIsSoundOn={setIsSoundOn} />}
      <Menu display={display} displayMenuHandler={displayMenuHandler} />
      <MapNavigation displayMenuHandler={displayMenuHandler} />
      <Map setIsLoading={setIsLoading} />
      <MapBottom />
    </>
  );
}
  
  export default MapPage;