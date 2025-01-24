import styles from './WildlifeHighlightCard.module.css';

const WildlifeHighlightCard = ({ animal }) => {

  return (
    <div className={styles.card}>
      <div className={styles.card_pic}>
        <img src={animal['img'] || 'assets/lynx.png'} alt={animal['animal']} />
      </div>
      <div className={styles.card_content}>
        <h3 className={styles.card_content__title}>
          {animal['animal']}
        </h3>
        <div className={styles.card_content__text}>
          <p>Status: {animal['status']}</p>
          <p>Population: {animal['pop'] || 'n/a'}</p>
        </div>
      </div>
    </div>
  );
};

export default WildlifeHighlightCard;