import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useEffect, useState } from 'react';

import './styles/App.css';

import MapContainer from './pages/MapContainer';
import WildlifeContainer from "./pages/WildlifeContainer";
import Root from "./pages/Root";
import MapInfoSide from "./components/Map/MapInfoSide/MapInfoSide";

// TODO Create shared layout
const ROUTER = (setIsSoundOn) => createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index path='' element={<WildlifeContainer setIsSoundOn={setIsSoundOn} />} />
    <Route path="/map" element={<MapContainer setIsSoundOn={setIsSoundOn} />} />
    <Route path="/test" element={<MapInfoSide />} />
  </Route>
));

function App() {
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    const newAudio = new Audio('audios/street.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.5;

    const playAudio = () => {
      newAudio.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    };
    if (isSoundOn) playAudio();
  }, [isSoundOn]);

  return (
    <>
      <RouterProvider router={ROUTER(setIsSoundOn)} />
    </>
  );
}

export default App;
