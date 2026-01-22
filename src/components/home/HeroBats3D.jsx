import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBats3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const batsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(0x000000, 10, 20);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x40916C, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create Cricket Bat
    const createCricketBat = () => {
      const group = new THREE.Group();
      
      // Main blade with proper thickness gradient
      const bladeGeometry = new THREE.BoxGeometry(0.7, 2.8, 0.12);
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0xC19A6B,
        roughness: 0.6,
        metalness: 0.0,
        map: createWoodTexture(),
      });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.castShadow = true;
      blade.receiveShadow = true;
      blade.position.y = 0.5;
      group.add(blade);

      // Toe (bottom part of blade)
      const toeGeometry = new THREE.BoxGeometry(0.7, 0.3, 0.12);
      const toeMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B6914,
        roughness: 0.7,
        metalness: 0.0,
      });
      const toe = new THREE.Mesh(toeGeometry, toeMaterial);
      toe.position.y = -1.45;
      toe.castShadow = true;
      toe.receiveShadow = true;
      group.add(toe);

      // Handle (grip)
      const handleGeometry = new THREE.CylinderGeometry(0.095, 0.075, 0.9, 16);
      const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.5,
        metalness: 0.1,
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.y = -1.6;
      handle.castShadow = true;
      handle.receiveShadow = true;
      group.add(handle);

      // Handle grip texture
      const gripGeometry = new THREE.CylinderGeometry(0.098, 0.078, 0.85, 16);
      const gripMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8,
        metalness: 0.0,
      });
      const grip = new THREE.Mesh(gripGeometry, gripMaterial);
      grip.position.y = -1.6;
      grip.position.z = 0.01;
      group.add(grip);

      // Pommel (end of handle)
      const pommelGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const pommelMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.4,
      });
      const pommel = new THREE.Mesh(pommelGeometry, pommelMaterial);
      pommel.position.y = -2.1;
      pommel.castShadow = true;
      pommel.receiveShadow = true;
      group.add(pommel);

      return group;
    };

    // Create Baseball Bat
    const createBaseballBat = () => {
      const group = new THREE.Group();
      
      // Barrel (tapered cylinder using lathe)
      const points = [];
      for (let i = 0; i <= 20; i++) {
        const radius = 0.125 - (i / 20) * 0.035;
        points.push(new THREE.Vector2(radius, (i / 20) * 2.8 - 1.4));
      }
      const barrelGeometry = new THREE.LatheGeometry(points, 32);
      const barrelMaterial = new THREE.MeshStandardMaterial({
        color: 0xE84C3D,
        roughness: 0.35,
        metalness: 0.6,
        map: createMetalTexture(),
      });
      const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
      barrel.castShadow = true;
      barrel.receiveShadow = true;
      barrel.scale.set(1, 1, 1);
      group.add(barrel);

      // Barrel seams (horizontal lines for realism)
      for (let i = 0; i < 3; i++) {
        const seamGeometry = new THREE.TorusGeometry(0.127, 0.002, 8, 32);
        const seamMaterial = new THREE.MeshStandardMaterial({
          color: 0x8B3A2B,
          roughness: 0.6,
          metalness: 0.3,
        });
        const seam = new THREE.Mesh(seamGeometry, seamMaterial);
        seam.position.y = -0.9 + i * 0.9;
        seam.rotation.x = Math.PI / 2;
        group.add(seam);
      }

      // Taper section (handle)
      const taperPoints = [];
      for (let i = 0; i <= 10; i++) {
        const radius = 0.09 - (i / 10) * 0.04;
        taperPoints.push(new THREE.Vector2(radius, (i / 10) * 0.7 - 1.4));
      }
      const taperGeometry = new THREE.LatheGeometry(taperPoints, 32);
      const taperMaterial = new THREE.MeshStandardMaterial({
        color: 0xC0392B,
        roughness: 0.4,
        metalness: 0.5,
      });
      const taper = new THREE.Mesh(taperGeometry, taperMaterial);
      taper.position.y = -1.05;
      taper.castShadow = true;
      taper.receiveShadow = true;
      group.add(taper);

      // Handle grip
      const handleGeometry = new THREE.CylinderGeometry(0.055, 0.05, 0.6, 32);
      const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A,
        roughness: 0.7,
        metalness: 0.0,
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.y = -1.5;
      handle.castShadow = true;
      handle.receiveShadow = true;
      group.add(handle);

      // Knob
      const knobGeometry = new THREE.SphereGeometry(0.065, 32, 32);
      const knobMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.5,
        metalness: 0.2,
      });
      const knob = new THREE.Mesh(knobGeometry, knobMaterial);
      knob.position.y = -1.8;
      knob.castShadow = true;
      knob.receiveShadow = true;
      group.add(knob);

      return group;
    };

    // Add bats to scene
    const cricketBat = createCricketBat();
    cricketBat.position.set(-2, 0.5, 0);
    cricketBat.rotation.z = Math.PI / 6;
    scene.add(cricketBat);
    batsRef.current.push({ mesh: cricketBat, type: 'cricket' });

    const baseballBat = createBaseballBat();
    baseballBat.position.set(2, -0.3, 0);
    baseballBat.rotation.z = -Math.PI / 5;
    scene.add(baseballBat);
    batsRef.current.push({ mesh: baseballBat, type: 'baseball' });

    // Animation loop
    let animationFrameId;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.004;

      // Cricket bat - slow rotating swing motion
      if (batsRef.current[0]) {
        const cricketBatMesh = batsRef.current[0].mesh;
        cricketBatMesh.rotation.z = Math.PI / 6 + Math.sin(time * 0.5) * 0.4;
        cricketBatMesh.position.x = -2 + Math.sin(time * 0.3) * 0.3;
        cricketBatMesh.position.y = 0.5 + Math.cos(time * 0.4) * 0.2;
      }

      // Baseball bat - slower rotating motion with different phase
      if (batsRef.current[1]) {
        const baseballBatMesh = batsRef.current[1].mesh;
        baseballBatMesh.rotation.z = -Math.PI / 5 + Math.sin(time * 0.35 + Math.PI) * 0.35;
        baseballBatMesh.position.x = 2 + Math.sin(time * 0.25 + Math.PI) * 0.3;
        baseballBatMesh.position.y = -0.3 + Math.cos(time * 0.3 + Math.PI) * 0.2;
      }

      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.position.y = Math.cos(time * 0.08) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

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
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}