'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Environment, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';

const CONCEPTS = [
  { text: 'AI Systems', position: [3, 2, 0] },
  { text: 'Infrastructure', position: [-3, -1.5, 1.5] },
  { text: 'Intelligence', position: [2, -2.5, -1] },
  { text: 'Automation', position: [-2.5, 2, -2] },
  { text: 'Innovation', position: [3, -1, 1.5] },
  { text: 'Future Interfaces', position: [0, -3.5, 2] },
];

export function IntelligenceCoreScene() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;

      // React to pointer
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.5, 0.05);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2;
      ring1Ref.current.rotation.y = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.15;
      ring2Ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, 10, -10]} intensity={2} color="#6F3CFF" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#6F3CFF" distance={10} />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[2, 64, 64]} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <MeshDistortMaterial 
              color={hovered ? "#8B5CF6" : "#050505"} 
              emissive={hovered ? "#6F3CFF" : "#000000"}
              emissiveIntensity={hovered ? 0.5 : 0}
              distort={hovered ? 0.4 : 0.2} 
              speed={hovered ? 4 : 1} 
              roughness={0.1}
              metalness={0.9}
              transmission={0.9}
              thickness={2}
              envMapIntensity={2}
            />
          </Sphere>
          
          <Sphere args={[2.05, 32, 32]}>
             <meshBasicMaterial color="#6F3CFF" wireframe transparent opacity={0.1} />
          </Sphere>
        </Float>

        <mesh ref={ring1Ref}>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.2} transparent opacity={0.3} />
        </mesh>
        
        <mesh ref={ring2Ref}>
          <torusGeometry args={[4.5, 0.01, 16, 100]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={1} roughness={0.2} transparent opacity={0.5} />
        </mesh>

        <Sparkles count={200} scale={10} size={1} speed={0.5} opacity={hovered ? 0.8 : 0.3} color="#6F3CFF" />
        <Sparkles count={100} scale={12} size={1.5} speed={0.2} opacity={0.4} color="#D4AF37" />

        {CONCEPTS.map((concept, i) => (
          <Html
            key={i}
            position={new THREE.Vector3(...concept.position)}
            center
            style={{
              transition: 'all 0.5s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
              opacity: hovered ? 1 : 0.2,
              transform: `scale(${hovered ? 1 : 0.8})`,
              pointerEvents: 'none',
            }}
          >
            <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full whitespace-nowrap">
              <span className="text-xs font-mono text-white/80 tracking-widest uppercase">{concept.text}</span>
            </div>
          </Html>
        ))}
      </group>

      <Environment preset="city" />
    </>
  );
}
