import MapBottomSlider from "./MapBottomSlider";

const MapBottom = () => {
    return (
        <section className="absolute bottom-5 z-10 w-full h-auto flex items-center justify-between">
            <MapBottomSlider /> 
            <div className="w-auto h-auto absolute right-0 bottom-4 px-8 py-4">
                <a href="#">
                    <img 
                        className="md:w-6 md:h-6 object-contain" 
                        src="assets/sound.svg" 
                        alt="Sound Icon"
                    />
                </a>
            </div>
        </section>
    );
}

export default MapBottom;
