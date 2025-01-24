import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import './styles/App.css'

import MapContainer from './pages/MapContainer';
import WildlifeContainer from "./pages/WildlifeContainer";
import Root from "./pages/Root";
// TODO Create shared layout
const ROUTER = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root /> }>
    <Route index element={ <WildlifeContainer /> } />
    <Route path="map" element={<MapContainer />} />
  </Route>
))

function App() {

  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  )
}

export default App