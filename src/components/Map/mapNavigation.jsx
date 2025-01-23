import Logo from "../Header/Logo";

import styles from "../../styles/Navigation.module.css";

const MapNavigation = ({ displayMenuHandler }) => {
  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.nav} ${styles.leftNav} flex-1`}>
          <ul className="nav-list flex gap-10">
            <li className="list-item">
              <a href="#">red-list animals</a>
            </li>
            <li className="list-item">
              <a href="#">sightseeing</a>
            </li>
            <li className="list-item">
              <a href="#">animals</a>
            </li>
          </ul>
        </nav>

        <div className={styles.centerLogo}>
          <Logo />
        </div>

        <nav className={`${styles.nav} ${styles.rightNav} flex-1`}>
          <ul className="nav-list flex gap-10">
            <li className="list-item">
              <a href="#" onClick={displayMenuHandler}>
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
