import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function HeroBats3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const ballsRef = useRef([]);
  const loaderRef = useRef(new GLTFLoader());
  const controlsRef = useRef({ isDragging: false, previousMousePosition: { x: 0, y: 0 }, rotation: { x: 0, y: 0 }, zoom: 1 });
  const groupRef = useRef(null);
  const hoveredBallRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - optimized for realistic appearance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 12, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(-8, 8, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x87CEEB, 0.3);
    fillLight.position.set(-5, 3, 8);
    scene.add(fillLight);

    // Texture creation functions
    function createWoodTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      // Wood grain background
      ctx.fillStyle = '#C19A6B';
      ctx.fillRect(0, 0, 256, 256);
      
      // Add wood grain lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 256; i += 3) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.quadraticCurveTo(i + 10, 128, i, 256);
        ctx.stroke();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.repeat.set(2, 4);
      return texture;
    }

    function createMetalTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      // Metal surface with slight variation
      for (let i = 0; i < 256; i++) {
        for (let j = 0; j < 256; j++) {
          const noise = Math.random() * 15;
          const value = 200 + noise;
          const hex = Math.floor(value).toString(16);
          ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
          ctx.fillRect(i, j, 1, 1);
        }
      }
      
      return new THREE.CanvasTexture(canvas);
    }

    // Create cricket ball
    const createCricketBall = () => {
      const geometry = new THREE.SphereGeometry(0.5, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        color: 0xA41E1E,
        roughness: 0.3,
        metalness: 0.1,
        envMapIntensity: 0.8,
      });
      const ball = new THREE.Mesh(geometry, material);
      ball.castShadow = true;
      ball.receiveShadow = true;
      
      // Add seam details
      const seamGeometry = new THREE.TorusGeometry(0.48, 0.015, 8, 32);
      const seamMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.5,
      });
      const seam = new THREE.Mesh(seamGeometry, seamMaterial);
      seam.position.z = 0.01;
      ball.add(seam);
      
      ball.userData = { type: 'cricket', baseScale: 1 };
      return ball;
    };

    // Create baseball
    const createBaseball = () => {
      const geometry = new THREE.SphereGeometry(0.45, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0.05,
      });
      const ball = new THREE.Mesh(geometry, material);
      ball.castShadow = true;
      ball.receiveShadow = true;
      
      // Add red stitching
      const stitchGeometry = new THREE.TorusGeometry(0.42, 0.012, 8, 32);
      const stitchMaterial = new THREE.MeshStandardMaterial({
        color: 0xCC0000,
        roughness: 0.6,
      });
      const stitch = new THREE.Mesh(stitchGeometry, stitchMaterial);
      stitch.position.z = 0.01;
      ball.add(stitch);
      
      ball.userData = { type: 'baseball', baseScale: 1 };
      return ball;
    };

    // Create yoga ball
    const createYogaBall = () => {
      const geometry = new THREE.SphereGeometry(0.55, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        color: 0x4CAF50,
        roughness: 0.5,
        metalness: 0,
      });
      const ball = new THREE.Mesh(geometry, material);
      ball.castShadow = true;
      ball.receiveShadow = true;
      ball.userData = { type: 'yoga', baseScale: 1 };
      return ball;
    };




    // Create group to hold all balls
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Add balls to scene
    const cricketBall = createCricketBall();
    cricketBall.position.set(-1.2, 0, 0);
    group.add(cricketBall);
    ballsRef.current.push(cricketBall);

    const baseball = createBaseball();
    baseball.position.set(0, 0.8, 0);
    group.add(baseball);
    ballsRef.current.push(baseball);

    const yogaBall = createYogaBall();
    yogaBall.position.set(1.2, 0, 0);
    group.add(yogaBall);
    ballsRef.current.push(yogaBall);

    // Mouse event listeners for rotation and zoom
    const onMouseDown = (e) => {
      controlsRef.current.isDragging = true;
      controlsRef.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!controlsRef.current.isDragging) return;

      const deltaX = e.clientX - controlsRef.current.previousMousePosition.x;
      const deltaY = e.clientY - controlsRef.current.previousMousePosition.y;

      controlsRef.current.rotation.y += deltaX * 0.005;
      controlsRef.current.rotation.x += deltaY * 0.005;

      group.rotation.y = controlsRef.current.rotation.y;
      group.rotation.x = controlsRef.current.rotation.x;

      controlsRef.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      controlsRef.current.isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const zoomSpeed = 0.1;
      controlsRef.current.zoom += e.deltaY > 0 ? zoomSpeed : -zoomSpeed;
      controlsRef.current.zoom = Math.max(0.5, Math.min(3, controlsRef.current.zoom));
      camera.position.z = 4 * controlsRef.current.zoom;
    };

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove_Hover = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(ballsRef.current);

      ballsRef.current.forEach(ball => {
        if (intersects.length > 0 && intersects[0].object === ball) {
          hoveredBallRef.current = ball;
          ball.userData.isHovered = true;
        } else {
          ball.userData.isHovered = false;
        }
      });
    };

    // Animation loop
    let animationFrameId;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.004;

      // Rotate group continuously
      if (!controlsRef.current.isDragging) {
        group.rotation.y += 0.001;
        controlsRef.current.rotation.y = group.rotation.y;
      }

      // Animate hovered balls with scale and glow
      ballsRef.current.forEach(ball => {
        if (ball.userData.isHovered) {
          ball.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
          ball.material.emissive.lerp(new THREE.Color(0x4CAF50), 0.1);
        } else {
          ball.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          ball.material.emissive.lerp(new THREE.Color(0x000000), 0.1);
        }

        // Slight bob animation
        ball.position.y += Math.sin(time * 2 + ball.position.x) * 0.0008;
      });

      renderer.render(scene, camera);
    };

    animate();

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('mousemove', onMouseMove_Hover);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('mousemove', onMouseMove_Hover);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}