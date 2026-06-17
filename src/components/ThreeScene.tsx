import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const nodeData = [
  { label: "core", position: [0, 0, 0], color: "#67e8f9", size: 0.23 },
  { label: "USAA", position: [1.9, 0.65, -0.25], color: "#60a5fa", size: 0.14 },
  { label: "VantagePoint", position: [-1.4, 1.2, 0.35], color: "#86efac", size: 0.12 },
  { label: "Netspend", position: [-2.1, -0.35, -0.15], color: "#a78bfa", size: 0.13 },
  { label: "HP", position: [1.35, -1.28, 0.25], color: "#fbbf24", size: 0.11 },
  { label: "Projects", position: [0.15, 1.85, -0.45], color: "#67e8f9", size: 0.1 },
  { label: "Skills", position: [0.55, -1.9, 0.1], color: "#86efac", size: 0.1 },
] as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function CareerGraph({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  const stars = useMemo(() => {
    const positions = new Float32Array(260 * 3);
    for (let index = 0; index < 260; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 7.8;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 5.2;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 4.2;
    }
    return positions;
  }, []);

  const connections = useMemo(() => {
    const core = nodeData[0].position;
    return nodeData.slice(1).map((node) => [core, node.position] as const);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onVisibility = () => setHidden(document.hidden);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useFrame(({ clock }) => {
    if (!group.current || hidden) return;
    const elapsed = clock.getElapsedTime();
    const motionScale = reducedMotion ? 0.08 : 1;
    group.current.rotation.y = elapsed * 0.08 * motionScale + pointer.current.x * 0.1;
    group.current.rotation.x = Math.sin(elapsed * 0.22) * 0.04 * motionScale - pointer.current.y * 0.08;
    group.current.position.y = Math.sin(elapsed * 0.4) * 0.05 * motionScale;
  });

  return (
    <group ref={group}>
      <Points positions={stars} stride={3} frustumCulled>
        <PointMaterial transparent color="#67e8f9" size={0.012} sizeAttenuation depthWrite={false} opacity={0.42} />
      </Points>

      {connections.map((connection, index) => (
        <Line
          key={`line-${index}`}
          points={connection.map((point) => new THREE.Vector3(point[0], point[1], point[2]))}
          color={index % 2 ? "#a78bfa" : "#67e8f9"}
          lineWidth={1}
          transparent
          opacity={0.48}
        />
      ))}

      <Line
        points={nodeData.slice(1).map((node) => new THREE.Vector3(node.position[0], node.position[1], node.position[2]))}
        color="#86efac"
        lineWidth={1}
        transparent
        opacity={0.2}
      />

      {nodeData.map((node, index) => (
        <group key={node.label} position={node.position}>
          <mesh>
            <sphereGeometry args={[node.size, 32, 32]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={index === 0 ? 1.8 : 1.1} roughness={0.38} />
          </mesh>
          <mesh>
            <sphereGeometry args={[node.size * 1.7, 32, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={index === 0 ? 0.12 : 0.07} />
          </mesh>
        </group>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.006, 10, 130]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.25, 0.1]}>
        <torusGeometry args={[2.35, 0.004, 10, 150]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    camera.position.z = 5.2 + Math.sin(clock.getElapsedTime() * 0.22) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ThreeScene() {
  const reducedMotion = useReducedMotion();
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 1.5));
  }, []);

  return (
    <div className="three-scene-canvas" aria-hidden="true">
      <Canvas
        aria-hidden="true"
        dpr={dpr}
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[2.5, 2.5, 3.4]} intensity={1.9} color="#67e8f9" />
        <pointLight position={[-2.5, -2.2, 2]} intensity={1.2} color="#a78bfa" />
        <CareerGraph reducedMotion={reducedMotion} />
        <CameraRig />
      </Canvas>
    </div>
  );
}
