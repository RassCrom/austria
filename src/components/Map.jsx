    import { useRef, useEffect } from "react";

    import mapboxgl from "mapbox-gl";

    import 'mapbox-gl/dist/mapbox-gl.css';

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const bounds = [
        [9.533, 46.372],  // Southwest (lower-left corner)
        [17.162, 49.02],  // Northeast (upper-right corner)
    ];
    
    function Map() {
        const mapRef = useRef();
        const mapContainerRef = useRef();

        useEffect(() => {
            mapboxgl.accessToken = mapboxToken;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [14.2191, 47.6363],
                zoom: 5,
                style: 'mapbox://styles/rasscrom/cm2de01iu011e01qv574f1pac',
            });

            mapRef.current.addControl(new mapboxgl.NavigationControl())
            mapRef.current.setMaxBounds(bounds);

            return () => mapRef.current.remove()

        }, [])

        return (
            <div id="map-container" ref={mapContainerRef}></div>
        )
    };

    export default Map;