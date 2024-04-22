import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 10;
camera.position.y = 8;
camera.position.z = 5;

let loadedObject = null;

const loader = new GLTFLoader();


loader.load(
    'src/models/picnic/scene.gltf',
    function (gltf) {
        loadedObject = gltf.scene;
        scene.add(loadedObject);

        // // Calculate bounding box to center the loaded object
        // const bbox = new THREE.Box3().setFromObject(loadedObject);
        // const center = bbox.getCenter(new THREE.Vector3());
        // loadedObject.position.sub(center); // Offset to center the object

        // Render the scene after adjusting the object and camera position
        renderer.render(scene, camera);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container-3D").appendChild(renderer.domElement);

//lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.enableZoom = false; // Disable zoom functionality

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


animate();


const container3d = document.getElementById("container-3D");

const tl = gsap.timeline();

// // // Move container3d to the right
// tl.to(container3d, {
//     duration: 4,  // Duration in seconds
//     x: 150,
//     y:-50,        // Move to the right (adjust this value as needed)
//     ease: 'power2.out'  // Easing function for smooth animation
// });

// // Move container3d back to the left
// tl.to(container3d, {
//     duration: 4,  // Duration in seconds
//     x: -400,   
//     y: 50,       // Move to the left (adjust this value as needed)
//     ease: 'power2.inOut',  // Use a different easing for a more dynamic effect
//     onComplete: () => {
//         // Animation complete callback if needed
//         console.log('Animation complete!');
//     }
// }); 

//gsap animation
    const targetX = -2; // Target X coordinate
    const targetY = 1.7; // Target Y coordinate
    const targetZ = 3; // Target Z coordinate

    // Animate camera position
    // gsap.to(camera.position, {
    //     duration: 3,
    //     x: targetX,
    //     y: targetY,
    //     z: targetZ,
    //     ease: 'power2.out',
    //     onUpdate: () => {
    //         renderer.render(scene, camera);
    //     }
    // });
