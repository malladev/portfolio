import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { spring } from "../utils/motion.ts";

// Same order as the page, so the navigation maps onto what it moves to
export const navlinks = [
  { nameKey: "nav.about", href: "#about" },
  { nameKey: "nav.process", href: "#process" },
  { nameKey: "nav.recent", href: "#recent" },
  { nameKey: "nav.projects", href: "#project" },
  { nameKey: "nav.services", href: "#service" },
];

const menuHidden = { opacity: 0, scale: 0.96, y: -8 };

// Which section sits under the reading line. Reads the DOM on each scroll frame
// so it keeps working once the lazy sections have mounted.
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      const current = navlinks.find(({ href }) => {
        const rect = document.getElementById(href.substring(1))?.getBoundingClientRect();
        return rect && rect.top <= line && rect.bottom > line;
      });
      setActive(current ? current.href : null);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return active;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const activeSection = useActiveSection();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Closing on purpose hands focus back to what opened the menu
  const dismissMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(menuRef.current?.querySelectorAll("a[href], button") ?? []);
    focusable()[0]?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
        return;
      }
      if (e.key !== "Tab") return;

      // Keep Tab inside the dialog
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // The dialog does not exist at desktop widths: never leave the page scroll-locked there
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = (e) => e.matches && setMenuOpen(false);

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleDesktop);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <a href="#main-content" className="skip-to-main pointer-events-auto">
        {t('nav.skipToContent')}
      </a>

      <nav
        className="nav-material pointer-events-auto mx-auto flex h-14 w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-paper/10 pl-5 pr-2"
        aria-label={t('nav.mainNavigation')}
      >
        <a href="#top" className="pressable flex min-h-11 items-center rounded-lg" aria-label={t('nav.backToHome')}>
          <img className="h-6 w-auto" src="./assets/favicon.webp" alt="" width="1676" height="404" />
        </a>

        {/* Desktop */}
        <div className="hidden items-center lg:flex">
          {navlinks.map((nav) => {
            const isActive = activeSection === nav.href;
            return (
              <a
                key={nav.href}
                href={nav.href}
                aria-current={isActive ? "location" : undefined}
                className="pressable relative flex min-h-10 items-center rounded-full px-4 text-[0.95rem] font-medium text-paper/70 hover:text-paper aria-[current]:text-paper"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    transition={spring}
                    className="absolute inset-0 rounded-full bg-paper/10"
                  />
                )}
                <span className="relative">{t(nav.nameKey)}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleLanguage}
            className="pressable hidden min-h-11 min-w-11 items-center justify-center rounded-full font-mono text-sm text-paper/70 hover:text-paper lg:flex"
            aria-label={t('nav.switchLanguage')}
            title={t('nav.switchLanguage')}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>

          <a
            href="#contact"
            className="pressable hidden min-h-10 items-center rounded-full bg-saffron px-5 font-semibold text-ink hover:bg-paper lg:flex"
          >
            {t('nav.contactMe')}
          </a>

          {/* Mobile and tablet */}
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(true)}
            className="pressable flex h-11 w-11 items-center justify-center rounded-full text-paper lg:hidden"
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "mobile-menu" : undefined}
          >
            <Bars2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim to focus: this is a modal task */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={dismissMenu}
              className="pointer-events-auto fixed inset-0 bg-ink/70 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              // Grows from the button that opened it, and leaves the same way
              style={{ originX: 1, originY: 0 }}
              initial={menuHidden}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={menuHidden}
              className="pointer-events-auto fixed inset-x-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-3xl border border-paper/10 bg-ink-raised p-3 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.mobileMenu')}
            >
              <div className="flex justify-end">
                <button
                  onClick={dismissMenu}
                  className="pressable flex h-11 w-11 items-center justify-center rounded-full text-paper"
                  aria-label={t('nav.closeMenu')}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col px-3 pb-3">
                {navlinks.map((nav) => (
                  <a
                    key={nav.href}
                    href={nav.href}
                    onClick={closeMenu}
                    aria-current={activeSection === nav.href ? "location" : undefined}
                    className="pressable text-step flex min-h-14 items-center text-paper/80 aria-[current]:text-saffron"
                  >
                    {t(nav.nameKey)}
                  </a>
                ))}

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="pressable flex min-h-12 flex-1 items-center justify-center rounded-full bg-saffron px-6 font-semibold text-ink"
                  >
                    {t('nav.contactMe')}
                  </a>
                  <button
                    onClick={toggleLanguage}
                    className="pressable flex min-h-12 min-w-12 items-center justify-center rounded-full border border-paper/20 font-mono text-sm text-paper"
                    aria-label={t('nav.switchLanguage')}
                  >
                    {language === 'fr' ? 'EN' : 'FR'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
