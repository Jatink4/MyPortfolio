import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function RotatingCube() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#ffffff" emissive="white" emissiveIntensity={1.5} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="fixed top-6 left-6 w-[80px] h-[80px] z-50 " data-tour="hero-canvas">
      <Canvas className="rounded-xl">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
      </Canvas>
    </div>
  );
}
