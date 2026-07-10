import React from "react";
import useSEO from "@/hooks/useSEO";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Marquee from "@/components/shared/Marquee";
import ReviewCard from "@/components/reviews/ReviewCard";
import { REVIEWS, REVIEW_TAGS, REVIEW_STATS } from "@/data/reviewsData";

export default function Reviews() {
  useSEO(
    "Reviews | Piink Tea Studio",
    "See what people are saying about Piink Tea Studio, the pink-themed boba tea shop in Weldon Spring, MO."
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 md:pt-28 pb-10">
        <ScrollReveal>
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Reviews</span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4">The Hype Is Real.</h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex items-baseline gap-4 mt-8">
            <span className="font-display font-extrabold text-6xl md:text-7xl text-primary">
              <AnimatedCounter to={REVIEW_STATS.rating} decimals={1} />
            </span>
            <div>
              <div className="flex gap-1 text-primary text-xl">★★★★★</div>
              <p className="font-mono text-sm text-black/50 mt-1">
                <AnimatedCounter to={REVIEW_STATS.reviewCount} suffix="+" /> Google Reviews
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="py-6 border-y border-black/10 bg-black text-white">
        <Marquee speed={22}>
          {REVIEW_TAGS.map((tag, i) => (
            <span key={i} className="mx-6 font-display font-bold text-2xl md:text-3xl">
              {tag} <span className="text-primary">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((r, i) => (
          <ScrollReveal key={i} delay={(i % 6) * 0.08}>
            <ReviewCard review={r} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}