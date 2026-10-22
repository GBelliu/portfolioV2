import * as THREE from 'three';
import { site, yearsCoding } from '../../content/site';

/** Dimensões da tela no modelo 3D (unidades de cena). */
export const SCREEN = { y: 0.55, z: 1.1, width: 1.6, height: 1.2 };

export const SCREEN_W = 1024;
export const SCREEN_H = 768;

const C = {
  bg: '#0b130c',
  text: '#8dff7a',
  dim: '#3f7a3a',
  keyword: '#ffb547',
  string: '#ff7a45',
  number: '#7fd3ff',
  prop: '#c9ffbf',
  comment: '#4f8f47',
};

const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';
const PIXEL = '"VT323", ui-monospace, monospace';

export const screenFonts = [`32px ${MONO}`, `32px ${PIXEL}`];

/* ---------- conteúdo ---------- */

const BOOT_LINES = [
  'DDM-OS BIOS v26.10',
  'Copyright (C) dev do marketing',
  '',
  'Memoria .......... 640K OK',
  'Criatividade ..... OK',
  'Cafe ............. 87% (suficiente)',
  'Pixel tracker .... ATIVO',
  '',
  'Iniciando sistema...',
];

const CODE = `// sobre.ts
const dev = {
  nome: "${site.firstName}",
  apelido: "${site.brand}",
  codando_desde: ${site.since},
  stack: ["Vue", "React", "Next", "TS"],
  foco: ["conversao", "SEO", "dados"],
};

function lancar(ideia) {
  return ideia
    .prototipar()
    .codar()
    .medir() // GA4 + GTM
    .otimizar();
}

export default lancar(suaMarca);`;

const BUILD_LINES = [
  '$ npm run build',
  '',
  '> compilando sobre.ts ......... ok',
  '> otimizando imagens .......... ok',
  '> configurando pixels ......... ok',
  '> lighthouse .................. 100',
  '',
  `✓ ${yearsCoding}+ anos de experiencia carregados`,
  '✓ pronto pra rodar sua marca',
  '',
  '$ abrir portfolio --modo=tela-cheia',
];

export const CODE_LENGTH = CODE.length;

/* ---------- tokenização simples para destacar sintaxe ---------- */

interface Token {
  text: string;
  color: string;
}

const TOKEN_RE =
  /(\/\/[^\n]*)|("[^"\n]*")|\b(const|function|return|export|default)\b|\b(\d+)\b|(\w+)(?=:)|(\n)|([^\n])/g;

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  for (const m of source.matchAll(TOKEN_RE)) {
    const [text, comment, str, kw, num, prop] = m;
    const color = comment
      ? C.comment
      : str
        ? C.string
        : kw
          ? C.keyword
          : num
            ? C.number
            : prop
              ? C.prop
              : C.text;
    tokens.push({ text, color });
  }
  return tokens;
}

const CODE_TOKENS = tokenize(CODE);

/* ---------- estados da tela ---------- */

export type ScreenState =
  | { mode: 'off' }
  | { mode: 'boot'; lines: number; cursor: boolean }
  | { mode: 'home'; cursor: boolean }
  | { mode: 'code'; chars: number; cursor: boolean }
  | { mode: 'build'; lines: number; cursor: boolean };

/**
 * Converte tempo desde o boot e progresso do scroll em um estado da tela.
 */
export function resolveScreen(bootElapsed: number | null, progress: number, now: number): ScreenState {
  const cursor = Math.floor(now / 530) % 2 === 0;

  if (bootElapsed === null) return { mode: 'off' };

  if (progress < 0.12) {
    const lines = Math.floor(bootElapsed / 0.22);
    if (lines <= BOOT_LINES.length + 1) return { mode: 'boot', lines, cursor };
    return { mode: 'home', cursor };
  }

  if (progress < 0.72) {
    const t = Math.min(1, (progress - 0.12) / 0.56);
    return { mode: 'code', chars: Math.floor(t * CODE_LENGTH), cursor };
  }

  const t = Math.min(1, (progress - 0.72) / 0.1);
  return { mode: 'build', lines: Math.ceil(t * BUILD_LINES.length), cursor };
}

/* ---------- desenho ---------- */

function glow(ctx: CanvasRenderingContext2D, color: string, blur = 14) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  cursor: boolean,
  { x = 64, y = 80, size = 40, lineHeight = 44 } = {},
) {
  ctx.font = `${size}px ${PIXEL}`;
  ctx.fillStyle = C.text;
  glow(ctx, C.text);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));

  if (cursor) {
    const last = lines.length ? lines[lines.length - 1] : '';
    const cx = x + ctx.measureText(last).width + 6;
    const cy = y + Math.max(0, lines.length - 1) * lineHeight - size * 0.75;
    ctx.fillRect(cx, cy, size * 0.5, size * 0.85);
  }
}

