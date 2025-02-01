import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./Hero.module.css";

const Hero = ({ images }) => {
    const navigate = useNavigate();

    const getGradientStyle = (color) => ({
        background: `linear-gradient(to bottom, ${color} 100%, #000 0%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    });

    const handleClick = (url) => {
        navigate(url);
    }

    return (
        <div className={styles.hero_outer}>
        <h1 className={styles.hero_heading}>Layers of Austria</h1>
        {images.map(([title, imageUrl, gradientColor], index) => (
            <div
                key={index}
                className={styles.hero}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                }}
            >
                <h2 
                    className={styles.hero_subheading} 
                    style={getGradientStyle(gradientColor)}
                    onClick={() => handleClick(`/${title}`)}
                >
                    {title}
                </h2>
            </div>
        ))}
        </div>
    );
};

Hero.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,
};

export default Hero;
