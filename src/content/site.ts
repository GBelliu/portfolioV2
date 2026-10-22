export const site = {
  brand: 'dev do marketing',
  domain: 'devdomarketing.com.br',
  url: 'https://devdomarketing.com.br',
  owner: 'Guilherme Bellissimo Barbosa',
  firstName: 'Guilherme',
  since: 2021,
};

export const yearsCoding = new Date().getFullYear() - site.since;

const whatsappText = encodeURIComponent('Olá, Guilherme! Vim pelo devdomarketing.com.br 👋');

export const whatsapp = {
  label: '(19) 99990-0511',
  href: `https://wa.me/5519999900511?text=${whatsappText}`,
};

export const youtube = {
  name: 'bel',
  handle: '@guibellissimo',
  url: 'https://www.youtube.com/@guibellissimo',
  /** Playlist de uploads do canal (UU + id do canal): sempre mostra os vídeos mais recentes. */
  uploads: 'UUJGs67aqLUgPIueQj9lL9tA',
};

export const socials = [
  { label: 'WhatsApp', handle: whatsapp.label, href: whatsapp.href },
  { label: 'LinkedIn', handle: 'in/guilhermebellissimobarbosa', href: 'https://www.linkedin.com/in/guilhermebellissimobarbosa/' },
  { label: 'GitHub', handle: '@GBelliu', href: 'https://github.com/GBelliu' },
  { label: 'Instagram', handle: '@devdomarketing', href: 'https://www.instagram.com/devdomarketing/' },
  { label: 'Insta pessoal', handle: '@guibellissimo', href: 'https://www.instagram.com/guibellissimo/' },
  { label: 'YouTube', handle: youtube.handle, href: youtube.url },
];

export const nav = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Processo', href: '#processo' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contato', href: '#contato' },
];
