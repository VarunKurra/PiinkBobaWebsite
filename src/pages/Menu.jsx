import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSEO from "@/hooks/useSEO";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MenuCard from "@/components/menu/MenuCard";
import { MENU } from "@/data/menuData";

export default function Menu() {
  useSEO(
    "Menu | Piink Tea Studio",
    "Explore the full Piink Tea Studio menu — signature boba, energy series, matcha, lattes and food, in Weldon Spring, MO."
  );
  const [active, setActive] = useState(MENU[0].category);
  const activeCategory = MENU.find((c) => c.category === active);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
      <ScrollReveal>
        <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">The Menu</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4">Pick Your Pink.</h1>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap gap-2 mt-10 mb-10">
          {MENU.map((c) => (
            <button
              key={c.category}
              onClick={() => setActive(c.category)}
              data-cursor-hover
              className={`px-5 py-3 rounded-full font-semibold text-sm transition-colors ${
                active === c.category ? "bg-black text-white" : "bg-secondary text-black hover:bg-primary/30"
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {activeCategory.items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.05}>
              <MenuCard item={item} />
            </ScrollReveal>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}