function drawHome(ctx: CanvasRenderingContext2D, cursor: boolean) {
  ctx.textAlign = 'center';
  ctx.fillStyle = C.dim;
  ctx.font = `30px ${PIXEL}`;
  glow(ctx, C.dim, 8);
  ctx.fillText('+' + '-'.repeat(46) + '+', SCREEN_W / 2, 150);
  ctx.fillText('+' + '-'.repeat(46) + '+', SCREEN_W / 2, 560);

  ctx.fillStyle = C.text;
  glow(ctx, C.text, 22);
  ctx.font = `150px ${PIXEL}`;
  ctx.fillText('dev do', SCREEN_W / 2, 310);
  ctx.fillStyle = C.keyword;
  glow(ctx, C.keyword, 22);
  ctx.fillText('marketing', SCREEN_W / 2, 450);

  ctx.font = `40px ${PIXEL}`;
  ctx.fillStyle = C.text;
  glow(ctx, C.text);
  const prompt = '> role para ligar o sistema';
  ctx.fillText(prompt, SCREEN_W / 2, 660);
  if (cursor) {
    const w = ctx.measureText(prompt).width;
    ctx.fillRect(SCREEN_W / 2 + w / 2 + 8, 630, 20, 34);
  }
  ctx.textAlign = 'left';
}

function drawCode(ctx: CanvasRenderingContext2D, chars: number, cursor: boolean) {
  const top = 70;
  const left = 96;
  const lh = 42;

  // barra de abas do editor
  ctx.fillStyle = '#132015';
  ctx.fillRect(0, 0, SCREEN_W, 52);
  ctx.fillStyle = C.bg;
  ctx.fillRect(24, 10, 200, 42);
  ctx.font = `30px ${PIXEL}`;
  ctx.fillStyle = C.text;
  glow(ctx, C.text, 6);
  ctx.fillText('sobre.ts', 52, 42);
  ctx.fillStyle = C.dim;
  ctx.fillText('×', 196, 42);

  ctx.font = `30px ${MONO}`;
  const charW = ctx.measureText('M').width;
  const maxLines = Math.floor((SCREEN_H - top - 20) / lh);

  // calcula as linhas visíveis para rolar quando o código passa da tela
  const typed = CODE.slice(0, chars);
  const totalLines = typed.split('\n').length;
  const offset = Math.max(0, totalLines - maxLines);

  let line = 0;
  let col = 0;
  let remaining = chars;

  for (const token of CODE_TOKENS) {
    if (remaining <= 0) break;
    const text = token.text.slice(0, remaining);
    remaining -= token.text.length;

    if (text === '\n') {
      line += 1;
      col = 0;
      continue;
    }

    const row = line - offset;
    if (row >= 0) {
      ctx.fillStyle = token.color;
      glow(ctx, token.color, 10);
      ctx.fillText(text, left + col * charW, top + 30 + row * lh);
    }
    col += text.length;
  }

  // números de linha
  ctx.fillStyle = C.dim;
  glow(ctx, C.dim, 0);
  ctx.textAlign = 'right';
  for (let i = 0; i < Math.min(totalLines, maxLines); i++) {
    ctx.fillText(String(i + 1 + offset), left - 28, top + 30 + i * lh);
  }
  ctx.textAlign = 'left';

  if (cursor) {
    ctx.fillStyle = C.text;
    glow(ctx, C.text);
    ctx.fillRect(left + col * charW + 2, top + 6 + (line - offset) * lh, charW * 0.9, 30);
  }
}

function drawScanlines(ctx: CanvasRenderingContext2D) {
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
  for (let y = 0; y < SCREEN_H; y += 4) ctx.fillRect(0, y, SCREEN_W, 2);

  const vignette = ctx.createRadialGradient(
    SCREEN_W / 2,
    SCREEN_H / 2,
    SCREEN_H * 0.35,
    SCREEN_W / 2,
    SCREEN_H / 2,
    SCREEN_W * 0.7,
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
}

export function drawScreen(ctx: CanvasRenderingContext2D, state: ScreenState) {
  ctx.save();
  ctx.shadowBlur = 0;
  ctx.fillStyle = state.mode === 'off' ? '#0a0d0a' : C.bg;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

  switch (state.mode) {
    case 'boot':
      drawLines(ctx, BOOT_LINES.slice(0, state.lines), state.cursor);
      break;
    case 'home':
      drawHome(ctx, state.cursor);
      break;
    case 'code':
      drawCode(ctx, state.chars, state.cursor);
      break;
    case 'build':
      drawLines(ctx, BUILD_LINES.slice(0, state.lines), state.cursor, { size: 38, lineHeight: 50 });
      break;
  }

  drawScanlines(ctx);
  ctx.restore();
}

/**
 * Canvas 2D usado como textura da tela do computador.
 * Só redesenha quando o estado visível muda.
 */
export class CrtScreen {
  readonly texture: THREE.CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D;
  private key = '';
  private typed = 0;

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    this.ctx = canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
  }

  /** Força o redesenho (ex.: quando as fontes terminam de carregar). */
  invalidate() {
    this.key = '';
  }

  /** Atualiza a tela e retorna quantos caracteres/linhas novos apareceram. */
  update(state: ScreenState) {
    const key = JSON.stringify(state);
    if (key === this.key) return 0;
    this.key = key;

    const typed = state.mode === 'code' ? state.chars : 'lines' in state ? state.lines : 0;
    const added = Math.max(0, typed - this.typed);
    this.typed = typed;

    drawScreen(this.ctx, state);
    this.texture.needsUpdate = true;
    return added;
  }

  dispose() {
    this.texture.dispose();
  }
}
