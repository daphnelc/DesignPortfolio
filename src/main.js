import './style.css'
import * as THREE from 'three'
import { addLight, addLightHelper } from './addLight'
import Model from './model'
//import { add } from 'three/examples/jsm/libs/tween.module.js';
import { environment } from './environment'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { InteractionManager } from 'three.interactive';


//three enssentials: scene, camera, renderer
const scene = new THREE.Scene(); //(FOV, Aspect Ratio, Near, Far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('#FFFFFF');
renderer.setClearAlpha(1);

//need to be after scene and camera
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement,
)

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

//parent varieble
//meshes is the global container
const meshes = {}
const { keyLight, fillLight } = addLight()
const { keyLightHelper, fillLightHelper } = addLightHelper(keyLight, fillLight)
const mixers = [] //array
const clock = new THREE.Clock()
let counter = 0;
let modelFlag = true
const startCameraPos = new THREE.Vector3(0, 1.5, 5);

const TOTAL_MODELS = 20  // count all your glb files
let loadedCount = 0

let studioFlag = true
let groupAngle = 0
let groupDirection = 1

const popup = document.getElementById('popup');
const popupFrame = document.getElementById('popupFrame');
const closePopup = document.getElementById('closePopup');


init()
function init() {
  //all the setup 
  //renderer.setSize(window.innerWidth, window.innerHeight);

  //claude
  const rightPanel = document.querySelector('.right-panel')
  const w = rightPanel.clientWidth || (window.innerWidth - 300)
  const h = rightPanel.clientHeight || window.innerHeight

  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  
  rightPanel.appendChild(renderer.domElement)


  camera.position.z = startCameraPos.z;
  camera.position.y = startCameraPos.y;
  camera.lookAt(0, 0, 0);

  scene.add(keyLight)
  //scene.add(fillLight)       // both lights
  //scene.add(keyLightHelper, fillLightHelper)

  //scene.environment = environment()
  //scene.environmentIntensity = 0.01;

  instances()
  resize()
  animate()
}

function openPopup(url) {
  popupFrame.src = url;
  popup.classList.remove('hidden');
}

function closePopupScreen() {
  popup.classList.add('hidden');
  popupFrame.src = '';
}

closePopup.addEventListener('click', closePopupScreen);

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    closePopupScreen();
  }
});

/* -------------------------------------------------------------------------- */
/*                                   instances                                */
/* -------------------------------------------------------------------------- */

