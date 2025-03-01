import MapBottomSlider from "./MapBottomSlider";

const MapBottom = ({ topic, handleSelectedObject }) => {
    return (
        <section className="absolute bottom-5 z-10 w-full h-auto flex items-center justify-between">
            <MapBottomSlider 
                topic={topic} 
                handleSelectedObject={handleSelectedObject} 
            /> 
            <div className="w-auto h-auto absolute right-0 bottom-4 px-8 py-4">
                <a href="#">
                    {/* REPLACE WITH SVG */}
                    <img 
                        className="md:w-6 md:h-6 object-contain" 
                        src="svgs/sound.svg" 
                        alt="Sound Icon"
                    />
                </a>
            </div>
        </section>
    );
}

export default MapBottom;
