// @ts-nocheck
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hyperspeed.css';

export default function Hyperspeed() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const container = containerRef.current;
    let scene, camera, renderer, composer;
    let animationId;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create hyperspeed effect with lines
    const lineCount = 200;
    const lines = [];

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);

      const angle = (i / lineCount) * Math.PI * 2;
      const radius = Math.random() * 8 + 2;
      const z = Math.random() * -20 - 5;

      positions[0] = Math.cos(angle) * radius;
      positions[1] = Math.sin(angle) * radius;
      positions[2] = z;

      const endRadius = radius * 1.2;
      positions[3] = Math.cos(angle) * endRadius;
      positions[4] = Math.sin(angle) * endRadius;
      positions[5] = z - 5;

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: 0x5227ff,
        transparent: true,
        opacity: 0.7,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push({ line, speed: 0.5 + Math.random() * 0.5 });
    }

    // Animation
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const baseSpeed = 0.12;

      lines.forEach(({ line, speed }) => {
        const positions = line.geometry.attributes.position;
        if (!positions) return;

        const moveSpeed = baseSpeed * speed;

        positions.array[2] += moveSpeed;
        positions.array[5] += moveSpeed;

        if (positions.array[2] > 5) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 8 + 2;
          const z = -25;

          positions.array[0] = Math.cos(angle) * radius;
          positions.array[1] = Math.sin(angle) * radius;
          positions.array[2] = z;

          const endRadius = radius * 1.2;
          positions.array[3] = Math.cos(angle) * endRadius;
          positions.array[4] = Math.sin(angle) * endRadius;
          positions.array[5] = z - 5;

          positions.needsUpdate = true;
        } else {
          positions.needsUpdate = true;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      lines.forEach(({ line }) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div id="lights" ref={containerRef} className="w-full h-full" />;
}
