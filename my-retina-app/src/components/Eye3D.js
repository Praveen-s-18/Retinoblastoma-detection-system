import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function EyeModel() {
  const groupRef = useRef()
  const { scene } = useGLTF('/human_eye.glb')

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Rotate the model slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.8} castShadow />
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  )
}

export default function Eye3D() {
  return (
    <div style={{ width: '700px', height: '400px' }}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#93c5fd" />
        
        {/* Shadow plane at the bottom */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -2, 0]} 
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        
        <Suspense fallback={<LoadingFallback />}>
          <EyeModel />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  )
}
