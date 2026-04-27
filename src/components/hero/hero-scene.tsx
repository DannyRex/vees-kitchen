"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ────────── Brass plate ────────────────────────────────────────────────── */

function BrassPlate() {
  const ref = useRef<THREE.Mesh>(null);

  // Lathe profile: a slightly upturned dish with a wide rim. Points define a
  // 2D silhouette that's revolved around Y to form the plate.
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const r = 1.4 * Math.sin(Math.PI * 0.5 * (1 - Math.pow(1 - t, 1.4)));
      const y = -0.05 + 0.06 * Math.pow(t, 2.4);
      points.push(new THREE.Vector2(r, y));
    }
    // Add a thin lip back inward and down for thickness
    points.push(new THREE.Vector2(1.38, -0.05));
    points.push(new THREE.Vector2(0.0, -0.08));

    return new THREE.LatheGeometry(points, 96);
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} receiveShadow castShadow rotation={[0, 0, 0]}>
      <meshStandardMaterial
        color="#9b6a2c"
        metalness={0.92}
        roughness={0.32}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

/* ────────── Rice mound (instanced grains) ──────────────────────────────── */

function RiceMound({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const grainGeometry = useMemo(() => {
    // A single rice grain — capsule-like ellipsoid, ~5mm in scene units
    const g = new THREE.SphereGeometry(0.045, 6, 4);
    g.scale(1, 0.55, 0.55);
    return g;
  }, []);

  const transforms = useMemo(() => {
    // Scatter grains in a low dome above the plate, with palm-oil-tinted
    // colour variation. We pre-compute matrices + colours; nothing runs per
    // frame on the CPU side.
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    const colors: THREE.Color[] = [];
    const palette = ["#cc6a1a", "#d4881f", "#b8541e", "#e09a3a", "#a8480f"];

    for (let i = 0; i < count; i++) {
      // Sample a flat disc with falloff toward edge for the dome shape
      const r = Math.sqrt(Math.random()) * 0.95;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // Height: dome profile (1 - r^2) plus jitter
      const y = (1 - r * r) * 0.18 + Math.random() * 0.04 + 0.01;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      const s = 0.85 + Math.random() * 0.4;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());

      const colorHex = palette[Math.floor(Math.random() * palette.length)];
      colors.push(new THREE.Color(colorHex));
    }
    return { matrices, colors };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    transforms.matrices.forEach((m, i) => meshRef.current!.setMatrixAt(i, m));
    transforms.colors.forEach((c, i) => meshRef.current!.setColorAt(i, c));
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [transforms]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[grainGeometry, undefined, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial roughness={0.55} metalness={0.05} />
    </instancedMesh>
  );
}

/* ────────── Steam plumes (custom GLSL on billboards) ───────────────────── */

const steamVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const steamFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform float uTime;
  uniform float uOpacity;

  // Hash + value noise — cheap, smooth enough for steam.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1., 0.));
    float c = hash(i + vec2(0., 1.));
    float d = hash(i + vec2(1., 1.));
    vec2 u = f * f * (3. - 2. * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1. - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    // Domain warp the noise for that wispy steam look. Y advection ↑.
    vec2 uv = vUv;
    vec2 q = vec2(uv.x * 2.0, uv.y * 2.5 - uTime * 0.18);
    float warp = fbm(q + vec2(uTime * 0.06, uTime * 0.09));
    float n = fbm(q + warp * 1.3);

    // Soft horizontal mask + vertical falloff so plumes feather out
    float horiz = smoothstep(0.0, 0.45, uv.x) * smoothstep(1.0, 0.55, uv.x);
    float vert = smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.55, uv.y);
    float a = n * horiz * vert * uOpacity;
    a = pow(a, 1.4);
    gl_FragColor = vec4(0.96, 0.94, 0.9, a * 0.7);
  }
`;

function SteamPlume({
  position,
  scale,
  opacity,
  seed,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  opacity: number;
  seed: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: seed },
      uOpacity: { value: opacity },
    }),
    [seed, opacity],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh position={position} scale={scale} renderOrder={2}>
      <planeGeometry args={[1, 2.6, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={steamVertex}
        fragmentShader={steamFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ────────── Pointer + gyro parallax on the plate group ─────────────────── */

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / size.width) * 2 - 1;
      const ny = (e.clientY / size.height) * 2 - 1;
      target.current.x = ny * 0.035;
      target.current.y = nx * 0.045;
    };
    window.addEventListener("pointermove", onPointer);
    return () => window.removeEventListener("pointermove", onPointer);
  }, [size.width, size.height]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x +=
      (target.current.x - ref.current.rotation.x) * 0.06;
    ref.current.rotation.y +=
      (target.current.y - ref.current.rotation.y) * 0.06;
  });

  return <group ref={ref}>{children}</group>;
}

/* ────────── Scene ─────────────────────────────────────────────────────── */

export function HeroScene({ grainCount }: { grainCount: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.4]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 1.05, 3.0], fov: 32 }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#1a1815"]} />
      <fog attach="fog" args={["#1a1815", 4.5, 9]} />

      {/* Warm key from upper-left, cool fill from right */}
      <directionalLight
        position={[-3.2, 4.0, 2.4]}
        intensity={2.2}
        color="#ffd5a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={12}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <directionalLight
        position={[3.0, 2.0, 1.5]}
        intensity={0.5}
        color="#a4b8d4"
      />
      <ambientLight intensity={0.18} color="#ffe8c8" />

      <Environment preset="apartment" environmentIntensity={0.55} />

      <ParallaxRig>
        <group position={[0, -0.55, 0]}>
          <BrassPlate />
          <RiceMound count={grainCount} />

          <SteamPlume
            position={[-0.35, 1.05, 0.05]}
            scale={[0.55, 1.0, 1]}
            opacity={0.55}
            seed={0}
          />
          <SteamPlume
            position={[0.05, 1.18, 0.0]}
            scale={[0.7, 1.2, 1]}
            opacity={0.7}
            seed={3.1}
          />
          <SteamPlume
            position={[0.42, 1.0, 0.02]}
            scale={[0.5, 0.95, 1]}
            opacity={0.5}
            seed={6.4}
          />
        </group>

        <ContactShadows
          position={[0, -0.6, 0]}
          opacity={0.55}
          scale={6}
          blur={2.4}
          far={2.5}
          color="#000000"
        />
      </ParallaxRig>
    </Canvas>
  );
}
