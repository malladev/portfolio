import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TechBand from "./components/TechBand.jsx";

// Everything below the first screen is loaded on demand
const About = lazy(() => import("./components/About.jsx"));
const Process = lazy(() => import("./components/Process.jsx"));
const Projects = lazy(() => import("./components/Projects.jsx"));
const Services = lazy(() => import("./components/Services.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

// The browser tries to reach a #section link before lazy sections exist, so retry once they do.
function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);
  return null;
}

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TechBand />

        {/* One boundary: the sections appear together instead of popping in one by one */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
          <Process />
          <Projects />
          <Services />
          <Contact />
          <ScrollToHash />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
