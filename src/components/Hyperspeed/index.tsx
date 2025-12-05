import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hyperspeed.css";

type HyperspeedProps = {
  effectOptions?: any;
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
};

export const hyperspeedPresets = {
  one: {
    speed: 0.5,
    density: 0.5,
    color: "#ffffff",
    opacity: 0.8,
  },
  split: {
    speed: 0.8,
    density: 0.6,
    color: "#5227FF",
    opacity: 0.7,
    split: true,
  },
  fast: {
    speed: 1.2,
    density: 0.8,
    color: "#FF9FFC",
    opacity: 0.9,
  },
};

const defaultEffectOptions = hyperspeedPresets.split;

export default function Hyperspeed({
  effectOptions,
  onSpeedUp,
  onSlowDown,
}: HyperspeedProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const linesRef = useRef<THREE.Line[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;

    const options = { ...defaultEffectOptions, ...(effectOptions || {}) };

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create hyperspeed tunnel effect
    const lineCount = Math.floor(200 * (options.density || 0.6));
    const lines: THREE.Line[] = [];
    const lineSpeeds: number[] = [];

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);

      // Create tunnel effect - lines radiating from center
      const angle = (i / lineCount) * Math.PI * 2;
      const radius = Math.random() * 8 + 2;
      const z = Math.random() * -20 - 5;

      // Start position (closer to camera)
      positions[0] = Math.cos(angle) * radius;
      positions[1] = Math.sin(angle) * radius;
      positions[2] = z;

      // End position (further back, slightly wider)
      const endRadius = radius * 1.2;
      positions[3] = Math.cos(angle) * endRadius;
      positions[4] = Math.sin(angle) * endRadius;
      positions[5] = z - 5;

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: options.color || "#5227FF",
        transparent: true,
        opacity: options.opacity || 0.7,
        linewidth: 1,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
      lineSpeeds.push(0.5 + Math.random() * 0.5);
    }

    linesRef.current = lines;

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.01;

      const baseSpeed = (options.speed || 0.8) * 0.15;

      lines.forEach((line, i) => {
        const positions = line.geometry.attributes.position;
        if (!positions) return;

        const speed = baseSpeed * lineSpeeds[i];

        // Move lines toward camera
        positions.array[2] += speed;
        positions.array[5] += speed;

        // Reset if line passes camera
        if (positions.array[2] > 5) {
          const angle = (i / lineCount) * Math.PI * 2;
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

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      lines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      rendererRef.current?.dispose();
    };
  }, [effectOptions, onSpeedUp, onSlowDown]);

  return <div ref={mountRef} className="hyperspeed-container" />;
}

