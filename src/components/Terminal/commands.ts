import { projects } from '../../content/projects';
import { services } from '../../content/services';
import { stackRows } from '../../content/stack';
import { nav, site, socials, whatsapp, yearsCoding } from '../../content/site';

export interface CommandResult {
  output: string[];
  clear?: boolean;
  scrollTo?: string;
  open?: string;
}

const sections = nav.map((item) => item.href.slice(1));

const HELP = [
  'comandos disponíveis:',
  '  sobre       quem é o dev do marketing',
  '  servicos    o que eu faço',
  '  projetos    trabalhos recentes',
  '  abrir <n>   abre o projeto n numa nova aba',
  '  stack       ferramentas',
  '  contato     onde me encontrar',
  '  ls / cd     navegar pelas seções',
  '  clear       limpa a tela',
  '  …e talvez alguns segredos.',
];

export function runCommand(raw: string): CommandResult {
  const [cmd = '', ...args] = raw.trim().toLowerCase().split(/\s+/);
  const arg = args.join(' ');

  switch (cmd) {
    case '':
      return { output: [] };
    case 'help':
    case 'ajuda':
      return { output: HELP };
    case 'sobre':
    case 'whoami':
      return {
        output: [
          `${site.owner}, a.k.a. "${site.brand}".`,
          `${yearsCoding}+ anos construindo sites, landing pages e e-commerce`,
          'com um pé no código e outro no marketing.',
        ],
      };
    case 'servicos':
    case 'serviços':
      return { output: services.map((s, i) => `  [${i + 1}] ${s.title} — ${s.tags.join(', ')}`) };
    case 'projetos':
      return {
        output: [
          ...projects.map((p, i) => `  ${String(i + 1).padStart(2, ' ')}. ${p.title} (${p.kind}, ${p.year})`),
          '',
          "digite 'abrir 1' pra visitar o primeiro.",
        ],
      };
    case 'abrir':
    case 'open': {
      const project = projects[Number(arg) - 1];
      if (!project) return { output: [`projeto "${arg}" não encontrado. tente 'projetos'.`] };
      return { output: [`abrindo ${project.url} …`], open: project.url };
    }
    case 'stack':
      return { output: stackRows.map((row) => '  ' + row.map((k) => k.name).join(' · ')) };
    case 'contato':
      return { output: socials.map((s) => `  ${s.label.padEnd(10, ' ')} ${s.handle}`) };
    case 'ls':
      return { output: [sections.map((s) => `${s}/`).join('  ')] };
    case 'cd': {
      const target = arg.replace(/\/$/, '');
      if (!target || target === '~' || target === '..') return { output: ['voltando ao topo…'], scrollTo: '#inicio' };
      if (!sections.includes(target)) return { output: [`cd: ${arg}: diretório não encontrado`] };
      return { output: [`indo para /${target} …`], scrollTo: `#${target}` };
    }
    case 'clear':
    case 'cls':
      return { output: [], clear: true };
    case 'date':
      return { output: [new Date().toLocaleString('pt-BR')] };
    case 'echo':
      return { output: [args.join(' ')] };
    case 'sudo':
      if (arg.startsWith('contratar') || arg.startsWith('hire')) {
        return { output: ['[sudo] senha aceita. ótima escolha 😉', 'abrindo o WhatsApp…'], open: whatsapp.href };
      }
      return { output: ['permissão negada. tente: sudo contratar'] };
    case 'rm':
      return { output: ['boa tentativa. esse portfólio tem backup. 💾'] };
    case 'exit':
    case 'quit':
      return { output: ['não tem saída. mas tem contato: digite "contato" 👇'] };
    case 'cafe':
    case 'coffee':
      return { output: ['  ( (', '   ) )', ' ........', ' |      |]', ' \\      /', "  `----'   café servido."] };
    default:
      return { output: [`comando não encontrado: ${cmd}. digite 'help'.`] };
  }
}
