import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

// LngLatBounds(LngLat(8.127563432927161, 46.24054178874297), LngLat(18.540180776975063, 49.38560687732107))
const bounds = [
    [8.12756, 46.240541],  // Southwest (lower-left corner)
    [18.54018, 49.385606],  // Northeast (upper-right corner)
];

const startingPoint = {
    center: [13.355, 47.822], //13.355365498295384, Latitude: 47.822553142337966
    zoom: 20 //6.7
}

function Map() {
    const mapRef = useRef(null); 
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = mapboxToken;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',  // mapbox://styles/rasscrom/cm2de01iu011e01qv574f1pac
            projection: 'globe',
            ...startingPoint,
            minZoom: 5,
            maxZoom: 24
        });

        const modelOrigin = startingPoint.center;
        const modelAltitude = 0;
        const modelRotate = [Math.PI / 2, 0, 0];
    
        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
          modelOrigin,
          modelAltitude
        );
    
        const modelTransform = {
          translateX: modelAsMercatorCoordinate.x,
          translateY: modelAsMercatorCoordinate.y,
          translateZ: modelAsMercatorCoordinate.z,
          rotateX: modelRotate[0],
          rotateY: modelRotate[1],
          rotateZ: modelRotate[2],
          scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        };
    
        const createCustomLayer = (map) => {
            const camera = new THREE.Camera();
            const scene = new THREE.Scene();
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
    
            const directionalLight1 = new THREE.DirectionalLight(0xffffff);
            directionalLight1.position.set(0, -70, 100).normalize();
            scene.add(directionalLight1);
        
            const directionalLight2 = new THREE.DirectionalLight(0xffffff);
            directionalLight2.position.set(0, 70, 100).normalize();
            scene.add(directionalLight2);
    
            const loader = new GLTFLoader();
            let model;

            loader.load(
                'src/assets/kabanbay.glb',
                (gltf) => {
                scene.add(gltf.scene);
                }
            );
        
            const renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: map.painter.context.gl,
                antialias: true
            });
    
          renderer.autoClear = false;

          const handleMouseClick = (event) => {
                const rect = map.getCanvas().getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(scene.children, true);

                if (intersects.length > 0) {
                    console.log('Hello');
                }
          };
          map.getCanvas().addEventListener('click', handleMouseClick);
    
          return {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: () => {
              // Add logic that runs on layer addition if necessary.
            },
            render: (gl, matrix) => {
              const rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
              );
              const rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
              );
              const rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
              );
    
              const m = new THREE.Matrix4().fromArray(matrix);
              const l = new THREE.Matrix4()
                .makeTranslation(
                  modelTransform.translateX,
                  modelTransform.translateY,
                  modelTransform.translateZ
                )
                .scale(
                  new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                  )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);
    
              camera.projectionMatrix = m.multiply(l);
              renderer.resetState();
              renderer.render(scene, camera);
              map.triggerRepaint();
            }
          };
        };
    
        map.on('style.load', () => {
          const customLayer = createCustomLayer(map);
          map.addLayer(customLayer);
        });

        mapRef.current = map;

        // mapRef.current.addControl(new mapboxgl.NavigationControl())
        map.setMaxBounds(bounds);

        return () => map.remove()   

    }, [])

    return (
        <div id="map-container" ref={mapContainerRef}></div>
    )
};

export default Map;