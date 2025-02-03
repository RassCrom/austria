import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useEffect, useState } from 'react';

import './styles/App.css';

import Root from "@pages/Root";
import HeroPage from "@pages/HeroPage";
import MapPage from '@pages/MapPage';
import WildlifePage from "@pages/WildlifePage";
import HistoryPage from "./pages/HistoryPage";
import NaturePage from "./pages/NaturePage";

// TODO Create shared layout
const ROUTER = (setIsSoundOn) => createBrowserRouter(createRoutesFromElements(
  <>
    <Route index element={<HeroPage />} />
    <Route path="/" element={<Root />}>
      <Route path='/wildlife' element={<WildlifePage setIsSoundOn={setIsSoundOn} />} />
      <Route path='/history' element={<HistoryPage setIsSoundOn={setIsSoundOn} />} />
      <Route path='/nature' element={<NaturePage setIsSoundOn={setIsSoundOn} />} />
      <Route path="/map" element={<MapPage setIsSoundOn={setIsSoundOn} />} />
    </Route>
  </>
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