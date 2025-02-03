import { useFetchData } from '@hooks/useFetchData';

import Loader from "@/Loader/Loader";

import styles from './MapBottom.module.css';

function MapBottomSlider({ topic, handleSelectedObject }) {
    const { data, isLoading } = useFetchData(`/jsons/${topic}.json`);
    if (isLoading) return <Loader />;
    console.log(data);
    return (
        <div className={styles.bottom_line_container}>
            <div className={styles.horizontal_line}>
                {data.map((item) => (
                    <>
                        <img 
                            onClick={() => handleSelectedObject(item.coords)} 
                            src={`images/${item.pic_main}`} 
                            alt={item.title} 
                            className={styles.line_placeholder} 
                        />
                    </>
                ))} 
            </div>
        </div>
    )
}

export default MapBottomSlider;

