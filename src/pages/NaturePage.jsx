import { useEffect } from 'react';

import ContentPage from './ContentPage';

const NaturePage = ({ setIsSoundOn, setCurrentTopic }) => {
    useEffect(() => {
        setCurrentTopic("nature");
    }, [setCurrentTopic]);

      
    return <ContentPage id="nature" setIsSoundOn={setIsSoundOn} />;
};

export default NaturePage;