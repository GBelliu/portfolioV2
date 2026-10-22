export interface Service {
  title: string;
  label: string;
  description: string;
  tags: string[];
  color: string;
}

export const services: Service[] = [
  {
    title: 'Landing pages',
    label: 'LP_QUE_CONVERTE.EXE',
    description: 'Páginas pensadas pra campanha: rápidas, fiéis ao layout e feitas por quem já rodou o anúncio.',
    tags: ['React', 'Next.js', 'Core Web Vitals'],
    color: 'var(--accent)',
  },
  {
    title: 'Sites institucionais',
    label: 'SITE_DA_MARCA.SYS',
    description: 'Sites com CMS que o time de marketing edita sozinho, sem abrir chamado pro dev.',
    tags: ['CMS headless', 'WordPress', 'Next.js'],
    color: 'var(--blue)',
  },
  {
    title: 'E-commerce',
    label: 'LOJA_ONLINE.DAT',
    description: 'Hoje construo apps SaaS de otimização para e-commerce. Sei o que faz uma loja vender mais.',
    tags: ['SaaS', 'Vue', 'Integrações'],
    color: 'var(--yellow)',
  },
  {
    title: 'Tracking & dados',
    label: 'PIXEL_TRACKER.LOG',
    description: 'Já estive do lado de quem roda a campanha. O site nasce pronto pra medir e otimizar.',
    tags: ['Google Analytics', 'Google Ads', 'Relatórios'],
    color: 'var(--phosphor)',
  },
  {
    title: 'Performance & SEO',
    label: 'TURBO_SEO.BAT',
    description: 'Site leve, acessível e bem estruturado pra ser encontrado e carregar em segundos.',
    tags: ['SEO técnico', 'Schema', 'Lighthouse'],
    color: 'var(--pink)',
  },
  {
    title: 'Plataformas & produto',
    label: 'PRODUTO_SAAS.APP',
    description: 'Front-end de produto com componentes reutilizáveis, testes e documentação, do jeito que escala.',
    tags: ['Design system', 'Storybook', 'Cypress'],
    color: 'var(--paper)',
  },
];
