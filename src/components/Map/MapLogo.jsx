import styles from './MapLogo.module.css'

const MapLogo = () => {

    return (
        <>
            <div className="nav-text text-center">
                <h1 className="text-4xl font-bold">
                    <a href="" className={`${styles.logo_text} hover:text-red-600 transition-all duration-300`}>
                        Austria
                    </a>
                </h1>
            </div>
        </>
    )
}

export default MapLogo;