import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 12);

let loadedObject = null;
const loader = new GLTFLoader();

let rotationAngle = 0; 

loader.load(
  'src/models/scene/scene.gltf',
  function (gltf) {
      loadedObject = gltf.scene;
      scene.add(loadedObject);

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
renderer.setClearColor(0xefe6cf); // Black background
document.getElementById("container-3D").appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.37);
directionalLight.position.set(0, 1, 1.5);
scene.add(directionalLight);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.01);
directionalLight1.position.set(0, 1, -1.5);
scene.add(directionalLight1);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.enableZoom = false;
controls.enabled = false;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);


ScrollTrigger.create({
    start: "top top",  
    end: "bottom bottom",  
    scrub: 1, 
    onUpdate: function (self) {
        const rotationAmount = self.progress * -2 * Math.PI; 
        gsap.to(loadedObject.rotation, { 
            y: rotationAmount, 
            ease: "power1.out" 
        });
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// function animate() {
//     requestAnimationFrame(animate);

//     // Update rotation of the loaded object
//     if (loadedObject) {
//         rotationAngle -= 0.001; // Adjust speed of rotation as needed
//         loadedObject.rotation.y = rotationAngle; // Rotate around y-axis
//     }

//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();

// =================================================================

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded',function(){
    const contentHolderHeight = document.querySelector(".content-holder").offsetHeight;
    const imgHolderHeight = window.innerHeight;
    const addtionalScrollHeight = window.innerHeight;

    const totalBodyHeight = contentHolderHeight + imgHolderHeight + addtionalScrollHeight;
    document.body.style.height = `${totalBodyHeight}px`;

});

ScrollTrigger.create({
    trigger: ".website-content",
    start: "-0.1% top",
    end: "bottom bottom", 
    onEnter: () => {
        gsap.set(".website-content", { position: "absolute", top: "195%"});
    },
    onLeaveBack: () => {
        gsap.set(".website-content", { position: "fixed", top: '0' });
    },
     markers: false, 
});

gsap.to(".header .letters:first-child", {
    x: () => -innerWidth * 3,
    scale: 10,
    ease: "power2.inOut",
    scrollTrigger: {
        start: "top top",
        end: "+=200%",
        scrub: 1
    } 
});

gsap.to(".header .letters:last-child", {
    x: () => innerWidth * 3,
    scale: 10,
    ease: "power2.inOut",
    scrollTrigger: {
        start: "top top",
        end: "+=200%",
        scrub: 1
    } 
});

gsap.to(".image-holder", {
    rotate: 0,
    clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    ease: "power2.inOut",
    scrollTrigger: {
        start: "top top",
        end: "+=200%",
        scrub: 1,
    }
});

gsap.to(".image-holder img", {
    scale: 1,
    ease: "power2.inOut",
    scrollTrigger: {
        start: "top top",
        end: "+=200%",
        scrub: 1,
    }
});

// =================================================================

gsap.registerPlugin(ScrollTrigger);


const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")


gsap.set(photos, {yPercent:101})

const allPhotos = gsap.utils.toArray(".desktopPhoto")

let mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {

  console.log("desktop")
	
  ScrollTrigger.create({
	trigger:".gallery",
	start:"top top",
	end:"bottom bottom",
	pin:".right",
    markers: false
})

details.forEach((detail, index)=> {

	let headline = detail.querySelector("h1")
	let animation = gsap.timeline()
	   .to(photos[index], {yPercent:0})
	   .set(allPhotos[index], {autoAlpha:0})
	ScrollTrigger.create({
		trigger:headline,
		start:"top 80%",
		end:"top 50%",
		animation:animation,
		scrub:true,
		markers:false
	})
})
	
  return () => {
	  console.log("mobile")
  };
});

// =================================================================
