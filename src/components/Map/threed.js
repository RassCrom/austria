import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import mapboxgl from "mapbox-gl";

export default function threed(startingPoint, map) {
    const scaleFactor = 50000;
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
        const camera = new THREE.PerspectiveCamera(
            45, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        const scene = new THREE.Scene();
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 70, 100).normalize();
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        let model = null;

        loader.load(
            'assets/red_panda.glb',
            (gltf) => {
                model = gltf.scene;
                scene.add(model);
            },
            undefined,
            (error) => console.error('Error loading GLTF model:', error)
        );

        const renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: map.painter.context.gl,
            antialias: true
        });

        renderer.autoClear = false;

        const handleMouseClick = (event) => {
            if (!model) return;

            const rect = map.getCanvas().getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(model.children, true);

            if (intersects.length > 0) {
                console.log('Model clicked!', intersects);
                const salamanderLayer = 'salamander-layer';
                const currentOpacity = map.getPaintProperty(salamanderLayer, 'fill-opacity');
                map.setPaintProperty(salamanderLayer, 'fill-opacity', currentOpacity === 0 ? 0.5 : 0);
            } else {
                console.log('Click missed the model.');
            }
        };

        map.on('click', handleMouseClick);

        return {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
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
                            modelTransform.scale * scaleFactor,
                            -modelTransform.scale * scaleFactor,
                            modelTransform.scale * scaleFactor
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
}
