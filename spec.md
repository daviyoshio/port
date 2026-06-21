# Build Spec — Portfolio site (clone de andreigorskikh.digital)

## Objetivo
Reconstruir um site de portfólio one-page de UI designer, estilo editorial/técnico, com gradiente laranja, tipografia serif + mono, e animações de reveal dirigidas por scroll. Referência: andreigorskikh.digital (feito em Framer; vamos refazer em código).

## Stack recomendada
- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS** para estilo
- **Framer Motion** para animações (o original usa Framer Motion)
- **Lenis** para smooth scroll (opcional, melhora os reveals dirigidos por scroll)
- 3D opcional: **Spline** (`@splinetool/react-spline`) para o logo "AG" rotativo. Se não quiser 3D, usar um placeholder/imagem.

---

## Design tokens

### Cores
```css
--bg: #FFFFFF;            /* fundo padrão */
--ink: #0A0A0A;          /* texto principal / fundo do preloader */
--orange: #FF5900;       /* acento (rgb 255,89,0) — exato do site */
--orange-soft: #FF6B1A;  /* meio do gradiente do hero */
--gray: #8A8A8A;         /* subtítulos, descrições secundárias */
--tag-bg: #F2F2F2;       /* fundo das pílulas/tags */
--line: #E6E6E6;         /* divisórias entre rows */
```

### Gradiente do hero (full-width, ocupa a viewport)
Topo escuro → laranja vibrante → branco embaixo:
```css
background: linear-gradient(180deg,
  #3A2114 0%,
  #FF6B1A 45%,
  #FFB98A 70%,
  #FFFFFF 100%);
```
O **footer** usa o gradiente espelhado (branco em cima → laranja embaixo).

### Tipografia (Google Fonts)
```
Instrument Serif (400)  → títulos/headlines (serif elegante)
Geist (400/500)         → corpo de texto
Geist Mono (400)        → labels uppercase, tags, relógio textual, metadados
Doto (400/700)          → contadores numéricos e relógio "dot-matrix"
```
Link:
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500&family=Geist+Mono&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

### Escala tipográfica (desktop, valores reais medidos)
- Hero headline (`h1`): **64px**, Instrument Serif, 400, line-height ~1.1, centralizado
- Títulos de seção: **48px**, Instrument Serif, 400
- Títulos de projeto: ~40–48px, Instrument Serif
- Labels mono (uppercase): **12–16px**, Geist Mono, letter-spacing ~0.06em
- Nome no card: **18px** mono; cargo: **16px** mono cinza
- Corpo: 14–16px, Geist

### Espaçamento / layout
- Container central estreito para texto (~640–780px); seções full-bleed para imagens
- Rows de listas (experiência/skills/projetos): grid 2 colunas — label/título à esquerda, conteúdo à direita; range de anos alinhado à direita
- Páginas longas com bastante respiro vertical entre seções

---

## Estrutura das seções (ordem)

1. **Preloader** (overlay full-screen)
2. **Header fixo** (logo + WORKS · 2 relógios ao vivo · CONTACT ME + avatar)
3. **Hero** (gradiente laranja, headline, card de perfil flutuante)
4. **Work principles** — 3 cards (01/02/03)
5. **Intro/expertise** — parágrafo grande com reveal por palavra
6. **Seção 3D** — logo "AG" (moeda preta) rotacionando, fundo muda de cor com scroll
7. **Projects** — lista de cases (imagem grande + título serif + descrição + tags + links)
8. **Expertise / Work experience** — timeline em rows
9. **Skillset and soft knowledge** — rows numeradas (01–04) + ícones de software
10. **Awards** — carrossel horizontal de cards (selo "UI" / ícone Tilda)
11. **Testimonials** — depoimento serif centralizado, navegação (01/02) + setas
12. **Footer "TIME TO CONNECT"** — gradiente espelhado, headline reveal, links sociais, GET IN TOUCH, ©2026

### Header — detalhes
- Esquerda: dois ícones de logo (A / G) + link "WORKS"
- Centro: dois relógios ao vivo. Formato: `CIDADE` / `HH MM AM (GMT±X)`. Dígitos `HH` e `MM` em fonte **Doto** sobre fundo translúcido; resto em Geist Mono. Novi Sad = GMT+1, Chisinau = GMT+2. Atualiza a cada segundo.
- Direita: "CONTACT ME" + avatar pequeno

