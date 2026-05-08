'use client';
import { Canvas } from '@react-three/fiber';
import { IntelligenceCoreScene } from './IntelligenceCoreScene';
import { Suspense } from 'react';

export default function IntelligenceCoreWrapper() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <IntelligenceCoreScene />
      </Canvas>
    </Suspense>
  );
}
