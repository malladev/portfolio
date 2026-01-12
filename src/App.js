import { lazy, Suspense } from "react";
import Hero from "./components/Hero.jsx";

// Lazy load all non-critical components for better performance
const About = lazy(() => import("./components/About.jsx"));
const ContactModule = lazy(() => import("./components/Contact.tsx").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer.jsx"));
const Portfolio = lazy(() => import("./components/Portfolio.jsx"));
const ProjectsModule = lazy(() => import("./components/Projects.tsx").then(module => ({ default: module.Projects })));
const UXUIExpertise = lazy(() => import("./components/UXUIExpertise.tsx"));
const PerformanceSecurity = lazy(() => import("./components/PerformanceSecurity.tsx"));
const Service = lazy(() => import("./components/Service.jsx"));
const BackToTop = lazy(() => import("./components/BackToTop.tsx"));

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-950 animate-pulse">
    <div className="h-96 bg-gray-900/50"></div>
  </div>
);

function App() {
  return (
    <main>
      {/* Hero is critical - load immediately */}
      <Hero />
      
      {/* Lazy load all other sections */}
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <UXUIExpertise />
      </Suspense>
      <Suspense fallback={null}>
        <PerformanceSecurity />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectsModule />
      </Suspense>
      <Suspense fallback={null}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={null}>
        <Service />
      </Suspense>
      <Suspense fallback={null}>
        <ContactModule />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </main>
  );
}

export default App;
