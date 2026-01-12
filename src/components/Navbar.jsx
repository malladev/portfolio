import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

// Separate navlinks into its own module or keep memoized in the same component
export const navlinks = [
  { id: 1, nameKey: "nav.about", href: "#about" },
  { id: 2, nameKey: "nav.services", href: "#service" },
  { id: 4, nameKey: "nav.projects", href: "#project" },
];

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Memoize the navlinks array to avoid unnecessary re-renders
  const memoizedNavLinks = useMemo(() => navlinks, []);

  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.substring(1));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", // Enable smooth scroll
      });
    }
    // Close mobile menu if open
    setMobileMenu(false);
  }, []);

  const handleContactClick = useCallback((e) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenu(false);
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
          }
        });
      },
      { threshold: 0.7 }
    );

    // Store section selectors more dynamically
    const sections = ["about", "tech", "contact", "project", "service"];
    const sectionElements = sections.map((id) => document.getElementById(id));

    sectionElements.forEach((section) => {
      if (section) sectionObserver.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        if (section) sectionObserver.unobserve(section);
      });
    };
  }, []);

  // Effect to toggle scroll lock when mobile menu is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (mobileMenu) {
      document.body.style.overflow = "hidden"; // Lock scroll on menu open
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle; // Cleanup scroll lock
    };
  }, [mobileMenu]);

  return (
    <nav className="w-full bg-gray-950 mx-auto" role="navigation" aria-label={t('nav.mainNavigation')}>
      {/* Skip to main content link */}
      <a href="#about" className="skip-to-main">
        {t('nav.skipToContent')}
      </a>
      
      {/* Desktop Navbar */}
      <div className="hidden relative max-w-6xl mx-auto w-full p-4 gap-5 lg:flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:duration-500 hover:transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg"
          aria-label={t('nav.backToHome')}
        >
          <img
            className="rounded-full w-44 object-cover"
            src="./assets/favicon.webp"
            alt="Photo de profil - Mohamed Lamine KONE"
            loading="lazy"
            width="176"
            height="176"
          />
        </a>
        <div className="flex items-center lg:gap-x-8 md:gap-x-6">
          {memoizedNavLinks.map((nav) => (
            <a
              key={nav.id}
              href={nav.href}
              onClick={(e) => handleLinkClick(e, nav.href)}
              className="text-gray-300 font-medium hover:border-b-2 hover:border-b-indigo-500 hover:text-indigo-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded px-2 py-1"
              aria-label={`${t('nav.goToSection')} ${t(nav.nameKey)}`}
            >
              {t(nav.nameKey)}
            </a>
          ))}
          
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-gray-300 font-medium hover:text-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg border border-gray-700 hover:border-indigo-500"
            aria-label={t('nav.switchLanguage')}
            title={t('nav.switchLanguage')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span className="text-sm font-semibold">{language === 'fr' ? 'EN' : 'FR'}</span>
          </button>

          {/* Contact Me Button */}
          <button
            onClick={handleContactClick}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            aria-label={t('nav.contactMe')}
          >
            {t('nav.contactMe')}
          </button>
        </div>
      </div>

      {/* Mobile and Tablet Navbar */}
      <div className="lg:hidden z-[999] p-3.5">
        <div className="flex items-center gap-5 justify-between">
          <img
            className="rounded-full w-32 object-cover"
            src="./assets/favicon.webp"
            alt="Photo de profil - Mohamed Lamine KONE"
            loading="lazy"
            width="128"
            height="128"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            onClick={() => setMobileMenu(true)}
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
            aria-label={t('nav.openMenu')}
            aria-expanded={mobileMenu}
            aria-controls="mobile-menu"
          >
            <path
              fill="currentColor"
              className="text-gray-200"
              d="M4 18h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h8c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1H4c-.55 0-1 .45-1 1m17.3 7.88L17.42 12l2.88-2.88a.996.996 0 1 0-1.41-1.41L15.3 11.3a.996.996 0 0 0 0 1.41l3.59 3.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42"
            ></path>
          </svg>
        </div>
      </div>
      
      {mobileMenu && (
        <div 
          id="mobile-menu"
          className="h-screen z-[999] bg-gray-950 absolute inset-0 p-5"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobileMenu')}
        >
          {/* Background effect for mobile menu */}
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          {/* Close button */}
          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded"
              aria-label={t('nav.closeMenu')}
            >
              <path
                fill="currentColor"
                className="text-gray-200"
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"
              ></path>
            </svg>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col items-center gap-y-8 pt-20">
            {memoizedNavLinks.map((nav) => (
              <a
                key={nav.id}
                href={nav.href}
                onClick={(e) => handleLinkClick(e, nav.href)}
                className="text-gray-300 font-medium hover:border-b-2 hover:border-b-indigo-500 hover:text-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded px-2 py-1 text-lg"
                aria-label={`${t('nav.goToSection')} ${t(nav.nameKey)}`}
              >
                {t(nav.nameKey)}
              </a>
            ))}
            
            {/* Language Toggle Button - Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-3 text-gray-300 font-medium hover:text-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg border border-gray-700 hover:border-indigo-500"
              aria-label={t('nav.switchLanguage')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span className="text-base font-semibold">
                {language === 'fr' ? 'English' : 'Français'}
              </span>
            </button>

            {/* Contact Me Button - Mobile */}
            <button
              onClick={handleContactClick}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
              aria-label={t('nav.contactMe')}
            >
              {t('nav.contactMe')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;