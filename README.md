# Davi Yoshio — Portfólio

Portfólio pessoal de **Davi Yoshio** — Dados, IA & Negócios.
Uma jornada visual em capítulos, da operação de e-commerce à atuação em Data & AI,
com estética premium (off-white, minimalista, estilo Apple/Linear), trilíngue (PT/EN/ES)
e animações suaves.

🔗 **Produção:** https://daviyoshio.github.io/my-storyboard/

---

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (build e dev server)
- **Tailwind CSS v4** (design system via `@theme` em CSS)
- **Framer Motion 12** (animações, scroll reveal, contadores, microinterações)
- Deploy: **GitHub Pages** via GitHub Actions

---

## Como rodar localmente

Requer **Node 20+**.

```bash
npm install      # instala as dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173/my-storyboard/)
npm run build    # build de produção em dist/ (roda tsc + vite build)
npm run preview  # serve o build de produção localmente
npm run lint     # ESLint
```

> Em dev e preview a aplicação roda sob o caminho base `/my-storyboard/`
> (mesmo caminho do GitHub Pages). Use a URL com esse sufixo.

---

## Deploy no GitHub Pages

O deploy é **automático**: a cada `push` na branch `main`, o workflow
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) instala as dependências,
roda `npm run build` e publica a pasta `dist/`.

Pré-requisitos no repositório (uma única vez):

1. **Settings → Pages → Build and deployment → Source:** `GitHub Actions`.
2. Pronto. O `base` já está configurado como `/my-storyboard/` em
   [`vite.config.ts`](vite.config.ts) — se o nome do repositório mudar, ajuste essa linha.

Deploy manual alternativo (opcional, via branch `gh-pages`):

```bash
npm i -D gh-pages
npm run deploy
```

---

## Estrutura

```
my-storyboard/
├─ public/
│  └─ assets/              # imagens, certificados (png/pdf) e CV — servidos como estão
├─ src/
│  ├─ components/          # seções da página
│  │  ├─ Navbar.tsx        # nav sticky + menu mobile + idioma
│  │  ├─ Hero.tsx          # abertura + HeroVisual (painel de dados animado)
│  │  ├─ StorySection.tsx  # capítulos da trajetória (timeline editorial)
│  │  ├─ ImpactStats.tsx   # evidências de impacto + contadores
│  │  ├─ Projects.tsx      # projetos em destaque (ProjectCard)
│  │  ├─ SkillsSection.tsx # stack por categoria
│  │  ├─ CertificatesSection.tsx
│  │  ├─ Mindset.tsx       # "Como eu penso" / o diferencial
│  │  ├─ ContactSection.tsx + Footer.tsx
│  │  └─ ui/               # primitivas: Button, Tag, Reveal, Counter, Section, SectionHeading
│  ├─ data/                # CONTEÚDO sem idioma (imagens, links, stacks, certificados)
│  │  ├─ profile.ts        # contatos + CV
│  │  ├─ chapters.ts       # metadados dos capítulos
│  │  ├─ projects.ts       # projetos (título, imagem, links opcionais)
│  │  ├─ skills.ts         # skills por categoria
│  │  └─ certificates.ts   # certificados agrupados por categoria
│  ├─ i18n/
│  │  ├─ content.ts        # TODO o texto traduzido (PT/EN/ES)
│  │  └─ LanguageContext.tsx
│  ├─ hooks/useScrollSpy.ts
│  ├─ lib/                 # asset() (base URL) e EASE (curva de animação)
│  ├─ index.css            # design system (tokens, base, primitivas)
│  ├─ App.tsx / main.tsx
│  └─ vite-env.d.ts
├─ index.html              # meta tags, Open Graph, fonte Inter
└─ vite.config.ts
```

### Onde editar o quê

- **Textos (PT/EN/ES):** `src/i18n/content.ts`.
- **Projetos:** `src/data/projects.ts` (imagem, título, links) + `src/i18n/content.ts`
  (`projects.items.<id>`: kicker, descrição, tags).
- **Certificados:** `src/data/certificates.ts`.
- **Skills:** `src/data/skills.ts` (itens) + `content.ts` (`skills.groups` = rótulos).
- **Contato / CV:** `src/data/profile.ts`.
- **Cores, tipografia, sombras, raios:** bloco `@theme` em `src/index.css`.

---

## Acessibilidade & performance

- HTML semântico, hierarquia de headings, `aria-label`/`aria-current`, skip-link.
- Foco visível para navegação por teclado.
- Respeita `prefers-reduced-motion` (via `MotionConfig reducedMotion="user"` + fallback CSS).
- Imagens com `loading="lazy"` e `alt` descritivo.
- Meta `title`, `description` e Open Graph configurados em `index.html`.
