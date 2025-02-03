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

  const currentTopic = useSelector((state) => state.currentTopic.topic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayMenuHandler = () => {
    setDisplay((prev) => (prev === 'hidden' ? 'flex' : 'hidden'));
  };

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
      {currentTopic && <Map topic={currentTopic} setIsLoading={setIsLoading} />}
      <MapBottom />
    </>
  );
}

export default MapPage;
