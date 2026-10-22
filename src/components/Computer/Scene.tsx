import { useEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { markSceneReady, stage } from '../../lib/stage';
import { RetroComputer } from './RetroComputer';
import { SCREEN } from './screen';

const FOV = 30;
const CAMERA_Z = 9;
const TAN_HALF = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
const VISIBLE_H = 2 * CAMERA_Z * TAN_HALF;

const { smoothstep, damp, lerp } = THREE.MathUtils;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Posiciona computador e câmera a partir do progresso do scroll:
 * hero → computador de lado com os textos → câmera entra na tela.
 */
function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const smooth = useRef({ p: 0, px: 0, py: 0 });
  const lookAt = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const s = smooth.current;
    s.p = damp(s.p, stage.progress, 6, delta);
    s.px = damp(s.px, stage.pointerX, 3, delta);
    s.py = damp(s.py, stage.pointerY, 3, delta);

    const { width, height } = state.size;
    const aspect = width / height;
    const wide = aspect > 1.05;
    const visibleW = VISIBLE_H * aspect;
    const t = state.clock.elapsedTime;

    const baseScale = wide ? Math.min(1, VISIBLE_H / 4.6) : Math.min(visibleW / 3.5, VISIBLE_H / 6.4);
    const about = smoothstep(s.p, 0.06, 0.2);
    const zoom = easeInOut(smoothstep(s.p, 0.8, 0.99));
    const intro = stage.intro;

    const scale = lerp(wide ? baseScale * 0.9 : baseScale, wide ? baseScale * 0.95 : baseScale * 0.72, about);
    const heroY = wide ? -0.45 : -VISIBLE_H * 0.17;
    const aboutX = wide ? visibleW * 0.22 : 0;
    const aboutY = wide ? -0.3 : VISIBLE_H * 0.2;

    const float = Math.sin(t * 1.1) * 0.05 * (1 - zoom);
    const x = lerp(lerp(0, aboutX, about), 0, zoom);
    const y = lerp(lerp(heroY, aboutY, about), 0, zoom) + float - (1 - intro) * 5;
    const rotY = lerp(lerp(0.4, -0.45, about), 0, zoom) + s.px * 0.3 * (1 - zoom) - (1 - intro) * 2.6;
    const rotX = lerp(0.12, 0, zoom) + s.py * 0.12 * (1 - zoom) + (1 - intro) * 0.6;

    g.position.set(x, y, 0);
    g.rotation.set(rotX, rotY, Math.sin(t * 0.8) * 0.015 * (1 - zoom));
    g.scale.setScalar(scale);

    // câmera mergulha até a tela preencher o viewport
    const screenY = SCREEN.y * scale;
    const fitH = (SCREEN.height * scale) / (2 * TAN_HALF);
    const fitW = (SCREEN.width * scale) / (2 * TAN_HALF * aspect);
    const distance = Math.min(fitH, fitW) * 0.94;
    const cam = state.camera;
    cam.position.set(0, lerp(0.15, screenY, zoom), lerp(CAMERA_Z, SCREEN.z * scale + distance, zoom));
    lookAt.current.set(0, lerp(0, screenY, zoom), 0);
    cam.lookAt(lookAt.current);
  });

  return <group ref={group}>{children}</group>;
}

function NoWebGL() {
  useEffect(() => markSceneReady(), []);
  return null;
}

export default function Scene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ fov: FOV, position: [0, 0.15, CAMERA_Z], near: 0.05, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => requestAnimationFrame(() => markSceneReady())}
      fallback={<NoWebGL />}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#fff1dc" />
      <directionalLight position={[-6, 2, 3]} intensity={0.7} color="#ffe2c4" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffd9b0" position={[-5, 1, 2]} scale={[2, 6, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#8dff7a" position={[4, 0, 3]} scale={1.5} />
      </Environment>
      <Rig>
        <RetroComputer />
      </Rig>
    </Canvas>
  );
}
