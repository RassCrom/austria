import styles from './WildlifeHighlightCard.module.css';

const WildlifeHighlightCard = ({ animal }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_pic}>
        <img src={`/images/${animal.pic_main}`} alt={animal.title} />
      </div>
      <div className={styles.card_content}>
        <h3 className={styles.card_content__title}>
          {animal.title}
        </h3>
        <div className={styles.card_content__text}>
          <p>Status: {animal.status}</p>
          <p>Population: {animal.pop_i || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default WildlifeHighlightCard;
