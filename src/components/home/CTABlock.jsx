import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { BUSINESS } from "@/data/business";

export default function CTABlock() {
  return (
    <section className="bg-primary py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display font-extrabold text-4xl md:text-7xl text-black leading-tight">
            Your new favorite drink is waiting.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href={BUSINESS.doordash}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="bg-black text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
            >
              Order Delivery
            </a>
            <Link
              to="/order"
              data-cursor-hover
              className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              Visit Us
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}