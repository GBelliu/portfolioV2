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
    description: 'Páginas pensadas pra campanha: rápidas, fiéis ao layout e prontas pra teste A/B.',
    tags: ['Copy-first', 'A/B test', 'Core Web Vitals'],
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
    description: 'Lojas, apps e integrações para e-commerce, do catálogo ao checkout.',
    tags: ['Integrações', 'Apps', 'Checkout'],
    color: 'var(--yellow)',
  },
  {
    title: 'Tracking & dados',
    label: 'PIXEL_TRACKER.LOG',
    description: 'Eventos de conversão bem configurados pra campanha otimizar com dado de verdade.',
    tags: ['GA4', 'GTM', 'Meta Pixel'],
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
    title: 'Interfaces animadas',
    label: 'UAU_EFFECT.FX',
    description: 'Interações e animações que prendem atenção, tipo esse computador aí em cima.',
    tags: ['GSAP', 'Three.js', 'Motion'],
    color: 'var(--paper)',
  },
];
