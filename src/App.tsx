import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./components/Hero";
import { StorySection } from "./components/StorySection";
import { ImpactStats } from "./components/ImpactStats";
import { Projects } from "./components/Projects";
import { SkillsSection } from "./components/SkillsSection";
import { CertificatesSection } from "./components/CertificatesSection";
import { Mindset } from "./components/Mindset";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <LanguageProvider>
      {/* reducedMotion="user" makes every motion component honour the OS setting */}
      <MotionConfig reducedMotion="user">
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Ir para o conteúdo
        </a>

        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <StorySection />
          <ImpactStats />
          <Projects />
          <SkillsSection />
          <CertificatesSection />
          <Mindset />
          <ContactSection />
        </main>

        <Footer />
      </MotionConfig>
    </LanguageProvider>
  );
}
