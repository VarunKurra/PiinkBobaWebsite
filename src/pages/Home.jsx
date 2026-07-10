import React from "react";
import useSEO from "@/hooks/useSEO";
import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import SignatureDrinks from "@/components/home/SignatureDrinks";
import Stats from "@/components/home/Stats";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import CTABlock from "@/components/home/CTABlock";

export default function Home() {
  useSEO(
    "Piink Tea Studio | Boba & Matcha in Weldon Spring, MO",
    "Piink Tea Studio is a pink-themed boba tea shop in Weldon Spring, MO serving hand-shaken boba, matcha, lattes and more, 7 days a week."
  );

  return (
    <div>
      <Hero />
      <BrandIntro />
      <SignatureDrinks />
      <Stats />
      <GalleryTeaser />
      <CTABlock />
    </div>
  );
}