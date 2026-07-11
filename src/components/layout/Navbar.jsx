import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "@/components/shared/Magnetic";
import { NAV_LINKS, BUSINESS } from "@/data/business";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isHomeHeroOverlay, setIsHomeHeroOverlay] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setIsHomeHeroOverlay(false);
      return undefined;
    }

    const updateOverlayState = () => {
      const transitionDistance = window.innerHeight * 3.2;
      setIsHomeHeroOverlay(window.scrollY < transitionDistance);
    };

    updateOverlayState();
    window.addEventListener("scroll", updateOverlayState, { passive: true });
    window.addEventListener("resize", updateOverlayState);

    return () => {
      window.removeEventListener("scroll", updateOverlayState);
      window.removeEventListener("resize", updateOverlayState);
    };
  }, [isHomePage]);

  const overlayNav = isHomePage && isHomeHeroOverlay;
  const headerClassName = overlayNav
    ? "sticky top-0 z-50 bg-transparent backdrop-blur-none border-b border-transparent transition-colors duration-300"
    : "sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 transition-colors duration-300";
  const textClassName = overlayNav ? "text-white" : "text-black";
  const linkClassName = overlayNav ? "text-white hover:bg-white/15" : "text-black hover:bg-secondary";
  const activeLinkClassName = overlayNav ? "bg-white text-black" : "bg-black text-white";
  const orderButtonClassName = overlayNav
    ? "bg-white text-black hover:bg-white/90 hover:text-black"
    : "bg-primary text-black hover:bg-black hover:text-white";

  return (
    <>
      <header className={headerClassName}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
          <Magnetic>
            <Link to="/" className={`font-display font-extrabold text-2xl tracking-tight ${textClassName}`} data-cursor-hover>
              PI<span className={overlayNav ? "text-white" : "text-primary"}>I</span>NK
            </Link>
          </Magnetic>

          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.path}>
                <Link
                  to={link.path}
                  data-cursor-hover
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    location.pathname === link.path ? activeLinkClassName : linkClassName
                  }`}
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <a
                href={BUSINESS.doordash}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className={`${orderButtonClassName} font-bold text-sm px-6 py-3 rounded-full transition-colors duration-300`}
              >
                Order Now
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`md:hidden p-2 ${textClassName}`}
            aria-label="Open menu"
            data-cursor-hover
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-black">
                <X size={32} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-start justify-center gap-6 px-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link to={link.path} className="font-display text-5xl font-extrabold text-black">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-10">
              <a href={BUSINESS.doordash} target="_blank" rel="noreferrer" className="inline-block bg-black text-white font-bold px-8 py-4 rounded-full">
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}