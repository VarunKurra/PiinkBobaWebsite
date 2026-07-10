import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "@/components/shared/Magnetic";
import { NAV_LINKS, BUSINESS } from "@/data/business";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${location.pathname === "/" ? "bg-transparent border-transparent" : "bg-white/85 border-b border-black/10"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
          <Magnetic>
            <Link to="/" className="font-display font-extrabold text-2xl tracking-tight text-black" data-cursor-hover>
              PI<span className="text-primary">I</span>NK
            </Link>
          </Magnetic>

          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.path}>
                <Link
                  to={link.path}
                  data-cursor-hover
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    location.pathname === link.path ? "bg-black text-white" : "text-black hover:bg-secondary"
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
                className="bg-primary text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
              >
                Order Now
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-black"
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