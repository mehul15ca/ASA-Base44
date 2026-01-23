import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ScrollingBackground3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating balls
    const balls = [];
    const ballCount = 20;

    for (let i = 0; i < ballCount; i++) {
      const geometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.4, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: [0xA41E1E, 0xFFFFFF, 0x4CAF50, 0xD4AF37][Math.floor(Math.random() * 4)],
        roughness: 0.3,
        metalness: 0.2,
        emissive: [0xA41E1E, 0xFFFFFF, 0x4CAF50, 0xD4AF37][Math.floor(Math.random() * 4)],
        emissiveIntensity: 0.3,
      });
      const ball = new THREE.Mesh(geometry, material);
      
      ball.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() * 20) - 10,
        (Math.random() - 0.5) * 8
      );
      
      ball.userData = {
        speedY: 0.01 + Math.random() * 0.015,
        speedX: (Math.random() - 0.5) * 0.003,
        initialY: ball.position.y,
      };
      
      ball.castShadow = true;
      scene.add(ball);
      balls.push(ball);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() * 30) - 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;

      velocities[i] = (Math.random() - 0.5) * 0.015;
      velocities[i + 1] = -0.02 - Math.random() * 0.03; // Falling effect
      velocities[i + 2] = (Math.random() - 0.5) * 0.015;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation
    let scrollY = 0;
    let time = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Move camera based on scroll
      camera.position.y = -(scrollY * 0.002);

      // Animate balls with falling effect
      balls.forEach((ball) => {
        ball.position.y -= ball.userData.speedY;
        ball.position.x += ball.userData.speedX;
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;

        // Reset when ball falls too low
        if (ball.position.y < -6 + camera.position.y) {
          ball.position.y = 6 + camera.position.y;
          ball.position.x = (Math.random() - 0.5) * 10;
        }
      });

      // Animate particles with falling effect
      const positions = particles.geometry.attributes.position.array;
      const velocities = particles.geometry.attributes.velocity.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Reset particles that fall too low
        if (positions[i + 1] < -10 + camera.position.y) {
          positions[i + 1] = 10 + camera.position.y;
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 2] = (Math.random() - 0.5) * 10;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}