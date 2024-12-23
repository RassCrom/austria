import styles from './MapBottom.module.css';

function MapBottomSlider() {
    return (
        <div className={styles.bottom_line_container}>
            <div className={styles.horizontal_line}>
                <img src="src\assets\slider-building-1.png  " alt="Placeholder" className={styles.line_placeholder} />
            </div>
        </div>

    )
}

export default MapBottomSlider;

