import MapLogo from "./MapLogo";

const MapNavigation = () => {

    return (
        <>
            <section className="absolute flex content-center justify-around z-10 w-full mt-5">
                <nav className="nav">
                    <ul className="nav-list flex gap-10">
                        <li className="list-item"><a href="#">wildlife</a></li>
                        <li className="list-item"><a href="#">must-go</a></li>
                        <li className="list-item"><a href="#">explore Austria</a></li>
                    </ul>
                </nav>

                <MapLogo />

                <nav className="nav">
                    <ul className="nav-list flex gap-10">
                        <li className="list-item"><a href="#">library</a></li>
                        <li className="list-item"><a href="#">must-go</a></li>
                        <li className="list-item"><a href="#">explore Austria</a></li>
                    </ul>
                </nav>

            </section>
        </>
    )
}

export default MapNavigation;