import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Sports3DScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x2D6A4F, 2, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Cricket Ball
    const ballGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc0000,
      roughness: 0.3,
      metalness: 0.1,
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(-2, 1, 0);
    scene.add(ball);

    // Ball seam
    const seamGeometry = new THREE.TorusGeometry(0.4, 0.02, 16, 100);
    const seamMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const seam = new THREE.Mesh(seamGeometry, seamMaterial);
    seam.rotation.x = Math.PI / 2;
    ball.add(seam);

    // Cricket Bat (simplified)
    const batHandleGeometry = new THREE.CylinderGeometry(0.05, 0.06, 1.2, 16);
    const batHandleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.6 
    });
    const batHandle = new THREE.Mesh(batHandleGeometry, batHandleMaterial);
    
    const batBladeGeometry = new THREE.BoxGeometry(0.15, 0.8, 0.06);
    const batBladeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xDEB887,
      roughness: 0.4 
    });
    const batBlade = new THREE.Mesh(batBladeGeometry, batBladeMaterial);
    batBlade.position.y = -0.9;
    
    const bat = new THREE.Group();
    bat.add(batHandle);
    bat.add(batBlade);
    bat.position.set(2, 0, 0);
    bat.rotation.z = -Math.PI / 6;
    scene.add(bat);

    // Stumps
    const stumpGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 16);
    const stumpMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    
    for (let i = -1; i <= 1; i++) {
      const stump = new THREE.Mesh(stumpGeometry, stumpMaterial);
      stump.position.set(i * 0.08, -1.5, -1);
      scene.add(stump);
    }

    // Bails
    const bailGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
    const bailMaterial = new THREE.MeshStandardMaterial({ color: 0xD4AF37 });
    const bail1 = new THREE.Mesh(bailGeometry, bailMaterial);
    bail1.rotation.z = Math.PI / 2;
    bail1.position.set(-0.04, -0.95, -1);
    scene.add(bail1);
    const bail2 = new THREE.Mesh(bailGeometry, bailMaterial);
    bail2.rotation.z = Math.PI / 2;
    bail2.position.set(0.04, -0.95, -1);
    scene.add(bail2);

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x2D6A4F,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate ball
      ball.rotation.x += 0.02;
      ball.rotation.z += 0.01;
      ball.position.y = 1 + Math.sin(time * 2) * 0.3;

      // Swing bat
      bat.rotation.z = -Math.PI / 6 + Math.sin(time) * 0.2;

      // Rotate particles
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}