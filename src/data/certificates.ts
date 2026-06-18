import { asset } from "../lib/asset";

/**
 * Certificates grouped into a learning track. `category` maps to a localized
 * label (certificates.categories.<category>). Issuer, title and skill tags are
 * proper nouns / technical terms and stay language-neutral.
 */
export interface Certificate {
  issuer: string;
  title: string;
  skills: string[];
  image: string;
  link: string;
}

export interface CertificateGroup {
  category: string;
  items: Certificate[];
}

const cert = (file: string) => asset(`assets/certificados/${file}`);

export const certificateGroups: CertificateGroup[] = [
  {
    category: "aiCloud",
    items: [
      {
        issuer: "Google Cloud",
        title: "Prompt Design in Vertex AI",
        skills: ["Prompt Engineering", "Vertex AI", "Generative AI"],
        image: cert("google-vertex-ai.png"),
        link: cert("google-vertex-ai.png"),
      },
    ],
  },
  {
    category: "ml",
    items: [
      {
        issuer: "Alura",
        title: "Machine Learning: Classificação com SKLearn",
        skills: ["Machine Learning", "Classificação", "Scikit-learn"],
        image: cert("alura-ml-sklearn.png"),
        link: cert("alura-ml-sklearn.pdf"),
      },
    ],
  },
  {
    category: "dataEng",
    items: [
      {
        issuer: "Databricks Academy",
        title: "Get Started with Databricks for Data Engineering",
        skills: ["Databricks", "Data Engineering", "Lakehouse"],
        image: cert("databricks-get-started-de.png"),
        link: cert("databricks-get-started-de.pdf"),
      },
      {
        issuer: "Databricks Academy",
        title: "DevOps Essentials for Data Engineering",
        skills: ["DevOps", "CI/CD", "Git"],
        image: cert("databricks-devops.png"),
        link: cert("databricks-devops.pdf"),
      },
      {
        issuer: "Databricks Academy",
        title: "Stream Processing and Analysis with Apache Spark",
        skills: ["Apache Spark", "Stream Processing", "Big Data"],
        image: cert("databricks-spark-streaming.png"),
        link: cert("databricks-spark-streaming.pdf"),
      },
      {
        issuer: "Databricks Academy",
        title: "Automated Deployment with Databricks Asset Bundles",
        skills: ["Asset Bundles", "Deploy automation", "IaC"],
        image: cert("databricks-asset-bundles.png"),
        link: cert("databricks-asset-bundles.pdf"),
      },
    ],
  },
  {
    category: "biAnalytics",
    items: [
      {
        issuer: "Databricks Academy",
        title: "Data Warehousing with Databricks",
        skills: ["Data Warehouse", "Dimensional Modeling", "SQL Analytics"],
        image: cert("databricks-data-warehousing.png"),
        link: cert("databricks-data-warehousing.pdf"),
      },
      {
        issuer: "Databricks Academy",
        title: "AI/BI for Data Analysts",
        skills: ["AI/BI", "Business Intelligence", "Dashboards"],
        image: cert("databricks-ai-bi.png"),
        link: cert("databricks-ai-bi.pdf"),
      },
    ],
  },
  {
    category: "business",
    items: [
      {
        issuer: "ESPM",
        title: "Masterclass Branding Elevado à Arte · Caio Amato",
        skills: ["Branding", "Brand Architecture", "Communication"],
        image: cert("espm-branding.jpeg"),
        link: cert("espm-branding.jpeg"),
      },
      {
        issuer: "RL & Associados",
        title: "Six Sigma · White Belt",
        skills: ["Lean Six Sigma", "Process Improvement", "Quality"],
        image: cert("sixsigma-white-belt.jpeg"),
        link: cert("sixsigma-white-belt.jpeg"),
      },
    ],
  },
  {
    category: "soft",
    items: [
      {
        issuer: "Ibmec",
        title: "Projeto em Ciência de Dados II · iSkills",
        skills: ["Soft Skills", "Emotional Intelligence", "Development"],
        image: cert("ibmec-projeto-ii.jpg"),
        link: cert("ibmec-projeto-ii.jpg"),
      },
    ],
  },
];
