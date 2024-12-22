import styles from "./Loader.module.css";
import MapLogo from "../Map/MapLogo";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center z-10 w-full mt-5">
        <MapLogo />
        <div className={styles.loader_container}>
            <p className={styles.loader_text}>This website uses audio to enhance your experience</p>
            <span className={styles.loader}></span>
            <a className={styles.loader_sound} href="#">Turn off sound</a>
        </div>
    </div>
  );
}

export default Loader;
