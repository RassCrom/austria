const MapBottom = () => {
    return (
        <section className="absolute bottom-5 z-10 w-full h-auto flex items-center justify-between px-10">
            <span className="text-lg font-semibold">Sounds</span>
            <div className="w-auto h-auto mt-2">
                <a href="#">
                    <img 
                        className="md:w-6 md:h-6 object-contain" 
                        src="../src/assets/sound.svg" 
                        alt="Sound Icon"
                    />
                </a>
            </div>
        </section>
    );
}

export default MapBottom;
