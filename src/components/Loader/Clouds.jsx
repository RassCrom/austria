import styles from './Clouds.module.css';

function Clouds() {
    return (<div className={styles.clouds_container}>
        <img className={styles.cloud_one} src="images\cloud2.png" alt="" />
        <img className={styles.cloud_two} src="images\cloud1.png" alt="" />
    </div>)
}

export default Clouds;