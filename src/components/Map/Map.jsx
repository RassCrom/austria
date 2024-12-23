import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

// LngLatBounds(LngLat(8.127563432927161, 46.24054178874297), LngLat(18.540180776975063, 49.38560687732107))
const bounds = [
    [8.12756, 46.240541],  // Southwest (lower-left corner)
    [18.54018, 49.385606],  // Northeast (upper-right corner)
];

const startingPoint = {
    center: [13.355, 47.822], //13.355365498295384, Latitude: 47.822553142337966
    zoom: 6.7
}

function Maps() {
    const mapRef = useRef(); 
    const mapContainerRef = useRef();

    useEffect(() => {
        mapboxgl.accessToken = mapboxToken;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/rasscrom/cm2de01iu011e01qv574f1pac',
            projection: 'globe',
            ...startingPoint,
            minZoom: 5,
            maxZoom: 24
        });

        const map = mapRef.current;

        // map.on('moveend', () => {
        //     const zoom = map.getZoom();
        //     const center = map.getCenter();
        //     console.log(`Zoom level: ${zoom}`);
        //     console.log(`Center: Longitude: ${center.lng}, Latitude: ${center.lat}`);
        //     console.log(`${map.getBounds()}`);
        // });

        // mapRef.current.addControl(new mapboxgl.NavigationControl())
        mapRef.current.setMaxBounds(bounds);

        return () => map.remove()

    }, [])

    return (
        <div id="map-container" ref={mapContainerRef}></div>
    )
};

export default Maps;