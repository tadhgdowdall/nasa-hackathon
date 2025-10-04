"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import * as THREE from "three";

/**
 * Realistic Planet with NASA textures + shadows
 */
function Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load planet textures (Earth-like)
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
    ],
  );

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group position={[30, 12, -35]}>
      {/* Main planet body */}
      <Sphere ref={planetRef} args={[4, 128, 128]} castShadow receiveShadow>
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new THREE.Color("grey")}
          shininess={20}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[4.05, 64, 64]} castShadow receiveShadow>
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere ref={atmosphereRef} args={[4.4, 64, 64]}>
        <meshBasicMaterial
          color="#4299e1"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Subtle rim light effect */}
      <Sphere args={[4.25, 64, 64]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

/**
 * Cinematic Space Background
 */
export default function NightSky() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Deep space black to purple gradient via fog */}
        <fog attach="fog" args={["#0a0a1a", 10, 50]} />

        {/* Stars - multiple layers for parallax */}
        <Stars
          radius={150}
          depth={80}
          count={8000}
          factor={6}
          saturation={0}
          fade
          speed={0.3}
        />
        <Stars
          radius={100}
          depth={50}
          count={4000}
          factor={4}
          saturation={0.1}
          fade
          speed={0.5}
        />

        {/* Realistic planet */}
        <Suspense fallback={null}>
          <Planet />
        </Suspense>

        {/* Lighting */}
        <ambientLight intensity={0.15} color="#1a1a2e" />
        <directionalLight
          position={[20, 15, 10]}
          intensity={2.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[15, 5, -20]} intensity={0.4} color="#5b21b6" />
        <spotLight
          position={[-15, 10, -25]}
          angle={0.3}
          penumbra={0.5}
          intensity={1.2}
          color="#60a5fa"
          castShadow
        />
      </Canvas>
    </div>
  );
}
