const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Text appears immediately on page load — not tied to scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Force fresh page loads to start scrolled at the top so the video always begins at frame 0
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Scroll pins the section and scrubs the video; page unlocks once video finishes
  useEffect(() => {
    if (reduced || isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    let trigger;
    video.pause();
    video.currentTime = 0;

    const setup = () => {
      video.currentTime = 0;
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2800",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          if (!video.duration) return;
          const target = self.progress * video.duration;
          if (Math.abs(video.currentTime - target) > 0.05) {
            video.currentTime = target;
          }
        },
      });
    };

    // Wait until the video is fully buffered so scrubbing doesn't stall on network seeks
    if (video.readyState >= 4) {
      setup();
    } else {
      video.addEventListener("canplaythrough", setup, { once: true });
    }

    return () => {
      trigger && trigger.kill();
      video.removeEventListener("canplaythrough", setup);
    };
  }, [reduced, isTouch]);

  const showStatic = reduced || isTouch;

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-white">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          autoPlay={showStatic}
          loop={showStatic}
          poster="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 md:via-white/40 to-transparent" />

      <div className="relative z-20 h-full flex items-center px-6 md:px-16">
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden">
            <h1 className="hero-line font-display font-extrabold text-black text-[15vw] md:text-[6vw] leading-[0.92] tracking-tight">SIP</h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line font-display font-extrabold text-primary text-[15vw] md:text-[6vw] leading-[0.92] tracking-tight">SOMETHING</h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line font-display font-extrabold text-black text-[15vw] md:text-[6vw] leading-[0.92] tracking-tight">PINK.</h1>
          </div>
          <p className="hero-line mt-6 text-base md:text-lg text-black/70 max-w-sm font-body">
            Hand-shaken boba, real fruit purée, and grade-A matcha — made loud, made pink, made in Weldon Spring.
          </p>
          <Link
            to="/menu"
            data-cursor-hover
            className="hero-line inline-block mt-8 bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-colors duration-300"
          >
            View The Menu
          </Link>
        </div>
      </div>

      {!showStatic && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-xs font-mono tracking-[0.3em] text-black/50 animate-bounce">
          SCROLL
        </div>
      )}
    </section>
  );
}