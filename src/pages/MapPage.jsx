import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Map from "@/Map/Map";
import MapNavigation from "@/Map/MapNavigation";
import MapBottom from "@/Map/MapBottom/MapBottom";
import Menu from "@/Menu/Menu";
import Loader from "@/Loader/Loader";

function MapPage({ setIsSoundOn }) { 
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState('hidden');
  const [selectedObject, setSelectedObject] = useState(null);

  const currentTopic = useSelector((state) => state.currentTopic.topic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayMenuHandler = () => {
    setDisplay((prev) => (prev === 'hidden' ? 'flex' : 'hidden'));
  };

  const handleSelectedObject = (object) => {
    setSelectedObject(object);
  }

  useEffect(() => {
    console.log(currentTopic)
    if (!currentTopic) {
      navigate("/");
      // const topic = prompt("Выберите тему: wildlife, history, nature");
      // if (topic) {
      //   dispatch(setCurrentTopic(topic));
      // } else {
      //   navigate("/");
      // }
    }
  }, [currentTopic, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader setIsSoundOn={setIsSoundOn} />}
      <Menu display={display} displayMenuHandler={displayMenuHandler} />
      <MapNavigation displayMenuHandler={displayMenuHandler} />
      {currentTopic && <Map 
        topic={currentTopic} 
        setIsLoading={setIsLoading} 
        selectedObject={selectedObject} 
      />}
      <MapBottom topic={currentTopic} handleSelectedObject={handleSelectedObject} />
    </>
  );
}

export default MapPage;
