import { useLocation } from 'react-router-dom';

import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import MapNavigation from '../components/Map/MapNavigation';


const Root = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/map' ? <Header /> : <MapNavigation />}
      <Outlet />
    </>
  );
};

export default Root;