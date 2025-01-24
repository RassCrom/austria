import styles from '../Wildlife.module.css';

import { gsap } from 'gsap';
import { useEffect } from 'react';

const WildlifeHero = () => {
  useEffect(() => {
    gsap.fromTo(
      `.${styles.heading}`, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    );

    gsap.fromTo(
      `.${styles.outline_text}`, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.4 }
    );
    
    gsap.fromTo(
      `.${styles.wildlife} .${styles.text_p} p`, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.6 } 
    ); 

    gsap.fromTo(
      `.${styles.wildlife} .${styles.wildlife_picture}`, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.8, force3D: true } 
    ); 

  }, []); 

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
        <img src="assets\deer.png" alt="deer" />
      </div>
    </div>
  );
};

export default WildlifeHero;