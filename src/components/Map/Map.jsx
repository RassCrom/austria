import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

import 'mapbox-gl/dist/mapbox-gl.css';

import threed from "./threed";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

// LngLatBounds(LngLat(8.127563432927161, 46.24054178874297), LngLat(18.540180776975063, 49.38560687732107))
const bounds = [
  [8.12756, 46.240541],  // Southwest (lower-left corner)
  [18.54018, 49.385606],  // Northeast (upper-right corner)
];

const startingPoint = {
    center: [13.355, 47.822],
    zoom: 14,
    pitch: 64.9,
    bearing: 172.5,
}

function Map() {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    
    useEffect(() => {
      if (!mapboxToken) {
        console.error("Mapbox token is missing. Please provide a valid token.");
        return;
      }

      mapboxgl.accessToken = mapboxToken;
    
      const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          projection: 'globe',
          ...startingPoint,
          minZoom: 5,
          maxZoom: 20,
          hash: true,
          antialias: true
      });
      
      mapRef.current = map;
      // TODO Refactor the function
      threed(startingPoint, map);
      // TODO make template of loading layers
      map.on('load', async () => {
        try {
          
          map.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.terrain-rgb',
            tileSize: 512,
            maxzoom: 14,
          });
          
          const zoomBasedReveal = (value) => {
            return ['interpolate', ['linear'], ['zoom'], 11, 0.0, 13, value];
          };
          map.setFog({
            range: [-0.5, 1.5], // Controls the starting and ending points of the fog effect
            'horizon-blend': .4,
            color: '#2a2a2a', // The main fog color
            'high-color': '#4b4b4b', 
            'space-color': '#1a1a1a',
            'star-intensity': 0.05
          });

          // console.log(map.setSnow)

          map.setSnow({
            density: zoomBasedReveal(.3),
            intensity: 1, // velocity of falling down
            'center-thinning': 0.1,
            direction: [0, 50],
            opacity: 1.0,
            color: `#ffffff`,
            'flake-size': 0.35,
            vignette: zoomBasedReveal(0.3),
            'vignette-color': `#ffffff`
          });

          // Enable the terrain
          map.setTerrain({ source: 'mapbox-dem', exaggeration: 1 });

          const salamanderRes = await axios('/layers/fsg.geojson');

          if (salamanderRes.data) {
            map.addSource('salamander', {
              type: 'geojson',
              data: salamanderRes.data
            });

            map.addLayer({
              id: 'salamander-layer',
              type: 'fill',
              source: 'salamander',
              layout: {},
              paint: {
                  'fill-color': '#0080ff',
                  'fill-opacity': 0,
                  'fill-opacity-transition': { duration: 800 }
              }
            });
          }
          
          const test_e = await axios('/layers/test_elev.geojson');
          mapRef.current.addSource('test_e', {
            type: 'geojson',
            data: test_e.data
          });

          mapRef.current.addLayer({
            id: 'test_e-layer',
            type: 'fill-extrusion',
            source: 'test_e',
            paint: {
              'fill-extrusion-color': 'white',
              'fill-extrusion-height': 100,
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.0000000001
            },
          });
        
          // Add your GeoJSON source with altitude
          map.addSource('test_arm', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [13.355, 47.822], 
                  },
                  properties: {},
                },
              ],
            },
          });
        
          map.loadImage('/images/arrow.png', (error, image) => {
            if (error) throw error;
        
            map.addImage('cat-icon', image);
        
            map.addLayer({
              id: 'test_arm-layer',
              type: 'symbol',
              source: 'test_arm',
              layout: {
                'icon-image': 'cat-icon',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'symbol-placement': 'point',
                'symbol-z-elevate': true
              },
              paint: {
                'icon-translate': [0, 0],
              },
            });
          });
        } catch (err) {
          console.error('Error during fetching geojson:', err);
        }
      });

      map.setMaxBounds(bounds);
    
      return () => map.remove();
    }, []);

    return (
      <div id="map-container" ref={mapContainerRef}></div>
    )
};

export default Map;