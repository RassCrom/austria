import styles from '../Wildlife.module.css';

const WildlifeHero = () => {
  return (
    <div className={`container ${styles.wildlife}`}>
      <div className={`${styles.wildlife_text}`}>
        <h1 className={`${styles.heading}`}>
          Wildlife <br />
          <span className="">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            at <span className={`${styles.outline_text}`}>Austria</span>
          </span>
        </h1>
        <div className={`${styles.text_p}`}>
          <p>
            Austria&apos;s diverse landscapes, from the Alpine mountains to lush 
            forests and serene lakes, are home to a rich variety of wildlife. 
            Iconic species such as the ibex, red deer, and golden eagle thrive 
            in these natural habitats, 
            offering a glimpse into the country&apos;s well-preserved ecosystems.
          </p>
          <p className={`w-3/6 self-end`}>
            Austria&apos;s commitment to conservation is evident in its national parks, 
            which protect endangered species like the European lynx and brown bear.
          </p>
        </div>
      </div>
      <div className={`${styles.wildlife_picture}`}>
        <img src="src\assets\deer.png" alt="deer" />
      </div>
    </div>
  );
};

export default WildlifeHero;