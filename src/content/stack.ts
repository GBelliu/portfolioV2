export interface StackKey {
  name: string;
  info: string;
  /** Largura relativa da tecla no teclado. */
  size?: 1 | 1.5 | 2;
  accent?: boolean;
}

export const stackRows: StackKey[][] = [
  [
    { name: 'HTML', info: 'Semântico, acessível e amigo do Google.' },
    { name: 'CSS', info: 'Layouts responsivos, animações e muito grid.' },
    { name: 'JS', info: 'A linguagem que faz tudo isso aqui se mexer.' },
    { name: 'TS', info: 'TypeScript: menos bug, mais confiança no deploy.', accent: true },
    { name: 'React', info: 'Base de quase tudo que eu construo no front.', size: 1.5 },
    { name: 'Next.js', info: 'SSR, SEO e performance pra sites de marketing.', size: 1.5 },
  ],
  [
    { name: 'Vue', info: 'Interfaces reativas em produtos SaaS.' },
    { name: 'Preact', info: 'React em 3kB pra widgets que precisam voar.' },
    { name: 'Laravel', info: 'Back-end PHP elegante pra APIs e painéis.', size: 1.5 },
    { name: 'PHP', info: 'O motor de boa parte da web (e do WordPress).' },
    { name: 'Node', info: 'APIs, scripts e automações em JavaScript.' },
    { name: 'Tailwind', info: 'Estilo rápido sem sair do HTML.', size: 1.5 },
  ],
  [
    { name: 'GSAP', info: 'Animações de scroll como as deste site.', accent: true },
    { name: 'Three.js', info: 'O 3D do computador lá em cima.', size: 1.5 },
    { name: 'WordPress', info: 'CMS clássico, ótimo como headless.', size: 1.5 },
    { name: 'Prismic', info: 'CMS headless pro marketing editar sem dev.' },
    { name: 'GraphQL', info: 'Dados sob medida, sem excesso.' },
  ],
  [
    { name: 'Figma', info: 'Do protótipo ao pixel perfeito.' },
    { name: 'GA4', info: 'Eventos e conversões medidos direito.' },
    { name: 'GTM', info: 'Tags organizadas e sem depender de deploy.' },
    { name: 'Meta Pixel', info: 'Pixel + API de Conversões para campanhas.', size: 1.5 },
    { name: 'SEO', info: 'Estrutura técnica pra ranquear.', accent: true },
    { name: 'Git', info: 'Versionamento e deploy sem susto.' },
  ],
];
