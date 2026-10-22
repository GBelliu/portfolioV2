export interface Release {
  version: string;
  period: string;
  company: string;
  role: string;
  changes: string[];
  stack: string[];
  tag?: string;
}

/** Trajetória em formato de changelog: da versão mais recente para a mais antiga. */
export const releases: Release[] = [
  {
    version: 'v5.0',
    period: 'jan 2026 — hoje',
    company: 'Mizui',
    role: 'Front-end Pleno',
    tag: 'latest',
    changes: [
      'Features para a suíte SaaS de apps de otimização para e-commerce',
      'Lançamento do SmartCommerce: vendas, pós-venda e CRM numa plataforma só',
      'Componentes reutilizáveis com Vue + TypeScript e IA acelerando as entregas',
    ],
    stack: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    version: 'v4.0',
    period: 'mai 2024 — dez 2025',
    company: 'Desperta Energia',
    role: 'Front-end Júnior → Pleno',
    changes: [
      'Responsável por todo o front-end da plataforma de crédito solar',
      'Componentes documentados no Storybook e testes end-to-end com Cypress',
      'Integração com APIs GraphQL e formulários com React Hook Form',
      'Promovido de júnior a pleno em um ano',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Storybook', 'Cypress'],
  },
  {
    version: 'v3.1',
    period: 'dez 2023 — abr 2024',
    company: 'Grupo MNGT',
    role: 'Web Developer',
    changes: [
      'Sites de 5+ empresas do grupo ao mesmo tempo: seguros, logística, armazenagem, construção e incorporação',
      'Manutenção contínua e melhorias de UX e performance em todos eles',
    ],
    stack: ['React', 'Next.js', 'TypeScript'],
  },
  {
    version: 'v3.0',
    period: 'set 2022 — set 2023',
    company: 'Agência RosaDV',
    role: 'Web Developer',
    changes: [
      'Único dev da agência: do protótipo no Figma ao site no ar',
      '7 clientes entregues de ponta a ponta',
      'Sites em React, Next.js e WordPress',
    ],
    stack: ['React', 'Next.js', 'WordPress', 'Figma'],
  },
  {
    version: 'v2.0',
    period: 'jul 2022 — set 2022',
    company: 'Hablla',
    role: 'Front-end Júnior',
    changes: [
      'Ferramenta de automação de atendimento e vendas',
      'Estado complexo com Redux e código type-safe com TypeScript',
    ],
    stack: ['React', 'Redux', 'TypeScript'],
  },
  {
    version: 'v1.1',
    period: 'set 2021 — jul 2022',
    company: 'SuperSoft Sistemas',
    role: 'Web Developer + Assistente de Marketing',
    tag: 'origem do apelido',
    changes: [
      'Landing pages em React e Next.js para campanhas',
      'Campanhas no Google Ads: configuração, acompanhamento e otimização',
      'Relatórios de performance no Google Analytics para guiar o investimento',
    ],
    stack: ['React', 'Next.js', 'Google Ads', 'Google Analytics'],
  },
  {
    version: 'v1.0',
    period: 'abr 2021 — set 2021',
    company: 'SuperSoft Sistemas',
    role: 'Estágio em desenvolvimento web',
    changes: ['Primeiras interfaces com HTML, CSS, JavaScript e Tailwind', 'Views server-side com PHP e Blade'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'PHP'],
  },
  {
    version: 'v0.1-beta',
    period: 'set 2020 — mar 2021',
    company: 'Super9va Assistência Técnica',
    role: 'Auxiliar técnico',
    changes: ['Antes do código: hardware, manutenção e muito atendimento ao cliente'],
    stack: [],
  },
];
