# Davi Yoshio — Portfólio

Portfólio pessoal de **Davi Yoshio** — Dados, IA & Negócios.
Uma jornada visual em capítulos, da operação de e-commerce à atuação em Data & AI,
com estética premium (off-white, minimalista, estilo Apple/Linear), trilíngue (PT/EN/ES)
e animações suaves.

🔗 **Produção:** https://daviyoshio.github.io/port/

---

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (build e dev server)
- **Tailwind CSS v4** (design system via `@theme` em CSS)
- **Framer Motion 12** (reveal por palavra com blur, scroll-reveal, contadores, 3D card)
- **Lenis** (smooth scroll com inércia)
- Tipografia: **stack do sistema** (`-apple-system` → SF Pro em dispositivos Apple, **Inter** como fallback), escala de pesos 400/600 estilo Apple
- Acento **roxo** (`#7c3aed`) com gradientes no hero e no encerramento
- Deploy: **GitHub Pages** via GitHub Actions

---

## Como rodar localmente

Requer **Node 20+**.

```bash
npm install      # instala as dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173/port/)
npm run build    # build de produção em dist/ (roda tsc + vite build)
npm run preview  # serve o build de produção localmente
npm run lint     # ESLint
```

> Em dev e preview a aplicação roda sob o caminho base `/port/`
> (mesmo caminho do GitHub Pages). Use a URL com esse sufixo.

---

## Deploy no GitHub Pages

O deploy é **automático**: a cada `push` na branch `main`, o workflow
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) instala as dependências,
roda `npm run build` e publica a pasta `dist/`.

Pré-requisitos no repositório (uma única vez):

1. **Settings → Pages → Build and deployment → Source:** `GitHub Actions`.
2. Pronto. O `base` já está configurado como `/port/` em
   [`vite.config.ts`](vite.config.ts) — se o nome do repositório mudar, ajuste essa linha.

Deploy manual alternativo (opcional, via branch `gh-pages`):

```bash
npm i -D gh-pages
npm run deploy
```

---

## Estrutura

```
port/
├─ public/
│  ├─ assets/              # imagens, certificados, decks (pdf), logos e CV
│  └─ favicon.svg
├─ src/
│  ├─ components/          # seções da página
│  │  ├─ Navbar.tsx        # nav sticky + relógio + menu mobile + idioma
│  │  ├─ Hero.tsx          # abertura (gradiente roxo) + HeroBackground (data lab animado)
│  │  ├─ CoinSection.tsx   # moeda 3D girando com as logos da trajetória
│  │  ├─ StorySection.tsx  # capítulos da trajetória (timeline editorial)
│  │  ├─ ImpactStats.tsx   # faixa escura com contadores de impacto
│  │  ├─ Projects.tsx      # projetos em destaque (ProjectCard)
│  │  ├─ SkillsSection.tsx # stack por categoria
│  │  ├─ CertificatesSection.tsx
│  │  ├─ Mindset.tsx       # "Como eu penso" / o diferencial
│  │  ├─ ContactSection.tsx # encerramento + footer (gradiente espelhado)
│  │  ├─ Preloader.tsx     # contador 0→100 + marca barcode
│  │  ├─ SmoothScroll.tsx  # Lenis
│  │  └─ ui/               # primitivas: Button, Tag, Reveal, RevealText, ScrollReveal, Counter, Section, SectionHeading
│  ├─ data/                # CONTEÚDO sem idioma (imagens, links, stacks, certificados)
│  │  ├─ profile.ts        # contatos + CV
│  │  ├─ chapters.ts       # metadados dos capítulos
│  │  ├─ journeyLogos.ts   # logos da moeda 3D
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
├─ index.html              # meta tags, Open Graph, JSON-LD, fonte Inter
└─ vite.config.ts          # base: "/port/"
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