### Card de perfil (hero)
- Fundo branco translúcido + `backdrop-filter: blur`, border 1px sutil, border-radius ~16px
- Avatar 64×64 (laranja, radius ~10px) à esquerda
- Badge "AVAILABLE FOR WORK •" no topo: texto laranja, borda **tracejada** laranja, pill
- Nome "ANDREI GORSKIKH" (mono uppercase) + "UI-DESIGNER, TEAM-LEAD" (mono cinza)
- Setinhas/brackets laranjas nas laterais que entram deslizando

### Padrões repetidos
- **Logo "barcode"** laranja (conjunto de barras verticais) + "A. GORSKIKH" aparece como marcador no início de cada seção principal
- **Contadores** entre parênteses na fonte Doto: `(100)`, `(015)`, `(34)`, `(020)` etc. — alguns animam com o scroll
- **Range de anos** decorativo no canto: `( 2004 — 2037 )`
- **Tags/pílulas** mono uppercase em fundo cinza claro: `UI-DESIGN`, `UX-RESEARCH`, `DESIGN SYSTEM`, `NO-CODE`, `WEB-DESIGN`, etc.
- Links com seta: `LIVE WEBSITE ↗`, `BEHANCE CASE STUDY ↗`

---

## ANIMAÇÕES (o coração do site)

> Easings reais usados no site: `cubic-bezier(0.2, 0, 0, 1)` (principal) e `cubic-bezier(0.4, 0, 0.2, 1)`.
> Ingrediente comum a quase tudo: **opacity + blur + leve translate**, com **stagger**.

### A. Preloader (intro)
1. Overlay full-screen `#0A0A0A`. No centro: logo barcode laranja + contador **(0)→(100)** na fonte Doto.
2. Ao chegar em 100, o overlay some (fade/clip) revelando o hero.
3. Hero entra: header faz fade-in; card de perfil entra com **rotação 3D** (`rotateX/rotateY` partindo de ~20°/-15°, perspective ~1000px) + opacity 0→1; brackets entram com `translateX(32px)→0`.

### B. Headline com reveal por palavra (blur + opacity, temporizado)
O `<h1>` é dividido por palavra; cada palavra anima `opacity 0→1`, `filter blur(8px)→0`, `y 8→0`, com **stagger** (~0.04s por palavra).

### C. Reveal de texto dirigido por scroll (efeito-assinatura)
Parágrafos longos revelam **palavra por palavra conforme você rola**. Palavras ainda não atingidas ficam borradas + esmaecidas; clareiam ao entrar. Usa `useScroll`/`useTransform` mapeando o progresso do scroll para cada palavra.

### D. Cards com stagger ao entrar na viewport
Cards (Work principles, etc.) entram com `opacity 0→1`, `y 30→0`, `blur 4→0`, em sequência (delay incremental ~0.12s), via `whileInView`.

### E. Contadores animados por scroll
Números entre parênteses nos títulos (`(015)→(03)`) e medidores mudam conforme a seção entra na viewport (mapear `scrollYProgress` → número, padded com zero, fonte Doto).

### F. Seção 3D "AG"
Disco/moeda preta com logo "AG" em relevo que **rotaciona em 3D conforme o scroll**, enquanto o fundo da seção transiciona de cor (laranja escuro → azul → branco). Implementar com Spline ou, como fallback, sprite/imagem com `rotate` ligado ao scroll.

### G. Carrossel de Awards
Lista horizontal de cards que rola lateralmente (drag + auto). Cada card: label mono (ex.: `DPROFILE, UI`) + ano, selo "UI" (medalha) ou ícone da plataforma, nome do projeto, descrição curta, link ↗.

### H. Testimonials
Depoimento em Instrument Serif grande, centralizado. Navegação `( 01 / 02 )` + setas ‹ ›. Troca com fade/slide entre depoimentos.

---

## Snippets de referência (Framer Motion)

