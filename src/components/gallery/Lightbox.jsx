import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, index, onClose, onNav }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    },
    [onClose, onNav]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (index === null) return null;
  const img = images[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-4"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white p-2" aria-label="Close" data-cursor-hover>
          <X size={32} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 md:left-8 text-white p-2"
          aria-label="Previous"
          data-cursor-hover
        >
          <ChevronLeft size={36} />
        </button>
        <motion.img
          key={img.src}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={img.src}
          alt={img.alt}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 md:right-8 text-white p-2"
          aria-label="Next"
          data-cursor-hover
        >
          <ChevronRight size={36} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}