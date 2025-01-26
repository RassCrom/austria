import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useEffect } from 'react';

import './styles/App.css';

import MapContainer from './pages/MapContainer';
import WildlifeContainer from "./pages/WildlifeContainer";
import Root from "./pages/Root";
import MapInfoSide from "./components/Map/MapInfoSide";

// TODO Create shared layout
const ROUTER = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path='wildlife' element={<WildlifeContainer />} />
    <Route index path="" element={<MapContainer />} />
    <Route path="test" element={<MapInfoSide />} />
  </Route>
));

function App() {
  useEffect(() => {
    const newAudio = new Audio('street.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.5;

    const playAudio = () => {
      newAudio.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    };

    window.addEventListener('click', playAudio, { once: true });

    return () => {
      window.removeEventListener('click', playAudio);
    };
  }, []);

  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  );
}

export default App;
