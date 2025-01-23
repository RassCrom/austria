import styles from './Logo.module.css'

const Logo = () => {

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

export default Logo;