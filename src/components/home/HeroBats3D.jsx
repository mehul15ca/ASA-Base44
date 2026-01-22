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
      
      // Blade
      const bladeGeometry = new THREE.BoxGeometry(0.6, 2.5, 0.08);
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.1,
      });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.castShadow = true;
      blade.receiveShadow = true;
      group.add(blade);

      // Handle
      const handleGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.8, 16);
      const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x2D2D2D,
        roughness: 0.3,
        metalness: 0.2,
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.y = -1.5;
      handle.castShadow = true;
      handle.receiveShadow = true;
      group.add(handle);

      return group;
    };

    // Create Baseball Bat
    const createBaseballBat = () => {
      const group = new THREE.Group();
      
      // Barrel
      const barrelGeometry = new THREE.CylinderGeometry(0.12, 0.1, 2.8, 16);
      const barrelMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF6B35,
        roughness: 0.3,
        metalness: 0.4,
      });
      const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
      barrel.castShadow = true;
      barrel.receiveShadow = true;
      group.add(barrel);

      // Knob
      const knobGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const knobMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A,
        roughness: 0.2,
      });
      const knob = new THREE.Mesh(knobGeometry, knobMaterial);
      knob.position.y = -1.5;
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