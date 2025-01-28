import styles from "./Loader.module.css";
import MapLogo from "../Header/Logo";
import Clouds from "./Clouds";

function Loader({ setIsSoundOn }) {
  const handleSoundToggle = (e) => {
    e.preventDefault();
    setIsSoundOn(true); // Turn sound on
  };

  return (
    <div className="flex flex-col items-center justify-center z-10 w-full mt-5">
      {/* <MapLogo /> */}
      <div className={styles.loader_container}>
        <p className={styles.loader_text}>
          This website uses audio to enhance your experience
        </p>
        <span className={styles.loader}></span>
        <a className={styles.loader_sound} href="#" onClick={handleSoundToggle}>
          Turn on sound
        </a>
      </div>
      <Clouds />
    </div>
  );
}

export default Loader;
