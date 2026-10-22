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
    { name: 'TS', info: 'TypeScript em tudo desde 2022: menos bug, mais confiança.', accent: true },
    { name: 'React', info: 'Base da maior parte dos sites e plataformas que construí.', size: 1.5 },
    { name: 'Next.js', info: 'SSR e SEO pra sites de marketing e institucionais.', size: 1.5 },
  ],
  [
    { name: 'Vue', info: 'Meu dia a dia hoje em produtos SaaS de e-commerce.', accent: true },
    { name: 'Redux', info: 'Estado complexo previsível em ferramentas de automação.' },
    { name: 'Tailwind', info: 'Estilo rápido e consistente sem sair do HTML.', size: 1.5 },
    { name: 'Sass', info: 'CSS organizado em design systems.' },
    { name: 'MUI', info: 'Componentes prontos e acessíveis pra produto.' },
    { name: 'Styled', info: 'Styled Components: estilo junto do componente.', size: 1.5 },
  ],
  [
    { name: 'GSAP', info: 'Animações de scroll como as deste site.' },
    { name: 'Three.js', info: 'O 3D do computador lá em cima.', size: 1.5 },
    { name: 'WordPress', info: 'Sites de clientes que o marketing edita sozinho.', size: 1.5 },
    { name: 'PHP', info: 'Views server-side com Blade desde o estágio.' },
    { name: 'GraphQL', info: 'Dados sob medida entre front e back.' },
    { name: 'Prismic', info: 'CMS headless pro marketing editar sem dev.' },
  ],
  [
    { name: 'Figma', info: 'Protótipos validados antes de uma linha de código.' },
    { name: 'Storybook', info: 'Componentes documentados pro time todo usar.', size: 1.5 },
    { name: 'Cypress', info: 'Testes end-to-end pra não quebrar nada no deploy.' },
    { name: 'Google Ads', info: 'Já rodei campanhas: sei o que a LP precisa entregar.', size: 1.5, accent: true },
    { name: 'Analytics', info: 'Comportamento e conversão medidos pra decidir com dado.' },
    { name: 'Git', info: 'Versionamento e deploy sem susto.' },
  ],
];
