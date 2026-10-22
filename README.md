# dev do marketing

Portfólio de Guilherme Bellissimo — [devdomarketing.com.br](https://devdomarketing.com.br).

Um computador retrô em 3D guia a navegação: ele liga, digita o "sobre" conforme o scroll e, no fim, a câmera entra na tela e leva para o resto do site.

## Stack

- React 19 + TypeScript + Vite
- Three.js via React Three Fiber / drei (cena carregada sob demanda)
- GSAP (ScrollTrigger + SplitText) para animações de scroll
- Lenis para scroll suave

## Scripts

```bash
npm install
npm run dev      # ambiente local
npm run build    # typecheck + build de produção em dist/
npm run preview  # serve o build
npm run lint
```

## Onde editar o conteúdo

Todo o texto fica em `src/content/`:

| Arquivo        | Conteúdo                                       |
| -------------- | ---------------------------------------------- |
| `site.ts`      | marca, ano de início, WhatsApp, redes, menu    |
| `projects.ts`  | projetos (imagens em `public/projects/`) e lab |
| `services.ts`  | disquetes de serviços                          |
| `process.ts`   | etapas do instalador                           |
| `stack.ts`     | teclas do teclado de ferramentas               |

O código que aparece na tela do computador e as mensagens de boot/build ficam em `src/components/Computer/screen.ts`. Os comandos do terminal ficam em `src/components/Terminal/commands.ts`.

## Estrutura

```
src/
  components/
    Computer/   cena 3D, modelo do computador e textura da tela
    Stage/      hero + "sobre" (seção fixa controlada pelo scroll)
    Services/   disquetes
    Projects/   janelas horizontais, dialog e lab
    Process/    instalador
    Stack/      teclado interativo
    Terminal/   terminal com comandos
    Contact/ Footer/ Header/ Loader/ ui/
  content/      textos e dados
  lib/          gsap, scroll suave e estado compartilhado com a cena 3D
```

## Deploy

Site estático: qualquer host de estáticos (Vercel, Netlify, Cloudflare Pages) com comando `npm run build` e diretório `dist`.
