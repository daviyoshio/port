import { asset } from "../lib/asset";

/**
 * Language-neutral project metadata. Localized copy (kicker, description, tags)
 * is keyed by `id` in i18n content. To add a project: add an entry here and a
 * matching `projects.items.<id>` block in src/i18n/content.ts.
 *
 * Links are optional — buttons render only when a URL is provided, so a project
 * without a live demo / repo / deck degrades gracefully.
 */
export interface ProjectMeta {
  id: string;
  title: string;
  image: string;
  alt: string;
  liveUrl?: string;
  codeUrl?: string;
  deckUrl?: string;
}

export const projects: ProjectMeta[] = [
  {
    id: "tatiart",
    title: "Tatiart",
    image: asset("assets/img/projeto-tatiart.jpg"),
    alt: "Plataforma web Tatiart focada em conversão e SEO",
    // liveUrl: "https://...",
    // codeUrl: "https://github.com/...",
  },
  {
    id: "cittamobi",
    title: "Cittamobi",
    image: asset("assets/img/projeto-cittamobi.jpg"),
    alt: "Análise de dados e dashboards do projeto Cittamobi",
    // codeUrl: "https://github.com/...",
    // deckUrl: "https://...",
  },
  {
    id: "aurora",
    title: "Aurora Viridis",
    image: asset("assets/img/projeto-aurora-viridis.jpg"),
    alt: "Projeto de negócio Aurora Viridis para o mercado de energia",
    // deckUrl: "https://...",
  },
  {
    id: "monevo",
    title: "Monevo",
    image: asset("assets/img/projeto-monevo.jpg"),
    alt: "Conceito de produto Monevo para organização financeira",
    // deckUrl: "https://...",
  },
];
