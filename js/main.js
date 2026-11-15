/**
 * ABOUT GAUTHAM — SEN ZHENG CAMERA-ZOOM & 3D STICKER ENGINE
 * Exact implementation of:
 * 1. Procedural 3D Clay Avatar with 5 Face Stickers.
 * 2. Dynamic Scroll Camera Zoom onto each Face Sticker.
 * 3. Cursor Head Tracking & Gaze Following.
 * 4. Natural Blinking & Idle Breathing Physics.
 * 5. Interactive Click Reactions & Web Audio Synthesizer.
 */

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ==========================================================================
     1. THREE.JS SCENE SETUP
     ========================================================================== */
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);

  // Camera Target States (Matching Sen's lS camera points)
  const cameraStates = {
    'point-start': { pos: new THREE.Vector3(0, 0.15, 3.9), look: new THREE.Vector3(0, 0.1, 0) },
    'point-sctce': { pos: new THREE.Vector3(-0.65, 0.65, 1.75), look: new THREE.Vector3(-0.16, 0.35, 0.45) },
    'point-devcore': { pos: new THREE.Vector3(-1.15, 0.05, 1.7), look: new THREE.Vector3(-0.32, -0.06, 0.42) },
    'point-bunker': { pos: new THREE.Vector3(1.15, 0.05, 1.7), look: new THREE.Vector3(0.32, -0.06, 0.42) },
    'point-aws': { pos: new THREE.Vector3(0, 0.22, 1.35), look: new THREE.Vector3(0, 0.13, 0.52) },
    'point-roots': { pos: new THREE.Vector3(0.35, -0.32, 1.6), look: new THREE.Vector3(0.08, -0.22, 0.46) },
    'point-works': { pos: new THREE.Vector3(0, 0.75, 4.6), look: new THREE.Vector3(0, -0.3, 0) }
  };

  let currentTargetKey = 'point-start';
  let targetCamPos = cameraStates['point-start'].pos.clone();
  let targetCamLook = cameraStates['point-start'].look.clone();
  let currentCamLook = cameraStates['point-start'].look.clone();

  camera.position.copy(targetCamPos);
  camera.lookAt(currentCamLook);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  // LIGHTING (Clay Shading)
  const ambientLight = new THREE.AmbientLight(0xf4f1ea, 0.95);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xfff6e8, 1.35);
  keyLight.position.set(2.5, 3.5, 3);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xaad3c0, 0.75);
  fillLight.position.set(-3, 1, 2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffd9b3, 0.85);
  rimLight.position.set(0, 2, -3);
  scene.add(rimLight);

  // MATERIALS
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xdfb496,
    roughness: 0.62,
    metalness: 0.05
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x181a1d,
    roughness: 0.78,
    metalness: 0.08
  });

  const shirtMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a211e,
    roughness: 0.88,
    metalness: 0.02
  });

  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xfcfcfc });
  const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0a0c0e });

  // AVATAR HIERARCHY
  const avatarRoot = new THREE.Group();
  scene.add(avatarRoot);
  avatarRoot.position.set(0, -0.35, 0);

  // SHOULDERS / SHIRT
  const shirtGeo = new THREE.CylinderGeometry(0.85, 1.15, 1.2, 32);
  const shirt = new THREE.Mesh(shirtGeo, shirtMaterial);
  shirt.position.set(0, -0.85, 0);
  shirt.scale.set(1.1, 1, 0.65);
  avatarRoot.add(shirt);

  // NECK
  const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.5, 24);
  const neck = new THREE.Mesh(neckGeo, skinMaterial);
  neck.position.set(0, -0.3, 0);
  avatarRoot.add(neck);

  // HEAD GROUP (Rotates with Cursor)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.15, 0);
  avatarRoot.add(headGroup);

  // HEAD MESH
  const headGeo = new THREE.SphereGeometry(0.55, 32, 32);
  headGeo.scale(0.95, 1.15, 1.0);
  const head = new THREE.Mesh(headGeo, skinMaterial);
  headGroup.add(head);

  // NOSE
  const noseGeo = new THREE.ConeGeometry(0.08, 0.22, 16);
  noseGeo.rotateX(Math.PI / 2);
  const nose = new THREE.Mesh(noseGeo, skinMaterial);
  nose.position.set(0, 0.04, 0.55);
  headGroup.add(nose);

  // EARS
  const earGeo = new THREE.SphereGeometry(0.14, 16, 16);
  earGeo.scale(0.4, 0.9, 0.7);

  const earLeft = new THREE.Mesh(earGeo, skinMaterial);
  earLeft.position.set(-0.52, 0.05, 0);
  earLeft.rotation.y = -0.25;
  headGroup.add(earLeft);

  const earRight = new THREE.Mesh(earGeo, skinMaterial);
  earRight.position.set(0.52, 0.05, 0);
  earRight.rotation.y = 0.25;
  headGroup.add(earRight);

  // STYLIZED HAIR (Sen-style wavy bangs)
  const hairGroup = new THREE.Group();
  headGroup.add(hairGroup);

  const hairMainGeo = new THREE.SphereGeometry(0.58, 24, 24);
  hairMainGeo.scale(1.02, 1.12, 1.06);
  const hairMain = new THREE.Mesh(hairMainGeo, hairMaterial);
  hairMain.position.set(0, 0.12, -0.06);
  hairGroup.add(hairMain);

  for (let i = -3; i <= 3; i++) {
    const strandGeo = new THREE.ConeGeometry(0.12, 0.35, 12);
    strandGeo.rotateX(-Math.PI * 0.7);
    const strand = new THREE.Mesh(strandGeo, hairMaterial);
    strand.position.set(i * 0.11, 0.52, 0.42);
    strand.rotation.z = i * -0.08;
    hairGroup.add(strand);
  }

  // EYES & EYELIDS
  const eyesGroup = new THREE.Group();
  headGroup.add(eyesGroup);

  function createEye(posX) {
    const eyeSocket = new THREE.Group();
    eyeSocket.position.set(posX, 0.12, 0.46);

    const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), eyeWhiteMaterial);
    eyeSocket.add(eyeball);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 16), pupilMaterial);
    pupil.position.set(0, 0, 0.08);
    eyeSocket.add(pupil);

    const lidGeo = new THREE.SphereGeometry(0.116, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const upperLid = new THREE.Mesh(lidGeo, skinMaterial);
    upperLid.position.set(0, 0.01, 0);
    upperLid.rotation.x = -Math.PI / 2;
    eyeSocket.add(upperLid);

    eyesGroup.add(eyeSocket);
    return { socket: eyeSocket, pupil: pupil, lid: upperLid };
  }

  const leftEye = createEye(-0.21);
  const rightEye = createEye(0.21);

  // MOUTH
  const mouthGeo = new THREE.TorusGeometry(0.13, 0.022, 12, 24, Math.PI * 0.75);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x5a2d24 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -0.22, 0.48);
  mouth.rotation.x = Math.PI * 0.95;
  headGroup.add(mouth);

  // ==========================================================================
  // THE 5 FACE STICKERS (Matching the 5 Timeline Milestones)
  // ==========================================================================
  function createStickerTexture(text, bgColor, textColor, borderColor = null) {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 256;
    sCanvas.height = 128;
    const sCtx = sCanvas.getContext('2d');

    sCtx.fillStyle = bgColor;
    sCtx.beginPath();
    sCtx.roundRect(8, 8, 240, 112, 28);
    sCtx.fill();

    if (borderColor) {
      sCtx.strokeStyle = borderColor;
      sCtx.lineWidth = 10;
      sCtx.stroke();
    }

    sCtx.fillStyle = textColor;
    sCtx.font = 'bold 42px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.textBaseline = 'middle';
    sCtx.fillText(text, 128, 64);

    return new THREE.CanvasTexture(sCanvas);
  }

  // 1. SCTCE '28 on Forehead / Temple
  const sctStickerMat = new THREE.MeshBasicMaterial({
    map: createStickerTexture("SCTCE '28", '#ffffff', '#0a5c36', '#0a5c36'),
    transparent: true
  });
  const sctSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.12), sctStickerMat);
  sctSticker.position.set(-0.22, 0.38, 0.45);
  sctSticker.rotation.x = -0.32;
  sctSticker.rotation.z = 0.12;
  headGroup.add(sctSticker);

  // 2. DEVCORE on Left Cheek
  const devcoreStickerMat = new THREE.MeshBasicMaterial({
    map: createStickerTexture('DEVCORE', '#18181b', '#38bdf8', '#38bdf8'),
    transparent: true
  });
  const devcoreSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.11), devcoreStickerMat);
  devcoreSticker.position.set(-0.33, -0.05, 0.43);
  devcoreSticker.rotation.y = -0.65;
  devcoreSticker.rotation.z = 0.15;
  headGroup.add(devcoreSticker);

  // 3. COLLEGE BUNKER on Right Cheek
  const bunkerStickerMat = new THREE.MeshBasicMaterial({
    map: createStickerTexture('BUNKER', '#fdf2f8', '#db2777', '#db2777'),
    transparent: true
  });
  const bunkerSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.11), bunkerStickerMat);
  bunkerSticker.position.set(0.33, -0.05, 0.43);
  bunkerSticker.rotation.y = 0.65;
  bunkerSticker.rotation.z = -0.15;
  headGroup.add(bunkerSticker);

  // 4. AWS BUILDER on Bridge of Nose
  const awsStickerMat = new THREE.MeshBasicMaterial({
    map: createStickerTexture('AWS', '#ff9900', '#232f3e', '#ffffff'),
    transparent: true
  });
  const awsSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.12), awsStickerMat);
  awsSticker.position.set(0, 0.13, 0.54);
  awsSticker.rotation.x = -0.15;
  awsSticker.rotation.z = -0.05;
  headGroup.add(awsSticker);

  // 5. ❤️ KL on Chin / Jaw
  const klStickerMat = new THREE.MeshBasicMaterial({
    map: createStickerTexture('❤️ KL', '#fee2e2', '#dc2626'),
    transparent: true
  });
  const klSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.20, 0.10), klStickerMat);
  klSticker.position.set(0.12, -0.22, 0.49);
  klSticker.rotation.x = 0.25;
  klSticker.rotation.z = -0.08;
  headGroup.add(klSticker);

  // ==========================================================================
  // SCROLL-DRIVEN CAMERA ZOOM SYSTEM (Exact Sen Experience)
  // ==========================================================================
  const tlEntries = document.querySelectorAll('.tl-entry');
  const worksSection = document.getElementById('works');

  function calculateActiveCameraTarget() {
    const scrollY = window.scrollY;
    const viewHeight = window.innerHeight;

    // Check if scrolled into Works or beyond
    if (worksSection) {
      const worksRect = worksSection.getBoundingClientRect();
      if (worksRect.top <= viewHeight * 0.5) {
        setTargetState('point-works');
        tlEntries.forEach(e => e.classList.remove('is-active'));
        return;
      }
    }

    // Check if in Hero
    if (scrollY < viewHeight * 0.35) {
      setTargetState('point-start');
      tlEntries.forEach(e => e.classList.remove('is-active'));
      return;
    }

    // Check each Timeline Entry
    let foundEntry = false;
    tlEntries.forEach((entry) => {
      const rect = entry.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;

      // When the card is within the center focus window of the screen
      if (cardCenter >= viewHeight * 0.15 && cardCenter <= viewHeight * 0.85) {
        const pointKey = entry.getAttribute('data-point');
        if (cameraStates[pointKey]) {
          setTargetState(pointKey);
          entry.classList.add('is-active');
          foundEntry = true;
        }
      } else {
        entry.classList.remove('is-active');
      }
    });

    if (!foundEntry && scrollY < viewHeight * 0.8) {
      setTargetState('point-start');
    }
  }

  function setTargetState(key) {
    if (currentTargetKey !== key) {
      currentTargetKey = key;
      targetCamPos = cameraStates[key].pos.clone();
      targetCamLook = cameraStates[key].look.clone();
      playUiSound(480, 0.04, 'sine');
    }
  }

  window.addEventListener('scroll', calculateActiveCameraTarget, { passive: true });
  calculateActiveCameraTarget();

  // ==========================================================================
  // CURSOR TRACKING, BLINKING & ANIMATION LOOP
  // ==========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let clickReaction = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;

    // Only apply cursor tracking when in overview (point-start) or gentle sway in zoom
    const isZoomed = currentTargetKey !== 'point-start' && currentTargetKey !== 'point-works';
    const factor = isZoomed ? 0.15 : 0.55;

    targetRotY = mouseX * factor;
    targetRotX = -mouseY * (factor * 0.6);
  }, { passive: true });

  // Click on avatar reaction
  window.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .tl-glass-card, .work-category-card')) return;
    clickReaction = 1.0;
    playUiSound(720, 0.06, 'triangle');
  });

  // Natural Blinking
  let isBlinking = false;
  let nextBlinkTime = 2000;

  function triggerBlink() {
    isBlinking = true;
    setTimeout(() => {
      isBlinking = false;
      nextBlinkTime = Date.now() + 2500 + Math.random() * 3200;
    }, 140);
  }

  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();

    // Blink Check
    if (Date.now() > nextBlinkTime && !isBlinking) {
      triggerBlink();
    }
    const targetLidRot = isBlinking ? 0 : -Math.PI / 2;
    leftEye.lid.rotation.x += (targetLidRot - leftEye.lid.rotation.x) * 0.35;
    rightEye.lid.rotation.x += (targetLidRot - rightEye.lid.rotation.x) * 0.35;

    // Smooth Camera Interpolation (Camera zooms and flies smoothly between stickers!)
    camera.position.lerp(targetCamPos, 0.065);
    currentCamLook.lerp(targetCamLook, 0.065);
    camera.lookAt(currentCamLook);

    // Smooth Head Rotation Lerp
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentRotX += (targetRotX - currentRotX) * 0.08;

    // Click Reaction Decay
    clickReaction *= 0.88;
    const reactionOffset = Math.sin(clickReaction * Math.PI * 4) * 0.12 * clickReaction;

    headGroup.rotation.y = currentRotY;
    headGroup.rotation.x = currentRotX + (clickReaction * -0.15);
    headGroup.rotation.z = reactionOffset;

    // Eye Pupil Gaze
    leftEye.pupil.position.x = mouseX * 0.035;
    leftEye.pupil.position.y = -mouseY * 0.035;
    rightEye.pupil.position.x = mouseX * 0.035;
    rightEye.pupil.position.y = -mouseY * 0.035;

    // Idle Breathing
    avatarRoot.position.y = -0.35 + Math.sin(elapsed * 2.2) * 0.02;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ==========================================================================
     2. WEB AUDIO SYNTHESIZER
     ========================================================================== */
  let audioContext = null;
  let soundEnabled = false;

  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playUiSound(freq = 600, duration = 0.04, type = 'sine') {
    if (!soundEnabled || !audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioContext.currentTime + duration);

      gain.gain.setValueAtTime(0.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  }

  const audioToggle = document.getElementById('audio-toggle');
  const audioLabel = document.getElementById('audio-label');

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      initAudioContext();
      soundEnabled = !soundEnabled;
      if (audioLabel) audioLabel.textContent = soundEnabled ? 'Sound ON' : 'Sound OFF';
      playUiSound(1100, 0.06, 'triangle');
    });
  }

});
