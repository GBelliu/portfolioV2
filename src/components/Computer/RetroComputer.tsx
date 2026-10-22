import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { stage } from '../../lib/stage';
import { CrtScreen, SCREEN, resolveScreen, screenFonts } from './screen';

const BEIGE = '#e6dcc4';
const BEIGE_DARK = '#d3c7aa';
const PLASTIC_DARK = '#2a2621';

const KEY_COLS = 15;
const KEY_ROWS = 4;
const KEY_COUNT = KEY_COLS * KEY_ROWS;
const KEY_STEP = 0.152;

/** Plano levemente abaulado, como o vidro de um monitor CRT. */
function useCrtGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(SCREEN.width, SCREEN.height, 32, 24);
    const pos = geo.attributes.position;
    const hw = SCREEN.width / 2;
    const hh = SCREEN.height / 2;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) / hw;
      const y = pos.getY(i) / hh;
      pos.setZ(i, 0.05 * (1 - x * x) * (1 - y * y));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/** Sombra suave pré-desenhada: bem mais leve que sombras em tempo real. */
function useSoftShadow() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(40, 30, 20, 0.5)');
    gradient.addColorStop(0.55, 'rgba(40, 30, 20, 0.18)');
    gradient.addColorStop(1, 'rgba(40, 30, 20, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** Teclas instanciadas que afundam quando algo é digitado na tela. */
class KeyboardKeys {
  private readonly presses = new Float32Array(KEY_COUNT);
  private readonly dummy = new THREE.Object3D();

  layout(mesh: THREE.InstancedMesh) {
    for (let i = 0; i < KEY_COUNT; i++) this.place(mesh, i, 0);
    mesh.instanceMatrix.needsUpdate = true;
  }

  press(count: number) {
    for (let i = 0; i < Math.min(count, 4); i++) this.presses[Math.floor(Math.random() * KEY_COUNT)] = 1;
  }

  tick(mesh: THREE.InstancedMesh, delta: number) {
    let dirty = false;
    for (let i = 0; i < KEY_COUNT; i++) {
      if (this.presses[i] <= 0) continue;
      this.presses[i] = Math.max(0, this.presses[i] - delta * 6);
      this.place(mesh, i, this.presses[i]);
      dirty = true;
    }
    if (dirty) mesh.instanceMatrix.needsUpdate = true;
  }

  private place(mesh: THREE.InstancedMesh, index: number, press: number) {
    const col = index % KEY_COLS;
    const row = Math.floor(index / KEY_COLS);
    this.dummy.position.set(
      (col - (KEY_COLS - 1) / 2) * KEY_STEP + (row % 2) * 0.04,
      0.09 - press * 0.035,
      -0.32 + row * 0.155,
    );
    this.dummy.updateMatrix();
    mesh.setMatrixAt(index, this.dummy.matrix);
  }
}

export function RetroComputer() {
  const crt = useCrtGeometry();
  const shadow = useSoftShadow();
  const [screen] = useState(() => new CrtScreen());
  const [keyboard] = useState(() => new KeyboardKeys());
  const keys = useRef<THREE.InstancedMesh>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => () => screen.dispose(), [screen]);

  // redesenha a tela quando as fontes do canvas terminam de carregar
  useEffect(() => {
    let alive = true;
    Promise.all(screenFonts.map((font) => document.fonts.load(font))).then(() => {
      if (alive) screen.invalidate();
    });
    return () => {
      alive = false;
    };
  }, [screen]);

  useEffect(() => {
    if (keys.current) keyboard.layout(keys.current);
  }, [keyboard]);

  useFrame((state, delta) => {
    const now = performance.now();
    const elapsed = stage.bootAt ? (now - stage.bootAt) / 1000 : null;

    // cada caractere digitado na tela aperta uma tecla
    const added = screen.update(resolveScreen(elapsed, stage.progress, now));
    if (added > 0) keyboard.press(added);
    if (keys.current) keyboard.tick(keys.current, delta);

    if (led.current) {
      led.current.emissiveIntensity = elapsed === null ? 0.2 : 2 + Math.sin(state.clock.elapsedTime * 3) * 0.6;
    }
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0.15, -0.99, 0.75]} scale={[5, 4, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} />
      </mesh>

      {/* gabinete */}
      <RoundedBox args={[2.3, 2.3, 2]} radius={0.14} smoothness={4} position={[0, 0.35, 0]} castShadow>
        <meshStandardMaterial color={BEIGE} roughness={0.55} />
      </RoundedBox>

      {/* moldura da tela */}
      <RoundedBox args={[1.92, 1.52, 0.1]} radius={0.06} smoothness={3} position={[0, SCREEN.y, 0.98]}>
        <meshStandardMaterial color={BEIGE_DARK} roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, SCREEN.y, 1.02]}>
        <boxGeometry args={[1.7, 1.3, 0.04]} />
        <meshStandardMaterial color="#0d100d" roughness={0.4} />
      </mesh>

      {/* tela CRT */}
      <mesh geometry={crt} position={[0, SCREEN.y, SCREEN.z - 0.05]}>
        <meshBasicMaterial map={screen.texture} toneMapped={false} />
      </mesh>
      <pointLight position={[0, SCREEN.y, 1.6]} color="#8dff7a" intensity={0.8} distance={3} />

      {/* frente: entrada de disquete, selo da marca e LED */}
      <mesh position={[0.45, -0.42, 1.005]}>
        <boxGeometry args={[0.7, 0.05, 0.02]} />
        <meshStandardMaterial color={PLASTIC_DARK} />
      </mesh>
      <mesh position={[0.45, -0.52, 1.005]}>
        <boxGeometry args={[0.18, 0.04, 0.02]} />
        <meshStandardMaterial color={BEIGE_DARK} />
      </mesh>
      {['#ff4f1f', '#ffd23f', '#8dff7a'].map((color, i) => (
        <mesh key={color} position={[-0.86 + i * 0.08, -0.46, 1.005]}>
          <boxGeometry args={[0.055, 0.16, 0.02]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0.92, -0.62, 1.0]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshStandardMaterial ref={led} color="#2bd65a" emissive="#2bd65a" emissiveIntensity={0.2} />
      </mesh>

      {/* grade de ventilação lateral */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[1.151, 0.9 - i * 0.12, -0.3]}>
          <boxGeometry args={[0.01, 0.04, 0.9]} />
          <meshStandardMaterial color={BEIGE_DARK} />
        </mesh>
      ))}

      {/* base */}
      <RoundedBox args={[1.7, 0.14, 1.7]} radius={0.05} position={[0, -0.86, -0.1]}>
        <meshStandardMaterial color={BEIGE_DARK} roughness={0.6} />
      </RoundedBox>

      {/* teclado */}
      <group position={[0, -0.86, 1.8]} rotation={[0.06, 0, 0]}>
        <RoundedBox args={[2.55, 0.14, 0.9]} radius={0.05} smoothness={3}>
          <meshStandardMaterial color={BEIGE} roughness={0.55} />
        </RoundedBox>
        <instancedMesh ref={keys} args={[undefined, undefined, KEY_COUNT]}>
          <boxGeometry args={[0.125, 0.07, 0.125]} />
          <meshStandardMaterial color={BEIGE_DARK} roughness={0.5} />
        </instancedMesh>
        <mesh position={[0, 0.09, 0.36]}>
          <boxGeometry args={[1.1, 0.07, 0.11]} />
          <meshStandardMaterial color={BEIGE_DARK} roughness={0.5} />
        </mesh>
        <mesh position={[1.08, 0.09, 0.36]}>
          <boxGeometry args={[0.27, 0.07, 0.11]} />
          <meshStandardMaterial color="#ff4f1f" roughness={0.4} />
        </mesh>
      </group>

      {/* mouse */}
      <RoundedBox args={[0.3, 0.1, 0.44]} radius={0.04} position={[1.75, -0.88, 1.85]} rotation={[0, -0.15, 0]}>
        <meshStandardMaterial color={BEIGE} roughness={0.55} />
      </RoundedBox>
    </group>
  );
}

