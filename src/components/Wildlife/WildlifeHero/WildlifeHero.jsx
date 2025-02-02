import styles from '../Wildlife.module.css';

import { gsap } from 'gsap';
import { useEffect } from 'react';

const WildlifeHero = ({ heading, text, image, text1}) => {
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
          {heading} <br />
          <span className="">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            at <span className={`${styles.outline_text}`}>Austria</span>
          </span>
        </h1>
        <div className={`${styles.text_p}`}>
          <p>{text}</p>
          <p className={`w-3/6 self-end`}>
            {text1}
          </p>
        </div>
      </div>
      <div className={`${styles.wildlife_picture}`}>
        <img src={`images/${image}`} alt={image} />
      </div>
    </div>
  );
};

export default WildlifeHero;