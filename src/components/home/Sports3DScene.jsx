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

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    
    // Cricket Ball with real texture
    const ballGeometry = new THREE.SphereGeometry(0.4, 64, 64);
    const ballTexture = textureLoader.load(
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696e66398d7900c2acfeec9e/fc4c2a25a_pngtree-red-leather-cricket-ball-with-detailed-stitched-seam-traditional-sports-equipment-png-image_14001679.png'
    );
    
    const ballMaterial = new THREE.MeshStandardMaterial({
      map: ballTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(-2, 1, 0);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);

    // Cricket Bat with real texture
    const batTexture = textureLoader.load(
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696e66398d7900c2acfeec9e/8fd304c95_16-166521_png-image-of-cricket-bat-transparent-png.png'
    );
    
    // Create a plane to display the bat texture
    const batGeometry = new THREE.PlaneGeometry(0.35, 1.4);
    const batMaterial = new THREE.MeshStandardMaterial({
      map: batTexture,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.1,
    });
    
    const bat = new THREE.Mesh(batGeometry, batMaterial);
    bat.position.set(2, 0, 0);
    bat.rotation.z = -Math.PI / 6;
    bat.castShadow = true;
    bat.receiveShadow = true;
    scene.add(bat);

    // Stumps with real texture
    const stumpsTexture = textureLoader.load(
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696e66398d7900c2acfeec9e/d1aa9517b_clean_kookaburra-cricket-bails-4-set-q221-nat-d296e5e9-f391-4d66-8dd2-1bd36c73e3eb-jpgrendition.png'
    );
    
    // Create a plane to display stumps with bails
    const stumpsGeometry = new THREE.PlaneGeometry(1.2, 1.6);
    const stumpsMaterial = new THREE.MeshStandardMaterial({
      map: stumpsTexture,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0,
    });
    
    const stumps = new THREE.Mesh(stumpsGeometry, stumpsMaterial);
    stumps.position.set(0, -1.2, -1);
    stumps.castShadow = true;
    stumps.receiveShadow = true;
    scene.add(stumps);

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

    // Group all objects for rotation control
    const sceneGroup = new THREE.Group();
    sceneGroup.add(ball, bat, stumps);
    scene.add(sceneGroup);

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Interaction state
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let hoveredObject = null;
    const ballBaseY = 1;
    let ballBounceOffset = 0;

    // Mouse event handlers
    const handleMouseDown = (event) => {
      isDragging = true;
      previousMouseX = event.clientX;
    };

    const handleMouseMove = (event) => {
      // Update mouse for raycasting
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle drag rotation
      if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        targetRotationY += deltaX * 0.01;
        previousMouseX = event.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseLeave = () => {
      isDragging = false;
    };

    // Add event listeners
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation
    let time = 0;
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Smooth rotation interpolation
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      sceneGroup.rotation.y = currentRotationY;

      // Raycasting for hover detection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([ball, bat, stumps]);

      // Reset previous hover state
      if (hoveredObject && hoveredObject !== intersects[0]?.object) {
        if (hoveredObject === bat || hoveredObject === stumps) {
          hoveredObject.material.emissive.setHex(0x000000);
          hoveredObject.material.emissiveIntensity = 0;
        }
        hoveredObject = null;
      }

      // Apply hover effects
      if (intersects.length > 0) {
        const object = intersects[0].object;
        
        if (object === ball) {
          // Ball bounce on hover
          if (hoveredObject !== ball) {
            ballBounceOffset = 0.15;
          }
          hoveredObject = ball;
        } else if (object === bat || object === stumps) {
          // Highlight bat/stumps on hover
          if (hoveredObject !== object) {
            object.material.emissive.setHex(0xD4AF37);
            object.material.emissiveIntensity = 0.3;
            hoveredObject = object;
          }
        }
      }

      // Ball bounce decay
      if (ballBounceOffset > 0) {
        ballBounceOffset *= 0.92;
        if (ballBounceOffset < 0.01) ballBounceOffset = 0;
      }

      // Rotate ball with realistic spin (keep texture orientation visible)
      ball.rotation.y += 0.02;
      ball.rotation.x += 0.01;
      
      // Ball trajectory - more natural motion with bounce
      const ballTime = time * 1.5;
      ball.position.y = ballBaseY + Math.sin(ballTime) * 0.35 + ballBounceOffset;
      ball.position.x = -2 + Math.cos(ballTime * 0.5) * 0.15;
      ball.position.z = Math.sin(ballTime * 0.3) * 0.1;

      // Swing bat - smoother, more realistic motion (keeping it visible)
      const batSwing = Math.sin(time * 0.8);
      bat.rotation.z = -Math.PI / 6 + batSwing * 0.15;
      
      // Add slight bat movement
      bat.position.y = Math.sin(time * 0.5) * 0.08;
      
      // Subtle stumps sway (like wind effect)
      stumps.rotation.z = Math.sin(time * 0.3) * 0.01;
      stumps.position.y = -1.2 + Math.sin(time * 0.5) * 0.01;

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
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseup', handleMouseUp);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
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
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ zIndex: 0, pointerEvents: 'auto' }}
    />
  );
}