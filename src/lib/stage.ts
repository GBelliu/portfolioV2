/**
 * Estado compartilhado entre o DOM (ScrollTrigger) e a cena 3D (useFrame).
 * É um objeto mutável de propósito: é lido a cada frame e não deve disparar renders do React.
 */
export const stage = {
  /** Progresso do scroll na seção do computador (0 → 1). */
  progress: 0,
  /** Entrada do computador após o loader (0 → 1). */
  intro: 0,
  /** Ponteiro normalizado (-1 → 1). */
  pointerX: 0,
  pointerY: 0,
  /** Momento (performance.now) em que o boot da tela começou. */
  bootAt: 0,
};

let resolveScene: () => void = () => {};

export const sceneReady = new Promise<void>((resolve) => {
  resolveScene = resolve;
});

export const markSceneReady = () => resolveScene();
