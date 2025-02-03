import Logo from "../Header/Logo";

import styles from "../../styles/Navigation.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
              <Link className="text-black" style={{ cursor: "pointer" }}
                onClick={() => handleChangeTopic("animals")}
              >red-list animals</Link>
            </li>
            <li className="list-item">
              <Link className="text-black" style={{ cursor: "pointer" }}
                onClick={() => handleChangeTopic("history")}
              >sightseeing</Link>
            </li>
            <li className="list-item">
              <Link className="text-black" style={{ cursor: "pointer" }}
                onClick={() => handleChangeTopic("nature")}
              >nature</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.centerLogo}>
          <Logo />
        </div>

        <nav className={`${styles.nav} ${styles.rightNav} flex-1`}>
          <ul className="nav-list flex gap-10">
            <li className="list-item">
              <a className="text-black" style={{ cursor: "pointer" }} onClick={displayMenuHandler}>
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
