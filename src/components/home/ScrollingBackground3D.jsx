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

    // Helper functions to create different sports balls
    const createCricketBall = (radius) => {
      const group = new THREE.Group();
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0xA41E1E,
        roughness: 0.4,
        metalness: 0.1,
      });
      const ball = new THREE.Mesh(geometry, material);
      group.add(ball);
      
      // Add seam
      const seamGeometry = new THREE.TorusGeometry(radius * 0.95, radius * 0.03, 8, 32);
      const seamMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.6,
      });
      const seam = new THREE.Mesh(seamGeometry, seamMaterial);
      seam.position.z = radius * 0.02;
      group.add(seam);
      
      return group;
    };

    const createBasketball = (radius) => {
      const group = new THREE.Group();
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0xFF6B2B,
        roughness: 0.5,
        metalness: 0.05,
      });
      const ball = new THREE.Mesh(geometry, material);
      group.add(ball);
      
      // Add black lines
      for (let i = 0; i < 3; i++) {
        const lineGeometry = new THREE.TorusGeometry(radius * 0.98, radius * 0.02, 8, 32);
        const lineMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
          roughness: 0.7,
        });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.rotation.x = (Math.PI / 3) * i;
        group.add(line);
      }
      
      return group;
    };

    const createFootball = (radius) => {
      const group = new THREE.Group();
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0.05,
      });
      const ball = new THREE.Mesh(geometry, material);
      group.add(ball);
      
      // Add black pentagons pattern
      const hexGeometry = new THREE.CircleGeometry(radius * 0.2, 5);
      const hexMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.5,
      });
      
      for (let i = 0; i < 6; i++) {
        const hex = new THREE.Mesh(hexGeometry, hexMaterial);
        const angle = (Math.PI * 2 * i) / 6;
        hex.position.set(
          Math.cos(angle) * radius * 0.7,
          Math.sin(angle) * radius * 0.7,
          radius * 0.7
        );
        hex.lookAt(0, 0, 0);
        group.add(hex);
      }
      
      return group;
    };

    const createTennisBall = (radius) => {
      const group = new THREE.Group();
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0xCCFF00,
        roughness: 0.6,
        metalness: 0,
      });
      const ball = new THREE.Mesh(geometry, material);
      group.add(ball);
      
      // Add curved line pattern
      const lineGeometry = new THREE.TorusGeometry(radius * 0.85, radius * 0.025, 8, 32, Math.PI);
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.7,
      });
      const line1 = new THREE.Mesh(lineGeometry, lineMaterial);
      line1.rotation.y = Math.PI / 2;
      group.add(line1);
      
      const line2 = new THREE.Mesh(lineGeometry, lineMaterial);
      line2.rotation.y = -Math.PI / 2;
      line2.rotation.z = Math.PI;
      group.add(line2);
      
      return group;
    };

    // Create floating sports balls
    const balls = [];
    const ballCount = 20;
    const ballCreators = [createCricketBall, createBasketball, createFootball, createTennisBall];

    for (let i = 0; i < ballCount; i++) {
      const radius = 0.3 + Math.random() * 0.3;
      const ballType = Math.floor(Math.random() * ballCreators.length);
      const ball = ballCreators[ballType](radius);
      
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
    let lastScrollY = 0;
    let scrollDirection = 0;
    let time = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      scrollDirection = scrollY > lastScrollY ? 1 : -1; // 1 = down, -1 = up
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Move camera based on scroll
      camera.position.y = -(scrollY * 0.003);

      // Animate balls with scroll-based falling/throwing effect
      balls.forEach((ball) => {
        // Base falling effect
        const scrollBoost = scrollDirection * 0.005;
        ball.position.y -= ball.userData.speedY + scrollBoost;
        ball.position.x += ball.userData.speedX;
        ball.rotation.x += 0.01 + Math.abs(scrollBoost) * 2;
        ball.rotation.y += 0.01 + Math.abs(scrollBoost) * 2;

        // Reset when ball falls too low (scrolling down)
        if (ball.position.y < -10 + camera.position.y) {
          ball.position.y = 10 + camera.position.y;
          ball.position.x = (Math.random() - 0.5) * 15;
          ball.position.z = (Math.random() - 0.5) * 8;
        }
        
        // Reset when ball goes too high (scrolling up)
        if (ball.position.y > 10 + camera.position.y) {
          ball.position.y = -10 + camera.position.y;
          ball.position.x = (Math.random() - 0.5) * 15;
          ball.position.z = (Math.random() - 0.5) * 8;
        }
      });

      // Animate particles with scroll-based effect
      const positions = particles.geometry.attributes.position.array;
      const velocities = particles.geometry.attributes.velocity.array;
      const scrollParticleBoost = scrollDirection * 0.02;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1] + scrollParticleBoost;
        positions[i + 2] += velocities[i + 2];

        // Reset particles that fall too low
        if (positions[i + 1] < -15 + camera.position.y) {
          positions[i + 1] = 15 + camera.position.y;
          positions[i] = (Math.random() - 0.5) * 30;
          positions[i + 2] = (Math.random() - 0.5) * 15;
        }
        
        // Reset particles that go too high
        if (positions[i + 1] > 15 + camera.position.y) {
          positions[i + 1] = -15 + camera.position.y;
          positions[i] = (Math.random() - 0.5) * 30;
          positions[i + 2] = (Math.random() - 0.5) * 15;
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