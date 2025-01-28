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
          antialias: true
      });
      
      mapRef.current = map;
      // TODO Refactor the function
      // threed(startingPoint, map);
      // TODO make template of loading layers
      map.on('load', async () => {
        try {
          
          map.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.terrain-rgb', // Use Mapbox's terrain-rgb tileset
            tileSize: 512,
            maxzoom: 14,
          });
        
          // Enable the terrain
          // map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
          const salamanderRes = await axios('fsg.geojson');

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
          
          const test_e = await axios('/sptial/test_elev.geojson');
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
        
          map.loadImage('/arrow.png', (error, image) => {
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
                'icon-translate': [0, 0], // Adjust the altitude appearance if needed
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