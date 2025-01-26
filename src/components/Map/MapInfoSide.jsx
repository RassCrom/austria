import styles from './MapInfoSide.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MapInfoSide = () => {
  return (
    <div className={styles.map_info_outer}>
      <div className={styles.map_info}>
        <button href="" className={styles.map_back}>
        <svg className={styles.arrow_svg} 
          width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4.5C1 4.22 1.22 4 1.5 4H10.5C10.78 4 11 4.22 11 4.5C11 4.78 10.78 5 10.5 5H1.5C1.22 5 1 4.78 1 4.5Z" fill="white"/>
          <path d="M-0.000234127 4.5C-0.00103355 4.43442 0.0118991 4.36941 0.0377326 4.30913C0.0635661 4.24885 0.101728 4.19465 0.149765 4.15L3.64977 0.65C3.84977 0.45 4.15977 0.45 4.35977 0.65C4.55977 0.85 4.55977 1.16 4.35977 1.36L1.20977 4.51L4.35977 7.66C4.55977 7.86 4.55977 8.17 4.35977 8.37C4.15977 8.57 3.84977 8.57 3.64977 8.37L0.149765 4.87C0.0497655 4.77 -0.000234127 4.64 -0.000234127 4.52V4.5Z" fill="white"/>
        </svg>
          Back to map
        </button>
        <div className={styles.map_info__inner}>
          <h2 className={styles.map_info__heading}>
            Fire Salamander
          </h2>
          <div className={styles.map_info__stats}>
            <p className={styles.map_info__status}>Status: Vulnerable</p>
            <p className={styles.map_info__life}>Lifespan: 7-15 year</p>
            <p className={styles.map_info__population}>Population: unknown</p>
          </div>
          <div className={styles.map_info__image}>
            <img src="fire_salamander.png" alt="fire salamander" />
          </div>
          <div className={styles.map_info__text}>
            <p>
              A number of large, stable subpopulations of this salamander exist in Central Europe. Some local subpopulation declines have been observed over parts of its range (e.g. through habitat loss, introduced predatory fish, and increased aridity in Spain). A severe decline has been reported in the Netherlands. Some local subpopulations have disappeared, and its population density has also been reduced in parts of Spain. In Italy, localized declines due to habitat loss have been observed in Apen (F. Ficetola and R. Manenti pers. comm. September 2019). Due to the ongoing decline in the extent and quality of its habitat and the threat of Bsal, the population is continuing to decrease.
            </p>
          </div>
          <div className={styles.map_info__slider}>
            {/* Swiper Slider */}
            <Swiper
              spaceBetween={14}
              slidesPerView={2}
              loop={true}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <img className={styles.map_slider__imgs} src="fire_salamander_1.png" alt="Fire Salamander Image 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img className={styles.map_slider__imgs} src="fire_salamander_2.png" alt="Fire Salamander Image 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img className={styles.map_slider__imgs} src="fire_salamander.png" alt="Fire Salamander Image 3" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.map_info__habitat}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInfoSide;