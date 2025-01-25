import React from "react";
import Logo from "./Logo";
import styles from "../../styles/Navigation.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.leftNav}`}>
        <ul className="nav-list flex gap-10">
          <li className="list-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
              end
            >
              wildlife
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink
              to="/must-go"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              must-go
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink
              to="/explore-austria"
              className={({ isActive }) => (isActive ? styles.active : "")}
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
              to="/library"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              library
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink
              to="/red-list"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              red list
            </NavLink>
          </li>
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
