import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Threebox } from 'threebox-plugin';

import 'mapbox-gl/dist/mapbox-gl.css';

import threed from "./threed";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

// LngLatBounds(LngLat(8.127563432927161, 46.24054178874297), LngLat(18.540180776975063, 49.38560687732107))
const bounds = [
    [8.12756, 46.240541],  // Southwest (lower-left corner)
    [18.54018, 49.385606],  // Northeast (upper-right corner)
];

const startingPoint = {
    center: [13.355, 47.822], //13.355365498295384, Latitude: 47.822553142337966
    zoom: 14, //6.7 20
    pitch: 64.9,
    bearing: 172.5,
}

function Map() {
    const mapRef = useRef(null); 
    const mapContainerRef = useRef(null);

    function onSelectedChange(e) {
        let selectedObject = e.detail;
        let selectedValue = selectedObject.selected;
        console.log('nice: ', selectedObject)
    }
    
    useEffect(() => {
      mapboxgl.accessToken = mapboxToken;
    
      if (!mapboxToken) {
        console.error("Mapbox token is missing. Please provide a valid token.");
        return;
      }
    
      const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          projection: 'globe',
          ...startingPoint,
          center: [-73.97627, 40.75155],
          minZoom: 5,
          maxZoom: 20,
          antialias: true
      });

      map.on('style.load', () => {
        map.addLayer({
          id: 'custom-threebox-model',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function () {
            window.tb = new Threebox(
              map,
              map.getCanvas().getContext('webgl'),
              {                
				realSunlight: true,
				// sky: true,
				enableSelectingObjects: true,
				enableTooltips: true,
              }
            );
            const scale = 3.2; // https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf
            const options = {
              obj: 'assets/kabanbay.glb',
              type: 'gltf',
              scale: { x: scale, y: scale, z: 2.7 },
              units: 'meters',
              rotation: { x: 90, y: -90, z: 0 }
            };
  
            window.tb.loadObj(options, (model) => {
                let s = model.setCoords(startingPoint.center);
                model.setRotation({ x: 0, y: 0, z: 241 });
                model.addTooltip("Kabanbay Batyr mausoleum", true);
                model.castShadow = true;
                s.addEventListener('SelectedChange', onSelectedChange, false);
                window.tb.add(model);
            });
          },
  
          render: function () {
            window.tb.update();
          }
        });
      });

    
      map.on('load', () => {
          fetch('fsg.geojson')
              .then((response) => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then((geojsonData) => {
                  map.addSource('salamander', {
                      type: 'geojson',
                      data: geojsonData
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
              })
              .catch((error) => {
                  console.error('Error loading geojson data:', error);
              });
      });
    
      mapRef.current = map;
    
      map.setMaxBounds(bounds);
    
      return () => map.remove();
    }, []);


    return (
        <div id="map-container" ref={mapContainerRef}></div>
    )
};

export default Map;
