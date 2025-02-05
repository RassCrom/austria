import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import 'mapbox-gl/dist/mapbox-gl.css';
import { useFetchData } from "@hooks/useFetchData";
import threed from "./threed";
import MapInfoSide from "./MapInfoSide/MapInfoSide";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const bounds = [
  [8.12756, 46.240541],  // Southwest
  [18.54018, 49.385606],  // Northeast
];

const startingPoint = {
  center:[14.14145, 47.58691],//, [71.39495499999998,51.19494089311223]
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
  const shownGeojson = useSelector((state) => state.mapInfo.shownGeojson)
  const dispatch = useDispatch();

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || !selectedObject) return;

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
    // mapInstance.setMaxBounds(bounds);

    mapInstance.on("load", () => {
      setIsLoading(false);

      if (!mapInstance.getSource("ai")) {
        mapInstance.addSource("ai", {
          type: "vector",
          tiles: ["http://127.0.0.1:6565/ai/{z}/{x}/{y}.pbf"],
          minzoom: 0,
          maxzoom: 22
        });
      
        mapInstance.addLayer({
          id: "ai",
          type: "fill",
          source: "ai",
          "source-layer": "ai",
          paint: {
            "fill-color": "#008000",
            "fill-opacity": 0
          },
          minzoom: 0,
          maxzoom: 22
        });
      }
    });

    return () => mapInstance.remove();
  }, [setIsLoading, topic]);

  useEffect(() => {
    if (!map || !data) return;

    if (data) {
      threed(startingPoint, map, data, dispatch, isSideShown)
    }

    if (topic === 'animals' && shownGeojson) {
      const selectedGeojson = data.find((el) => el.id === selectedItem);
      if (selectedGeojson) {
        console.log("Selected GeoJSON:", selectedGeojson);
        addGeoJSONLayer(map, selectedGeojson);
      }
    } else {
      const selectedGeojson = data.find((el) => el.id === selectedItem);
      if (selectedGeojson) {
        removeGeoJSONLayer(map, selectedGeojson.id);
      }
    }

    const loadLayers = async () => {
      try {
        await setupFogAndSnowEffects(map);
      } catch (err) {
        console.error("Error loading map layers:", err);
      }
    };

    map.on('load', loadLayers);

    return () => {
      threed(startingPoint, map, [], dispatch, isSideShown)
      map.off('load', loadLayers);
    }
  }, [map, data, dispatch, isSideShown, topic, shownGeojson, selectedItem]);

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

async function addGeoJSONLayer(map, geojsonData) {
  if (!map || !geojsonData || !geojsonData.id || !geojsonData.layer) {
    console.error("Invalid GeoJSON data or map instance.");
    return;
  }

  try {
    const { id, layer } = geojsonData;
    const response = await axios(`/layers/${layer}`);
    const data = response.data;

    if (!map.getSource(id)) {
      map.addSource(id, { type: "geojson", data });

      map.addLayer({
        id: `${id}-layer`,
        type: "fill",
        source: id,
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.6,
          "fill-opacity-transition": { duration: 500 },
        },
      });
    }
  } catch (error) {
    console.error("Error loading GeoJSON:", error);
  }
}

function removeGeoJSONLayer(map, layerId) {
  if (!map || !layerId) return;

  if (map.getLayer(`${layerId}-layer`)) {
    map.removeLayer(`${layerId}-layer`);
  }

  if (map.getSource(layerId)) {
    map.removeSource(layerId);
  }
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
