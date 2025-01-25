import { useLocation } from 'react-router-dom';

import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';


const Root = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/map' ? <Header /> : ''}
      <Outlet />
    </>
  );
};

export default Root;