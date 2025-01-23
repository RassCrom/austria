import styles from '../Wildlife.module.css';

const WildlifeLast = () => {
  return (
    <div className={`container ${styles.wildlife_last}`}>
      <div className={`${styles.wildlife_text} mt-40`}>
            <h1 className={`${styles.heading_secondary}`}>
                Preserving Austria’s Natural Homes
            </h1>
            <div className={`${styles.text_p}`}>
                <p>
                    Biodiversity in Austria is deeply tied to its habitats:
                </p>
                <ul className={`${styles.styled_list}`}>
                    <li>The Alpine meadows that sustain mountain goats and marmots.</li>
                    <li>The Danube wetlands, a haven for amphibians and birds.</li>
                    <li>The forested valleys where lynx and deer roam.</li>
                </ul>
            </div>
            <div className={`flex`}>
                <a className={`flex justify-center items-center	gap-5 my-10`} href="">
                    <img src="src\assets\button-arr.svg" alt="" />
                    Learn more on the map
                </a>
            </div>
        </div>
        <div className={`${styles.wildlife_picture} h-full`}>
            <img src="src\assets\fox.png" alt="deer" />
        </div>
    </div>
  );
};

export default WildlifeLast;