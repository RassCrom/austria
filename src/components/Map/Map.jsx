import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import 'mapbox-gl/dist/mapbox-gl.css';
import { useFetchData } from "@hooks/useFetchData";
import threed from "./threed";
import MapInfoSide from "./MapInfoSide/MapInfoSide";
import { use } from "react";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const bounds = [
  [8.12756, 46.240541],  // Southwest
  [18.54018, 49.385606],  // Northeast
];

const startingPoint = {
  center: [14.14145, 47.58691],
  zoom: 18,
  pitch: 52,
  bearing: 40,
  minZoom: 5,
  maxZoom: 20,
};

function Map({ setIsLoading, topic, selectedObject }) {
  const { data } = useFetchData(`/jsons/${topic}.json`);
  const {selectedItem, isSideShown} = useSelector((state) => ({
    selectedItem: state.mapInfo.activeInfo,
    isSideShown: state.mapInfo.shownInfo
  }));
  const dispatch = useDispatch();

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || !selectedObject) return;

    // const selectedItemData = data.find((el) => el.title === selectedItem);
    if (selectedObject) {
      flyToSelectedObject(map, selectedObject);
    }
  }, [map, selectedObject, data]);

  useEffect(() => {
    if (!mapboxToken) {
      console.error("Mapbox token is missing.");
      return;
    }

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      projection: 'globe',
      accessToken: mapboxToken,
      ...startingPoint,
      hash: true,
      antialias: true,
      config: { basemap: {  show3dObjects: false  }  }
    });

    setMap(mapInstance);
    mapInstance.setMaxBounds(bounds);
    mapInstance.on("load", () => {
      setIsLoading(false);
    });

    return () => mapInstance.remove();
  }, [setIsLoading, topic]);

  useEffect(() => {
    if (!map || !data) return;

    const models = data.filter((el) =>
      ['Schoenbrunn Palace'].includes(el.title)
    );

    if (data) {
      threed(startingPoint, map, models, dispatch, isSideShown)
    }

    const loadLayers = async () => {
      try {
        await setupFogAndSnowEffects(map);
        // await addTerrain(map);
        await fetchGeoJSON(map);
        await loadCustomIcons(map);
      } catch (err) {
        console.error("Error loading map layers:", err);
      }
    };

    map.on('load', loadLayers);

    return () => {
      threed(startingPoint, map, [], dispatch, isSideShown)
      map.off('load', loadLayers);
    }
  }, [map, data, dispatch, isSideShown, topic]);

  return (
    <div id="map-container" ref={mapContainerRef}>
      <MapInfoSide activeInfo={selectedItem} topic={topic} />
    </div>
  );
}

async function setupFogAndSnowEffects(map) {
  const zoomBasedReveal = (value) => [
    'interpolate', ['linear'], ['zoom'], 11, 0.0, 13, value
  ];

  map.setSnow({
    density: zoomBasedReveal(0.3),
    intensity: 1,
    'center-thinning': 0.1,
    direction: [0, 50],
    opacity: 1.0,
    color: "#ffffff",
    'flake-size': 0.35,
    vignette: zoomBasedReveal(0.3),
    'vignette-color': "#ffffff"
  });

  map.setFog({
    range: [-0.5, 1.5],
    'horizon-blend': 0.2,
    color: "#2a2a2a",
    'high-color': "#4b4b4b",
    'space-color': "#1a1a1a",
    'star-intensity': 0.05
  });

  map.setConfigProperty('basemap', 'lightPreset', 'day');
}

async function addTerrain(map) {
  map.addSource('mapbox-dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.terrain-rgb',
    tileSize: 512,
    maxzoom: 14
  });

  map.setTerrain({ source: 'mapbox-dem', exaggeration: 1 });
}

async function fetchGeoJSON(map) {
  const geoJSONFiles = ["/layers/fsg.geojson", "/layers/test_elev.geojson"];
  const [salamanderRes, testElevRes] = await Promise.all(geoJSONFiles.map(url => axios.get(url)));

  if (salamanderRes.data) {
    map.addSource("salamander", { type: "geojson", data: salamanderRes.data });
    map.addLayer({
      id: "salamander-layer",
      type: "fill",
      source: "salamander",
      paint: {
        "fill-color": "#0080ff",
        "fill-opacity": 0,
        "fill-opacity-transition": { duration: 800 }
      }
    });
  }

  if (testElevRes.data) {
    map.addSource("test_e", { type: "geojson", data: testElevRes.data });
    map.addLayer({
      id: "test_e-layer",
      type: "fill-extrusion",
      source: "test_e",
      paint: {
        "fill-extrusion-color": "white",
        "fill-extrusion-height": 100,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.0000000001
      }
    });
  }
}

async function loadCustomIcons(map) {
  map.addSource("test_arm", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [13.355586, 47.821561] },
          properties: {}
        }
      ]
    }
  });

  map.loadImage("/images/arrow.png", (error, image) => {
    if (error) throw error;

    map.addImage("cat-icon", image);
    map.addLayer({
      id: "test_arm-layer",
      type: "symbol",
      source: "test_arm",
      layout: {
        "icon-image": "cat-icon",
        "icon-size": 1,
        "icon-anchor": "bottom",
        "symbol-placement": "point",
        "symbol-z-elevate": true
      },
      paint: { "icon-translate": [0, 0] }
    });
  });
}

function flyToSelectedObject(map, coordinates) {
  map.flyTo({
    center: coordinates,
    zoom: 18,
    pitch: 52,
    bearing: 40,
    speed: 0.5
  });
}

export default Map;
