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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x2D6A4F, 1.5, 12);
    pointLight.position.set(-3, 2, 3);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    // Add rim light for depth
    const rimLight = new THREE.DirectionalLight(0xD4AF37, 0.5);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);
    
    // Hemisphere light for natural ambiance
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x2D6A4F, 0.4);
    scene.add(hemisphereLight);

    // Cricket Ball - more realistic
    const ballGeometry = new THREE.SphereGeometry(0.4, 64, 64);
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B0000,
      roughness: 0.8,
      metalness: 0.05,
      bumpScale: 0.02,
    });
    
    // Add texture-like detail with displacement
    const positions = ballGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const noise = (Math.random() - 0.5) * 0.003;
      positions.setY(i, positions.getY(i) + noise);
    }
    ballGeometry.computeVertexNormals();
    
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(-2, 1, 0);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);

    // Ball seam - more prominent and realistic
    const seamPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, 0, 0),
      new THREE.Vector3(0.35, 0.15, 0.15),
      new THREE.Vector3(0.25, 0.25, 0.25),
      new THREE.Vector3(0, 0.35, 0.25),
      new THREE.Vector3(-0.25, 0.25, 0.25),
      new THREE.Vector3(-0.35, 0.15, 0.15),
      new THREE.Vector3(-0.4, 0, 0),
    ]);
    
    const seamGeometry = new THREE.TubeGeometry(seamPath, 64, 0.015, 8, false);
    const seamMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5DC,
      roughness: 0.7,
      metalness: 0,
    });
    const seam = new THREE.Mesh(seamGeometry, seamMaterial);
    seam.castShadow = true;
    ball.add(seam);
    
    // Add second seam on other side
    const seam2 = seam.clone();
    seam2.rotation.x = Math.PI;
    ball.add(seam2);

    // Cricket Bat - more realistic
    const batHandleGeometry = new THREE.CylinderGeometry(0.045, 0.055, 1.2, 16);
    const batHandleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x654321,
      roughness: 0.9,
      metalness: 0,
    });
    const batHandle = new THREE.Mesh(batHandleGeometry, batHandleMaterial);
    batHandle.castShadow = true;
    
    // Bat grip
    const gripGeometry = new THREE.CylinderGeometry(0.052, 0.052, 0.35, 16);
    const gripMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2C1810,
      roughness: 0.95,
    });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.y = 0.45;
    batHandle.add(grip);
    
    // Bat blade - more realistic shape
    const batBladeShape = new THREE.Shape();
    batBladeShape.moveTo(-0.075, 0);
    batBladeShape.lineTo(-0.075, -0.7);
    batBladeShape.quadraticCurveTo(-0.075, -0.85, -0.05, -0.85);
    batBladeShape.lineTo(0.05, -0.85);
    batBladeShape.quadraticCurveTo(0.075, -0.85, 0.075, -0.7);
    batBladeShape.lineTo(0.075, 0);
    batBladeShape.lineTo(-0.075, 0);
    
    const batBladeGeometry = new THREE.ExtrudeGeometry(batBladeShape, {
      depth: 0.065,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 3,
    });
    
    const batBladeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE8D4A0,
      roughness: 0.6,
      metalness: 0.05,
    });
    const batBlade = new THREE.Mesh(batBladeGeometry, batBladeMaterial);
    batBlade.position.set(-0.0325, -0.9, 0);
    batBlade.castShadow = true;
    batBlade.receiveShadow = true;
    
    // Sweet spot marking
    const sweetSpotGeometry = new THREE.BoxGeometry(0.14, 0.15, 0.001);
    const sweetSpotMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      opacity: 0.3,
      transparent: true,
    });
    const sweetSpot = new THREE.Mesh(sweetSpotGeometry, sweetSpotMaterial);
    sweetSpot.position.set(0, -0.5, 0.034);
    batBlade.add(sweetSpot);
    
    const bat = new THREE.Group();
    bat.add(batHandle);
    bat.add(batBlade);
    bat.position.set(2, 0, 0);
    bat.rotation.z = -Math.PI / 6;
    scene.add(bat);

    // Stumps - more realistic
    const stumpGeometry = new THREE.CylinderGeometry(0.018, 0.02, 1.05, 20);
    const stumpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFAF0,
      roughness: 0.7,
      metalness: 0,
    });
    
    // Add grove markings on stumps
    const stumps = [];
    for (let i = -1; i <= 1; i++) {
      const stump = new THREE.Mesh(stumpGeometry, stumpMaterial);
      stump.position.set(i * 0.085, -1.5, -1);
      stump.castShadow = true;
      stump.receiveShadow = true;
      scene.add(stump);
      stumps.push(stump);
      
      // Add groove lines
      for (let j = 0; j < 3; j++) {
        const grooveGeometry = new THREE.TorusGeometry(0.021, 0.002, 8, 32);
        const grooveMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
        const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);
        groove.rotation.x = Math.PI / 2;
        groove.position.y = -0.4 + j * 0.15;
        stump.add(groove);
      }
    }

    // Bails - more realistic
    const bailGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.13, 12);
    const bailMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE8C547,
      roughness: 0.4,
      metalness: 0.2,
    });
    
    // Bail ends (grooves)
    const bailEndGeometry = new THREE.SphereGeometry(0.015, 12, 12);
    
    const bail1 = new THREE.Mesh(bailGeometry, bailMaterial);
    bail1.rotation.z = Math.PI / 2;
    bail1.position.set(-0.043, -0.945, -1);
    bail1.castShadow = true;
    scene.add(bail1);
    
    const bail1End1 = new THREE.Mesh(bailEndGeometry, bailMaterial);
    bail1End1.position.x = -0.065;
    bail1.add(bail1End1);
    
    const bail1End2 = new THREE.Mesh(bailEndGeometry, bailMaterial);
    bail1End2.position.x = 0.065;
    bail1.add(bail1End2);
    
    const bail2 = new THREE.Mesh(bailGeometry, bailMaterial);
    bail2.rotation.z = Math.PI / 2;
    bail2.position.set(0.043, -0.945, -1);
    bail2.castShadow = true;
    scene.add(bail2);
    
    const bail2End1 = new THREE.Mesh(bailEndGeometry, bailMaterial);
    bail2End1.position.x = -0.065;
    bail2.add(bail2End1);
    
    const bail2End2 = new THREE.Mesh(bailEndGeometry, bailMaterial);
    bail2End2.position.x = 0.065;
    bail2.add(bail2End2);

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

      // Rotate ball with realistic spin
      ball.rotation.x += 0.015;
      ball.rotation.y += 0.025;
      ball.rotation.z += 0.008;
      
      // Ball trajectory - more natural motion
      const ballTime = time * 1.5;
      ball.position.y = 1 + Math.sin(ballTime) * 0.35;
      ball.position.x = -2 + Math.cos(ballTime * 0.5) * 0.15;
      ball.position.z = Math.sin(ballTime * 0.3) * 0.1;

      // Swing bat - smoother, more realistic motion
      const batSwing = Math.sin(time * 0.8);
      bat.rotation.z = -Math.PI / 6 + batSwing * 0.15;
      bat.rotation.x = Math.sin(time * 0.4) * 0.05;
      
      // Add slight bat movement
      bat.position.y = Math.sin(time * 0.5) * 0.08;

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