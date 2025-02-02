import styles from "./Loader.module.css";
import Clouds from "./Clouds";

function Loader({ setIsSoundOn }) {
  const handleSoundToggle = (e) => {
    e.preventDefault();
    setIsSoundOn(true); // Turn sound on
  };

  return (
    <div className="flex flex-col relative items-center justify-center z-110 w-full h-full mt-0">
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
