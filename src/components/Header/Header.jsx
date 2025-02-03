import Logo from "./Logo";
import styles from "../../styles/Navigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTopic } from "../../store/features/currentTopic/currentTopic";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.leftNav}`}>
        <ul className="nav-list flex gap-10">
          <li className="list-item">
            <NavLink
              to="/wildlife"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => dispatch(setCurrentTopic("animals"))}
            >
              wildlife
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => dispatch(setCurrentTopic("history"))}
            >
              must-go
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink
              to="/nature"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => dispatch(setCurrentTopic("nature"))}
            >
              explore Austria
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.centerLogo}>
        <Logo />
      </div>

      <nav className={`${styles.nav} ${styles.rightNav}`}>
        <ul className="nav-list flex gap-10">
          <li className="list-item">
            <NavLink
              to="/map"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              map
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
