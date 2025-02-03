import Logo from "../Header/Logo";

import styles from "../../styles/Navigation.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentTopic } from '@store/features/currentTopic/currentTopic';

const MapNavigation = ({ displayMenuHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeTopic = (topic) => {
    dispatch(setCurrentTopic(topic))
    navigate('/map')
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.nav} ${styles.leftNav} flex-1`}>
          <ul className="nav-list flex gap-10">
            <li className="list-item">
              <a style={{ cursor: "pointer" }}
                onClick={() => handleChangeTopic("animals")}
              >red-list animals</a>
            </li>
            <li className="list-item">
              <a style={{ cursor: "pointer" }}
                onClick={() => handleChangeTopic("history")}
              >sightseeing</a>
            </li>
            <li className="list-item">
              <a style={{ cursor: "pointer" }}
                onClick={() => handleChangeTopic("nature")}
              >nature</a>
            </li>
          </ul>
        </nav>

        <div className={styles.centerLogo}>
          <Logo />
        </div>

        <nav className={`${styles.nav} ${styles.rightNav} flex-1`}>
          <ul className="nav-list flex gap-10">
            <li className="list-item">
              <a style={{ cursor: "pointer" }} onClick={displayMenuHandler}>
                menu
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MapNavigation;
