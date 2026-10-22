export interface Project {
  slug: string;
  title: string;
  kind: string;
  year: number;
  summary: string;
  stack: string[];
  url: string;
  image: string;
  partner?: string;
}

export interface LabProject {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  url: string;
}

export const projects: Project[] = [
  {
    slug: 'area-incrivel',
    title: 'Área Incrível',
    kind: 'Site institucional',
    year: 2024,
    partner: 'Grupo MNGT',
    summary:
      'Site da incorporadora Área Incrível, focado no institucional e na vitrine dos empreendimentos em lançamento.',
    stack: ['React', 'TypeScript', 'Vite', 'Styled Components'],
    url: 'https://area-incrivel.vercel.app/',
    image: '/projects/area-incrivel.webp',
  },
  {
    slug: 'mubec',
    title: 'Mubec',
    kind: 'Site + catálogo',
    year: 2023,
    summary:
      'Site institucional com catálogo de produtos gerenciável pelo time da Mubec, fabricante de fixadores.',
    stack: ['Next.js', 'TypeScript', 'Styled Components', 'Prismic'],
    url: 'https://mubec.com.br/',
    image: '/projects/mubec.webp',
  },
  {
    slug: 'informo',
    title: 'Informo Tecnologia',
    kind: 'Site + blog',
    year: 2023,
    partner: 'Agência RosaDV',
    summary: 'Site institucional com blog usando WordPress como CMS headless e imagens otimizadas via Cloudinary.',
    stack: ['Next.js', 'TypeScript', 'WordPress', 'Cloudinary'],
    url: 'https://informo.com.br/',
    image: '/projects/informo.webp',
  },
  {
    slug: 'cascex',
    title: 'CASCEX',
    kind: 'Site institucional',
    year: 2023,
    partner: 'Agência RosaDV',
    summary: 'Site institucional da CASCEX, desenvolvido em parceria com a Agência RosaDV.',
    stack: ['React', 'TypeScript', 'Styled Components', 'Cloudinary'],
    url: 'https://www.cascex.com/',
    image: '/projects/cascex.webp',
  },
  {
    slug: 'rosadv',
    title: 'RosaDV — Identidade Visual',
    kind: 'Landing page',
    year: 2023,
    partner: 'Agência RosaDV',
    summary: 'Landing page de venda do serviço de criação de marca oferecido pela própria agência.',
    stack: ['React', 'TypeScript', 'Styled Components'],
    url: 'https://identidadevisual.rosadv.com.br',
    image: '/projects/rosadv.webp',
  },
  {
    slug: 'escritorio-bizarro',
    title: 'Escritório Bizarro',
    kind: 'Site institucional',
    year: 2023,
    summary: 'Site do escritório contábil Bizarro, com apresentação de serviços e carrosséis de conteúdo.',
    stack: ['Next.js', 'TypeScript', 'Styled Components', 'Swiper'],
    url: 'https://escritorio-bizarro.vercel.app',
    image: '/projects/escritorio-bizarro.webp',
  },
];

export const lab: LabProject[] = [
  {
    slug: 'spotify-clone',
    title: 'spotify-clone',
    summary: 'Clone do Spotify com assinatura, upload e player.',
    stack: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL', 'Tailwind'],
    url: 'https://spotify-clone-gbelliu.vercel.app/',
  },
  {
    slug: 'netflix-clone',
    title: 'netflix-clone',
    summary: 'Clone da interface da Netflix consumindo API de filmes.',
    stack: ['React'],
    url: 'https://netflix-react-js-th82.vercel.app/',
  },
  {
    slug: 'lista-de-presenca',
    title: 'lista-de-presenca',
    summary: 'Lista de presença com dados de perfil vindos da API do GitHub.',
    stack: ['React', 'GitHub API'],
    url: 'https://discover-lista-de-presenca-reactjs.vercel.app/',
  },
  {
    slug: 'api-user-adonis',
    title: 'api-user-adonisjs',
    summary: 'API REST de cadastro e listagem de usuários.',
    stack: ['AdonisJS', 'Node.js'],
    url: 'https://github.com/GBelliu/api-user-AdonisJS',
  },
];
