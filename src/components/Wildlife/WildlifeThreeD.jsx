import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const WildlifeThreeD = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const loader = new GLTFLoader();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Set background color
        scene.background = new THREE.Color('#212529');

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        // Load the 3D model
        loader.load('/models/kabanbay.glb', function (gltf) {
            const model = gltf.scene;

            // Scale the model to fit the scene
            model.scale.set(0.1, 0.1, 0.1);

            // Center the model in the scene
            const box = new THREE.Box3().setFromObject(model);
            const center = new THREE.Vector3();
            box.getCenter(center);
            model.position.sub(center);

            scene.add(model);

        }, undefined, function (error) {
            console.error(error);
        });

        // Position the camera
        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef}></div>;
};

export default WildlifeThreeD;