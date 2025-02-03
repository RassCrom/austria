import { useEffect } from 'react';

import ContentPage from './ContentPage';

const WildlifePage = ({ setIsSoundOn, setCurrentTopic  }) => {
  useEffect(() => {
    setCurrentTopic("wildlife");
  }, [setCurrentTopic]);

  return <ContentPage id="wildlife" setIsSoundOn={setIsSoundOn} />;
};

export default WildlifePage;