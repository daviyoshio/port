import { asset } from "../lib/asset";

/**
 * Language-neutral metadata for the story chapters.
 * Localized copy (title, body, tags) is keyed by `id` in i18n content.
 * `side` controls the editorial alternating layout (media left/right).
 */
export interface ChapterMeta {
  id: string;
  image: string;
  alt: string;
  side: "left" | "right";
}

export const chapters: ChapterMeta[] = [
  {
    id: "origem",
    image: asset("assets/img/capitulo-origem.jpg"),
    alt: "Início em vendas, empreendedorismo e e-commerce",
    side: "right",
  },
  {
    id: "operacao",
    image: asset("assets/img/capitulo-operacao.jpg"),
    alt: "Rotina corporativa e operação na Yamá Cosméticos",
    side: "left",
  },
  {
    id: "lideranca",
    image: asset("assets/img/capitulo-lideranca.jpg"),
    alt: "Liderança e crescimento da operação de e-commerce",
    side: "right",
  },
  {
    id: "virada",
    image: asset("assets/img/capitulo-virada.jpg"),
    alt: "A virada para dados e inteligência artificial",
    side: "left",
  },
  {
    id: "academico",
    image: asset("assets/img/capitulo-academico.jpg"),
    alt: "Formação em Ciência de Dados e IA, hackathons e projetos",
    side: "right",
  },
  {
    id: "pagbank",
    image: asset("assets/img/capitulo-pagbank.jpeg"),
    alt: "Davi Yoshio no PagBank, atuando em Data & AI",
    side: "left",
  },
];
