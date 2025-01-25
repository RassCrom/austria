import styles from './Clouds.module.css';

function Clouds() {
    return (<div className={styles.clouds_container}>
        <img className={styles.cloud_one} src="assets\cloud2.png" alt="" />
        <img className={styles.cloud_two} src="assets\cloud1.png" alt="" />
    </div>)
}

export default Clouds;