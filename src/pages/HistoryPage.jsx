import { useEffect } from 'react';

import ContentPage from './ContentPage';

const HistoryPage = ({ setIsSoundOn, setCurrentTopic }) => {
  useEffect(() => {
    setCurrentTopic("history");
  }, [setCurrentTopic]);

  return <ContentPage id="history" setIsSoundOn={setIsSoundOn} />;
};

export default HistoryPage;