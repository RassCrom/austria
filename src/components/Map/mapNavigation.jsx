import MapLogo from "./MapLogo";

import styles from './MapNavigation.module.css';

const MapNavigation = () => {

    return (
        <>
            <header className={styles.header}>
                <nav className={`${styles.nav} ${styles.leftNav}`}>
                    <ul className="nav-list flex gap-10">
                        <li className="list-item"><a href="#">red-list animals</a></li>
                        <li className="list-item"><a href="#">sightseeing</a></li>
                        <li className="list-item"><a href="#">animals</a></li>
                    </ul>
                </nav>

                <div className={styles.centerLogo}>
                    <MapLogo />
                </div>

                <nav className={`${styles.nav} ${styles.rightNav}`}>
                    <ul className="nav-list flex gap-10">
                        <li className="list-item"><a href="#">menu</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MapNavigation;