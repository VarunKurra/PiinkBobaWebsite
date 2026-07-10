import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Reviews from "@/pages/Reviews";
import Order from "@/pages/Order";
import PageNotFound from "@/lib/PageNotFound";

export default function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPhase("cover");
      const t1 = setTimeout(() => {
        setDisplayLocation(location);
        setPhase("reveal");
        window.scrollTo(0, 0);
      }, 500);
      const t2 = setTimeout(() => setPhase("idle"), 950);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [location, displayLocation]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: phase === "cover" ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: phase === "reveal" ? "right" : "left" }}
        className="fixed inset-0 z-[9998] bg-primary pointer-events-none"
      />
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}