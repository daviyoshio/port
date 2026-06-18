/**
 * Skills grouped by layer. `group` keys map to localized labels in
 * i18n content (skills.groups.<group>). Skill names are proper nouns and
 * stay language-neutral.
 */
export interface SkillGroup {
  group: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    group: "dataAi",
    items: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Machine Learning",
      "LLMs",
      "RAG",
      "Power BI",
    ],
  },
  {
    group: "dataEng",
    items: [
      "Databricks",
      "Apache Spark",
      "Lakehouse",
      "Data Ingestion",
      "Git",
      "LiteLLM",
      "APIs",
      "Platform Engineering",
    ],
  },
  {
    group: "aiEng",
    items: [
      "LangChain",
      "LangGraph",
      "Vertex AI",
      "AI Agents",
      "POCs",
      "AI Tech Docs",
    ],
  },
  {
    group: "dev",
    items: ["HTML", "CSS", "JavaScript", "Java", "Flask", "Quarkus", "C"],
  },
  {
    group: "business",
    items: [
      "E-commerce",
      "SEO",
      "BI & Analytics",
      "Google Analytics",
      "SEMrush",
      "Mercado Livre Ads",
      "Shopee Ads",
      "Meta Ads",
      "Storytelling",
      "Estratégia",
    ],
  },
];