function instances() {
  //where all my 3d models are loaded

  /* ------------------------------- desk model ------------------------------- */

  const desk1 = new Model({
    url: 'desk1.glb',
    scene: scene,
    meshes: meshes,
    name: 'desk1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
    //animationState: true,
    //mixers: mixers,
  })
  desk1.init() //desk top

  const desk2 = new Model({
    url: 'desk2.glb',
    scene: scene,
    meshes: meshes,
    name: 'desk2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  desk2.init() //desk legs

  /* ------------------------------ monitor model ----------------------------- */

  const monitor1 = new Model({
    url: 'monitor1.glb',
    scene: scene,
    meshes: meshes,
    name: 'monitor1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  monitor1.init() //outside

  const monitor2 = new Model({
    url: 'monitor2.glb',
    scene: scene,
    meshes: meshes,
    name: 'monitor2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  monitor2.init() //screen

  /* ------------------------------ laptop model ------------------------------ */

  const laptop1 = new Model({
    url: 'laptop1.glb',
    scene: scene,
    meshes: meshes,
    name: 'laptop1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  laptop1.init()

  const laptop2 = new Model({
    url: 'laptop2.glb',
    scene: scene,
    meshes: meshes,
    name: 'laptop2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  laptop2.init()

  /* ------------------------------- plant model ------------------------------ */

  const plant1 = new Model({
    url: 'plant1.glb',
    scene: scene,
    meshes: meshes,
    name: 'plant1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  plant1.init()

  const plant2 = new Model({
    url: 'plant2.glb',
    scene: scene,
    meshes: meshes,
    name: 'plant2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  plant2.init()

  const plant3 = new Model({
    url: 'plant3.glb',
    scene: scene,
    meshes: meshes,
    name: 'plant3',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  plant3.init()

  /* ------------------------------ speaker model ----------------------------- */

  const speaker1 = new Model({
    url: 'speaker1.glb',
    scene: scene,
    meshes: meshes,
    name: 'speaker1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  speaker1.init()

  const speaker2 = new Model({
    url: 'speaker2.glb',
    scene: scene,
    meshes: meshes,
    name: 'speaker2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  speaker2.init()

  const speaker3 = new Model({
    url: 'speaker3.glb',
    scene: scene,
    meshes: meshes,
    name: 'speaker3',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  speaker3.init()

  const speaker4 = new Model({
    url: 'speaker4.glb',
    scene: scene,
    meshes: meshes,
    name: 'speaker4',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  speaker4.init()

  /* ------------------------------ papers model ------------------------------ */

  const paper1 = new Model({
    url: 'paper1.glb',
    scene: scene,
    meshes: meshes,
    name: 'paper1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  paper1.init()

  const paper2 = new Model({
    url: 'paper2.glb',
    scene: scene,
    meshes: meshes,
    name: 'paper2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  paper2.init()

  /* ---------------------------- pen holder model ---------------------------- */

  const penholder1 = new Model({
    url: 'penholder1.glb',
    scene: scene,
    meshes: meshes,
    name: 'penholder1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  penholder1.init()

  const penholder2 = new Model({
    url: 'penholder2.glb',
    scene: scene,
    meshes: meshes,
    name: 'penholder2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  penholder2.init()

  const penholder3 = new Model({
    url: 'penholder3.glb',
    scene: scene,
    meshes: meshes,
    name: 'penholder3',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  penholder3.init()

  /* ------------------------------ camera model ------------------------------ */

  const camera1 = new Model({
    url: 'camera1.glb',
    scene: scene,
    meshes: meshes,
    name: 'camera1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  camera1.init()

  const camera2 = new Model({
    url: 'camera2.glb',
    scene: scene,
    meshes: meshes,
    name: 'camera2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  camera2.init()

  const camera3 = new Model({
    url: 'camera3.glb',
    scene: scene,
    meshes: meshes,
    name: 'camera3',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  camera3.init()

  /* ------------------------------- book model ------------------------------- */

  const book1 = new Model({
    url: 'book1.glb',
    scene: scene,
    meshes: meshes,
    name: 'book1',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  book1.init()


  const book2 = new Model({
    url: 'book2.glb',
    scene: scene,
    meshes: meshes,
    name: 'book2',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  book2.init()

  const book3 = new Model({
    url: 'book3.glb',
    scene: scene,
    meshes: meshes,
    name: 'book3',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  book3.init()

  const book4 = new Model({
    url: 'book4.glb',
    scene: scene,
    meshes: meshes,
    name: 'book4',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  book4.init()

  const book5 = new Model({
    url: 'book5.glb',
    scene: scene,
    meshes: meshes,
    name: 'book5',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  book5.init()

  const book6 = new Model({
    url: 'book6.glb',
    scene: scene,
    meshes: meshes,
    name: 'book6',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    callback: onLoad,
  })
  book6.init()

}

function resize() {
  window.addEventListener('resize', () => {
    const rightPanel = document.querySelector('.right-panel')
    renderer.setSize(rightPanel.clientWidth, rightPanel.clientHeight)
    camera.aspect = rightPanel.clientWidth / rightPanel.clientHeight
    camera.updateProjectionMatrix()
  })
}

/* -------------------------------------------------------------------------- */
/*                                   loading                                  */
/* -------------------------------------------------------------------------- */

//claude
function onLoad() {
  loadedCount++
  const progress = (loadedCount / TOTAL_MODELS) * 100
  document.querySelector('.loader-fill').style.width = progress + '%'

  if (loadedCount === TOTAL_MODELS) {
    setTimeout(() => {
      document.getElementById('loading-screen').classList.add('hidden')
    }, 700)
  }
}


/* -------------------------------------------------------------------------- */
/*                                  animation                                 */
/* -------------------------------------------------------------------------- */

const paperSound = new Audio('/paper.MP3');
paperSound.volume = 0.5;

const cameraSound = new Audio('/camera.mp3');
cameraSound.volume = 0.5;

const penholderSound = new Audio('/penholder.MP3');
penholderSound.volume = 0.5;

const screenTexture = new THREE.TextureLoader().load('/screenshot.png')
const screenTexture2 = new THREE.TextureLoader().load('/screenshot2.png')

function animate() {
  requestAnimationFrame(animate);

  controls.update()

  //for three.interactive
  if (interactionManager) interactionManager.update();

  if (modelFlag && meshes.monitor1 && meshes.speaker1 &&
    meshes.book1 && meshes.book2 && meshes.book3 && meshes.book4 && meshes.book5 && meshes.book6) {

    modelFlag = false

    /* ----------------------------- materials ----------------------------- */

    const loader = new THREE.TextureLoader();
    const grain = loader.load('/texture.jpg');

    const materials = {
      desk1: new THREE.MeshBasicMaterial({ color: 0xF5F1E8 }),  // cream
      desk2: new THREE.MeshBasicMaterial({ color: 0x6B6A3A }),  // olive green

      monitor1: new THREE.MeshBasicMaterial({ color: 0xD9D9D9 }),  // light grey
      monitor2: new THREE.MeshBasicMaterial({
        //color: 0x2F2F2F
        map: screenTexture
      }),

      laptop1: new THREE.MeshBasicMaterial({ color: 0xD9D9D9 }),
      laptop2: new THREE.MeshBasicMaterial({
        color: 0x2F2F2F
        //map: screenTexture2
      }),

      speaker1: new THREE.MeshBasicMaterial({ color: 0xC4552D }),  // orange
      speaker2: new THREE.MeshBasicMaterial({ color: 0xF5F1E8 }),
      speaker3: new THREE.MeshBasicMaterial({ color: 0x3B2E2A }),  // dark brown
      speaker4: new THREE.MeshBasicMaterial({ color: 0x2F2F2F }),

      plant1: new THREE.MeshBasicMaterial({ color: 0x3C6E4A }),  // green
      plant2: new THREE.MeshBasicMaterial({ color: 0x3B2E2A }),  // dark brown
      plant3: new THREE.MeshBasicMaterial({ color: 0x3F8F8B }),  // teal

      paper1: new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
      paper2: new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),

      penholder1: new THREE.MeshBasicMaterial({ color: 0x1F3558 }),  // navy
      penholder2: new THREE.MeshBasicMaterial({ color: 0xD1A23A }),  // mustard 
      penholder3: new THREE.MeshBasicMaterial({ color: 0xA0432A }),  // red

      camera1: new THREE.MeshBasicMaterial({ color: 0xD1A23A }),  // mustard
      camera2: new THREE.MeshBasicMaterial({ color: 0x2F2F2F }),  // black
      camera3: new THREE.MeshBasicMaterial({ color: 0x3B2E2A }),  // brown

      book1: new THREE.MeshBasicMaterial({ color: 0xA0432A }),  // red
      book2: new THREE.MeshBasicMaterial({ color: 0x3F8F8B }),  // teal
      book3: new THREE.MeshBasicMaterial({ color: 0xD1A23A }),  // yellow
      book4: new THREE.MeshBasicMaterial({ color: 0x1F3558 }),  // navy
      book5: new THREE.MeshBasicMaterial({ color: 0xA0432A }),
      book6: new THREE.MeshBasicMaterial({ color: 0x3F8F8B }),
    }


    //claude
    Object.entries(materials).forEach(([name, mat]) => {
      if (meshes[name]) {
        meshes[name].traverse((child) => {
          if (child.isMesh) child.material = mat
        })
      }
    })

    /* ----------------------------- build groups ----------------------------- */

    if (meshes.desk1 && meshes.desk2 && !meshes.desk) {
      const desk = new THREE.Group();
      desk.add(meshes.desk1, meshes.desk2);
      meshes.desk = desk;
    }

    if (meshes.monitor1 && meshes.monitor2 && !meshes.monitor) {
      const monitor = new THREE.Group();
      monitor.add(meshes.monitor1, meshes.monitor2);
      meshes.monitor = monitor;
    }

    if (meshes.laptop1 && meshes.laptop2 && !meshes.laptop) {
      const laptop = new THREE.Group();
      laptop.add(meshes.laptop1, meshes.laptop2);
      meshes.laptop = laptop;
    }

    if (meshes.speaker1 && meshes.speaker2 && meshes.speaker3 && meshes.speaker4 && !meshes.speaker) {
      const speaker = new THREE.Group();
      speaker.add(meshes.speaker1, meshes.speaker2, meshes.speaker3, meshes.speaker4);
      meshes.speaker = speaker;
    }

    if (meshes.penholder1 && meshes.penholder2 && meshes.penholder3 && !meshes.penholder) {
      const penholder = new THREE.Group();
      penholder.add(meshes.penholder1, meshes.penholder2, meshes.penholder3);
      meshes.penholder = penholder;
    }

    if (meshes.camera1 && meshes.camera2 && meshes.camera3 && !meshes.camera) {
      const camera = new THREE.Group();
      camera.add(meshes.camera1, meshes.camera2, meshes.camera3);
      meshes.camera = camera;
    }

    if (meshes.plant1 && meshes.plant2 && meshes.plant3 && !meshes.plant) {
      const plant = new THREE.Group();
      plant.add(meshes.plant1, meshes.plant2, meshes.plant3);
      meshes.plant = plant;
    }
    /* ------------------------------ desk rotation ----------------------------- */

    if (
      studioFlag &&
      meshes.desk &&
      meshes.monitor &&
      meshes.laptop &&
      meshes.speaker &&
      meshes.plant &&
      meshes.penholder && meshes.camera &&
      meshes.paper1 && meshes.paper2 &&
      meshes.book1 && meshes.book2 && meshes.book3 &&
      meshes.book4 && meshes.book5 && meshes.book6
    ) {


      // Then add everything to studio group
      const group = new THREE.Group()
      group.add(
        meshes.desk,
        meshes.monitor, meshes.laptop,
        meshes.speaker, meshes.plant, meshes.camera,
        meshes.paper1, meshes.paper2, meshes.penholder,
        meshes.book1, meshes.book2, meshes.book3,
        meshes.book4, meshes.book5, meshes.book6
      );
      meshes.group = group
      scene.add(meshes.group)
      studioFlag = false
    }

    /* ---------------------------- zoom in to screen --------------------------- */

    if (meshes.monitor) {
      meshes.monitor.addEventListener('click', () => {
        counter++;
        if (counter === 1) {
          // move camera
          gsap.to(camera.position, {
            x: 0,
            y: 1.5,
            z: 0.6,
            duration: 1.5,
            ease: 'power1.inOut',
          });
          // change where camera looks
          gsap.to(controls.target, {
            x: 0,
            y: 1.4,
            z: 0,
            duration: 1.5,
            ease: 'power1.inOut',
            onUpdate: () => controls.update()
          });
          // open website after 1 second
          setTimeout(() => {
            openPopup('https://daphnechiang.com');
          }, 2000);
        } else {
          // reset camera
          gsap.to(camera.position, {
            x: startCameraPos.x,
            y: startCameraPos.y,
            z: startCameraPos.z,
            duration: 1.5,
            ease: 'power1.inOut',
          });
          // reset look target
          gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'power1.inOut',
            onUpdate: () => controls.update()
          });
          counter = 0;
        }
      });
      interactionManager.add(meshes.monitor);
    }



    if (meshes.laptop) {
      meshes.laptop.addEventListener('click', () => {
        counter++;
        if (counter === 1) {
          // move camera
          gsap.to(camera.position, {
            x: 0.5,
            y: 1.4,
            z: 0.8,
            duration: 1.5,
            ease: 'power1.inOut',
          });
          // change where camera looks
          gsap.to(controls.target, {
            x: 0.7,
            y: 1,
            z: 0,
            duration: 1.5,
            ease: 'power1.inOut',
            onUpdate: () => controls.update()
          });
        } else {
          // reset camera
          gsap.to(camera.position, {
            x: startCameraPos.x,
            y: startCameraPos.y,
            z: startCameraPos.z,
            duration: 1.5,
            ease: 'power1.inOut',
          });
          // reset look target
          gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'power1.inOut',
            onUpdate: () => controls.update()
          });
          counter = 0;
        }
      });
      interactionManager.add(meshes.laptop);
    }


    /* ----------------------------- speaker audio ----------------------------- */

    if (meshes.speaker) {
      const sound = new Audio('/music.mp3')
      sound.loop = true
      let isPlaying = false

      meshes.speaker.addEventListener('click', () => {
        if (!isPlaying) {
          sound.play()
          isPlaying = true
        } else {
          sound.pause()
          isPlaying = false
        }
      })

      interactionManager.add(meshes.speaker)
    }

    /* ----------------------------- pen holder move ---------------------------- */

    if (meshes.penholder) {

      meshes.penholder.addEventListener('click', () => {
        counter++;
        if (counter === 1) {

          penholderSound.currentTime = 0;
          penholderSound.play().catch(() => { }); // ignore autoplay errors

          gsap.to(meshes.penholder.position, {
            x: meshes.penholder.position.x + 0.2,
            duration: 1,
            ease: 'power1.out',
          });
        } else if (counter === 2) {

          penholderSound.currentTime = 0;
          penholderSound.play().catch(() => { }); // ignore autoplay errors

          gsap.to(meshes.penholder.position, {
            x: meshes.penholder.position.x - 0.1,
            z: meshes.penholder.position.z + 0.1,
            duration: 1,
            ease: 'power1.out',
          });
        } else {

          penholderSound.currentTime = 0;
          penholderSound.play().catch(() => { }); // ignore autoplay errors

          gsap.to(meshes.penholder.position, {
            x: 0,
            z: 0,
            duration: 1,
            ease: 'power1.out',
          });
          counter = 0;
        }
      })
      interactionManager.add(meshes.penholder);
    }

    /* ----------------------------- paper animation ---------------------------- */

    if (meshes.paper1) {

      meshes.paper1.addEventListener('click', () => {
        counter++;
        if (counter === 1) {

          // restart sound every click
          paperSound.currentTime = 0;
          paperSound.play().catch(() => { }); // ignore autoplay errors

          gsap.to(meshes.paper1.position, {
            x: meshes.paper1.position.x + 0.2,
            duration: 1,
            ease: 'power1.out',
          });
        } else if (counter === 2) {

          paperSound.currentTime = 0;
          paperSound.play().catch(() => { });

          gsap.to(meshes.paper1.position, {
            x: meshes.paper1.position.x - 0.1,
            z: meshes.paper1.position.z + 0.1,
            duration: 1,
            ease: 'power1.out',
          });
        } else {

          paperSound.currentTime = 0;
          paperSound.play().catch(() => { });

          gsap.to(meshes.paper1.position, {
            x: 0,
            z: 0,
            duration: 1,
            ease: 'power1.out',
          });
          counter = 0;
        }
      })
      interactionManager.add(meshes.paper1);
    }

    if (meshes.paper2) {

      meshes.paper2.addEventListener('click', () => {
        counter++;
        if (counter === 1) {

          paperSound.currentTime = 0;
          paperSound.play().catch(() => { });

          gsap.to(meshes.paper2.position, {
            x: meshes.paper2.position.x + 0.2,
            duration: 1,
            ease: 'power1.out',
          });
        } else if (counter === 2) {

          paperSound.currentTime = 0;
          paperSound.play().catch(() => { });

          gsap.to(meshes.paper2.position, {
            x: meshes.paper2.position.x - 0.1,
            z: meshes.paper2.position.z + 0.1,
            duration: 1,
            ease: 'power1.out',
          });
        } else {

          paperSound.currentTime = 0;
          paperSound.play().catch(() => { });

          gsap.to(meshes.paper2.position, {
            x: 0,
            z: 0,
            duration: 1,
            ease: 'power1.out',
          });
          counter = 0;
        }
      })
      interactionManager.add(meshes.paper2);
    }

    /* ---------------------------- camera animation ---------------------------- */

    if (meshes.camera) {
      meshes.camera.addEventListener('click', () => {

        cameraSound.currentTime = 0;
        cameraSound.play().catch(() => { }); // ignore autoplay errors

      });
      interactionManager.add(meshes.camera);
    }

    /* ----------------------------- book animation ----------------------------- */

    meshes.book1.addEventListener('mouseover', (event) => {
      gsap.to(meshes.book1.position, {
        z: 0.2,
        duration: 1,
        ease: 'power1.out',
      });
    });
    meshes.book1.addEventListener('mouseout', (event) => {
      gsap.to(meshes.book1.position, {
        z: 0,
        duration: 1,
        ease: 'power1.out',
      });
    });

    meshes.book2.addEventListener('mouseover', (event) => {
      gsap.to(meshes.book2.position, {
        z: 0.2,
        duration: 1,
        ease: 'power1.out',
      });
    });
    meshes.book2.addEventListener('mouseout', (event) => {
      gsap.to(meshes.book2.position, {
        z: 0,
        duration: 1,
        ease: 'power1.out',
      });
    });

    meshes.book3.addEventListener('mouseover', (event) => {
      gsap.to(meshes.book3.position, {
        z: 0.2,
        duration: 1,
        ease: 'power1.out',
      });
    });
    meshes.book3.addEventListener('mouseout', (event) => {
      gsap.to(meshes.book3.position, {
        z: 0,
        duration: 1,
        ease: 'power1.out',
      });
    });

    meshes.book4.addEventListener('mouseover', (event) => {
      gsap.to(meshes.book4.position, {
        z: 0.2,
        duration: 1,
        ease: 'power1.out',
      });
    });
    meshes.book4.addEventListener('mouseout', (event) => {
      gsap.to(meshes.book4.position, {
        z: 0,
        duration: 1,
        ease: 'power1.out',
      });
    });

    meshes.book5.addEventListener('mouseover', (event) => {
      gsap.to(meshes.book5.position, {
        z: 0.2,
        duration: 1,
        ease: 'power1.out',
      });
    });
    meshes.book5.addEventListener('mouseout', (event) => {
      gsap.to(meshes.book5.position, {
        z: 0,
        duration: 1,
        ease: 'power1.out',
      });
    });

    meshes.book6.addEventListener('mouseover', (event) => {
      gsap.to(meshes.book6.position, {
        z: 0.2,
        duration: 1,
        ease: 'power1.out',
      });
    });
    meshes.book6.addEventListener('mouseout', (event) => {
      gsap.to(meshes.book6.position, {
        z: 0,
        duration: 1,
        ease: 'power1.out',
      });
    });

    interactionManager.add(meshes.book1);
    interactionManager.add(meshes.book2);
    interactionManager.add(meshes.book3);
    interactionManager.add(meshes.book4);
    interactionManager.add(meshes.book5);
    interactionManager.add(meshes.book6);
  }

  // in animate loop
  if (meshes.group) {
    groupAngle += 0.0003 * groupDirection
    meshes.group.rotation.y = groupAngle
    meshes.group.position.y = 0.5
    if (groupAngle >= Math.PI / 8) groupDirection = -1
    if (groupAngle <= -Math.PI / 8) groupDirection = 1
  }

  renderer.render(scene, camera);
}