```tsx
export const EASE = [0.2, 0, 0, 1] as const;

// Headline reveal por palavra (temporizado)
function BlurHeadline({ text }: { text: string }) {
  return (
    <h1 className="font-serif text-[64px] leading-[1.1] text-center text-white">
      {text.split(" ").map((w, i) => (
        <motion.span key={i} className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}>
          {w}
        </motion.span>
      ))}
    </h1>
  );
}

// Reveal de parágrafo dirigido por scroll
function ScrollReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="font-serif text-[40px] leading-snug">
      {words.map((w, i) => {
        const a = i / words.length, b = a + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [a, b], [0.15, 1]);
        const blur = useTransform(scrollYProgress, [a, b], [6, 0]);
        const filter = useTransform(blur, (v) => `blur(${v}px)`);
        return <motion.span key={i} style={{ opacity, filter }} className="inline-block mr-[0.25em]">{w}</motion.span>;
      })}
    </p>
  );
}

// Card com rotação 3D (intro)
<motion.div style={{ transformPerspective: 1000 }}
  initial={{ opacity: 0, rotateX: 20, rotateY: -15, scale: 0.95 }}
  animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
  transition={{ duration: 0.8, ease: EASE, delay: 0.2 }} />

// Stagger de cards na viewport
<motion.div
  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }} />

// Relógio ao vivo
function Clock({ gmt }: { gmt: number }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const d = new Date(utc + gmt * 3600000);
      let h = d.getHours(); const ampm = h >= 12 ? "AM" : "AM"; // ver original; usa AM no print
      const hh = String(h % 24).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setT(`${hh} ${mm}`);
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [gmt]);
  return <span style={{ fontFamily: "Doto" }}>{t}</span>;
}

// Contador do preloader 0→100
function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => {
      if (v >= 100) { clearInterval(id); onDone(); return 100; }
      return v + 2;
    }), 20);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fixed inset-0 bg-[#0A0A0A] grid place-items-center z-50">
      {/* logo barcode aqui */}
      <span style={{ fontFamily: "Doto" }} className="text-[#FF5900]">({n})</span>
    </div>
  );
}
```

---

## Conteúdo (textos reais para preencher)

**Hero headline:** "Making complex interface design for companies and brands that move forward"

**Work principles (01/02/03):**
- Stable qualitate result preventing mistakes — *Stable, high-quality results built on experience across working in multiple teams on different kinds of interfaces and digital products — helping prevent issues before they appear.*
- End-to-end knowledge of digital product creation — *Full-cycle digital design, from UX research and concept to UI, design systems, animation, 3D, and no-code implementation — delivering seamless, high-quality products.*
- UI shaped by brand identity and strategy — *Diving deep into brand positioning and collaborating closely with brand designers, I ensure digital interfaces reuse and extend visual elements in the interface design.*

**Intro expertise:** "I design digital products end to end, combining reliable functionality with high-quality UI aligned to brand strategy. I work with agencies and private clients."

**Projects:** Polymorphic capital (2025), A-sens (2025), Paper Solutions Manfioletti GMBH (2025), European fintech products landings and presentations (2025), E-commerce website for a fashion brand (2025), NDA-project: BTC-deployment strategy company website (2025).

**Work experience:** PROOF OF WORK (2025–NOW), Easy Digital Agency & Understand Agency (2023–2025), Rattlesnake Agency (2024–NOW), Polydev Agency (2020–2023).

**Skillset (01–04):** UX and research · UI-design · Soft for everyday work and content creation · Development soft and skills.

**Awards:** Polymorphic Capital, Russian Museum, A-Sens, Paper Solutions Manfioletti GmbH, Alloda.crm, Myidem, Bechtel, Amstep, Smartjet (com fonte: Behance/DPROFILE/Made on Tilda + ano).

**Footer:** "TIME TO CONNECT" · "Whether you need a designer for your project or agency, have a question, or just want to say hi" · GET IN TOUCH · PRIVACY POLICY · LinkedIn · DPROFILE · Behance · Dribbble · Telegram · andreygorskikh2000@gmail.com · ©2026.

> Substitua nome/email/links pelos seus — não copie a identidade pessoal de outra pessoa num site de produção.

---

## Checklist de implementação
- [ ] Setup Next + Tailwind + Framer Motion + fontes
- [ ] Tokens de cor/tipografia no Tailwind config
- [ ] Header fixo com relógios ao vivo
- [ ] Preloader com contador 0→100
- [ ] Hero (gradiente + headline reveal + card 3D)
- [ ] Componente `ScrollReveal` reutilizável
- [ ] Componente `StaggerCards`
- [ ] Componente `ScrollCounter`
- [ ] Seção 3D (Spline ou fallback)
- [ ] Lista de projetos
- [ ] Timelines (experiência/skills) com reveal por row
- [ ] Carrossel de awards
- [ ] Testimonials com navegação
- [ ] Footer com gradiente espelhado
- [ ] Responsivo (mobile: header colapsa, headline reduz, grids viram 1 coluna)
- [ ] Smooth scroll (Lenis) + `prefers-reduced-motion`