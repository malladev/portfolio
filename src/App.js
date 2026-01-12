import { lazy, Suspense } from "react";
import About from "./components/About.jsx";
import { Contact } from "./components/Contact.tsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Portfolio from "./components/Portfolio.jsx";
import { Projects } from "./components/Projects.tsx";
import UXUIExpertise from "./components/UXUIExpertise.tsx";
import PerformanceSecurity from "./components/PerformanceSecurity.tsx";
import Service from "./components/Service.jsx";

// Lazy load heavy components for better performance
const BackToTop = lazy(() => import("./components/BackToTop.tsx"));

function App() {
  return (
    <div>
      <Hero />
      <About />
      <UXUIExpertise />
      <PerformanceSecurity />
      <Projects />
      <Portfolio />
      <Service />
      <Contact />
      <Footer />
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  );
}

export default App;
