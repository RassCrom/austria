import { Swiper, SwiperSlide } from 'swiper/react';
import { gsap } from 'gsap';
import 'swiper/css';

import styles from './MapInfoSide.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setShownInfo, setShownGeojson } from '@store/features/activeInfo/activeInfoSlice';

const MapInfoSideCard = ({ animal }) => {
  const dispatch = useDispatch();
  const shownInfo = useSelector((state) => state.mapInfo.shownInfo);
  const shownGeojson = useSelector((state) => state.mapInfo.shownGeojson);
  const topic = useSelector((state) => state.currentTopic.topic);
  
  const activeInfo = useSelector((state) => state.mapInfo.activeInfo);

  const handleClearSideInfo = (e) => {
    e.preventDefault();
    dispatch(setShownInfo(false));
    gsap.fromTo(
      `.${styles.map_info_outer}`,
      { opacity: 1, x: 0 },
      { opacity: 0, x: 400, duration: .8, ease: "power2.out" }
    );
  };

  const handleShownGeojson = () => {
    dispatch(setShownGeojson());
  };

  const getFact = () => {
    if (topic === 'animals') {
      return {
        fact_1: `Status: ${animal.status}`,
        fact_2: `Lifespan: ${animal.lifespan}`,
        fact_3: `Population: ${animal.pop_i || 'Unknown'}`,
      };
    }
    if (topic === 'nature') {
      return {
        fact_1: `Type: ${animal.type}`,
        fact_2: `Title: ${animal.title}`,
        fact_3: `Activities: ${animal.activities}`,
      };
    }
    return {
      fact_1: `Title: ${animal.title}`,
      fact_2: `Year: ${animal.est}`,
      fact_3: `Architecture style: ${animal.arch_styles}`,
    };
  };

  const { fact_1, fact_2, fact_3 } = getFact();

  useEffect(() => {
    if (shownInfo) {
      gsap.fromTo(
        `.${styles.map_info_outer}`,
        { opacity: 0, x: 400 },
        { opacity: 1, x: 0, duration: .8, ease: "power2.out" }
      );
    }
  }, [shownInfo]);

  return (
    <div className={styles.map_info_outer} style={{ backgroundImage: `url(others/torn_paper.png)` }}>
      <div className={styles.map_info}>
        <button href="" className={styles.map_back} onClick={handleClearSideInfo}>
          <svg className={styles.arrow_svg} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5C1 4.22 1.22 4 1.5 4H10.5C10.78 4 11 4.22 11 4.5C11 4.78 10.78 5 10.5 5H1.5C1.22 5 1 4.78 1 4.5Z" fill="white" />
            <path d="M-0.000234127 4.5C-0.00103355 4.43442 0.0118991 4.36941 0.0377326 4.30913C0.0635661 4.24885 0.101728 4.19465 0.149765 4.15L3.64977 0.65C3.84977 0.45 4.15977 0.45 4.35977 0.65C4.55977 0.85 4.55977 1.16 4.35977 1.36L1.20977 4.51L4.35977 7.66C4.55977 7.86 4.55977 8.17 4.35977 8.37C4.15977 8.57 3.84977 8.57 3.64977 8.37L0.149765 4.87C0.0497655 4.77 -0.000234127 4.64 -0.000234127 4.52V4.5Z" fill="white" />
          </svg>
          Back to map
        </button>
        <div className={styles.map_info__inner}>
          <div className={styles.map_info__heading_outer}>
            <h2 className={styles.map_info__heading}>
              {animal.title}
            </h2>
            {topic === 'animals' && <img onClick={handleShownGeojson} src="images/map.svg" alt="Show habitat on the map" />}
          </div>
          <div className={styles.map_info__stats}>
            <p className={styles.map_info__status}>{fact_1}</p>
            <p className={styles.map_info__life}>{fact_2}</p>
            <p className={styles.map_info__population}>{fact_3}</p>
          </div>
          <div className={styles.map_info__image}>
            <img src={`images/${animal.pic_main}`} alt={`${animal.title} Image`} />
          </div>
          <div className={styles.map_info__text}>
            {animal.text_main.map((text, index) => (
              <div key={index}>
                <h3>{animal.text_headings[index]}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className={styles.map_info__slider}>
            <Swiper
              spaceBetween={14}
              slidesPerView={2}
              loop={true}
              pagination={{ clickable: true }}
            >
              {['pic_1', 'pic_2', 'pic_3'].map((pic, index) => (
                <SwiperSlide key={index}>
                  <img className={styles.map_slider__imgs} src={`images/${animal[pic]}`} alt={`${animal.title} Image ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInfoSideCard;
