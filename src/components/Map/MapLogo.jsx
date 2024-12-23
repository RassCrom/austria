import styles from './MapLogo.module.css'

const MapLogo = () => {

    return (
        <div className="nav-text text-center z-10">
            <h1 className="text-4xl font-bold">
                <a href="" className={`${styles.logo_text}`}>
                    Austria
                </a>
            </h1>
        </div>
    )
}

export default MapLogo;