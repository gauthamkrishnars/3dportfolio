import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

function Scene({ showGlasses, useShadedModel, glassesX, glassesY, glassesZ, glassesScale }) {
  const pbrModel = useGLTF('/base_basic_pbr.glb');
  const shadedModel = useGLTF('/base_basic_shaded.glb');
  const glassesModel = useGLTF('/stylish_modern_high_quality_sunglasses.glb');

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Environment preset="city" />

      {/* Conditionally render base avatar model */}
      {useShadedModel ? (
        <primitive object={shadedModel.scene} />
      ) : (
        <primitive object={pbrModel.scene} />
      )}

      {/* Conditionally render stylish modern sunglasses with live Leva controls */}
      {showGlasses && (
        <primitive
          object={glassesModel.scene}
          position={[glassesX, glassesY, glassesZ]}
          scale={[glassesScale, glassesScale, glassesScale]}
        />
      )}

      <OrbitControls />
    </>
  );
}

export default function AvatarViewer() {
  const [showGlasses, setShowGlasses] = useState(true);
  const [useShadedModel, setUseShadedModel] = useState(false);

  const { glassesX, glassesY, glassesZ, glassesScale } = useControls('Glasses Controls', {
    glassesX: { value: 0.01, min: -2, max: 2, step: 0.01 },
    glassesY: { value: 1.35, min: -2, max: 2, step: 0.01 },
    glassesZ: { value: 0.25, min: -2, max: 2, step: 0.01 },
    glassesScale: { value: 0.11, min: 0.01, max: 3, step: 0.005 },
  });

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#111111' }}>
      <Canvas camera={{ position: [0, 1.35, 2.5], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene
            showGlasses={showGlasses}
            useShadedModel={useShadedModel}
            glassesX={glassesX}
            glassesY={glassesY}
            glassesZ={glassesZ}
            glassesScale={glassesScale}
          />
        </Suspense>
      </Canvas>

      {/* High contrast, modern HTML UI overlay at the bottom of the screen */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '16px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '12px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <button
          onClick={() => setShowGlasses((prev) => !prev)}
          style={{
            backgroundColor: showGlasses ? '#ffffff' : '#222222',
            color: showGlasses ? '#000000' : '#ffffff',
            border: '1px solid #ffffff',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Toggle Glasses
        </button>
        <button
          onClick={() => setUseShadedModel((prev) => !prev)}
          style={{
            backgroundColor: useShadedModel ? '#ffffff' : '#000000',
            color: useShadedModel ? '#000000' : '#ffffff',
            border: '1px solid #ffffff',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Switch Lighting Mode
        </button>
      </div>
    </div>
  );
}

useGLTF.preload('/base_basic_pbr.glb');
useGLTF.preload('/base_basic_shaded.glb');
useGLTF.preload('/stylish_modern_high_quality_sunglasses.glb');
