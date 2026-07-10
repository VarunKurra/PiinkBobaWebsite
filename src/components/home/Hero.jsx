const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "/media/PiinkTeaVideo.mp4";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      video.currentTime = 0;
      if (!reduced && !isTouch) {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      handleCanPlay();
    } else {
      video.addEventListener("canplay", handleCanPlay, { once: true });
    }

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [reduced, isTouch]);

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
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          if (!video.duration) return;
          const target = self.progress * video.duration;
          if (Math.abs(video.currentTime - target) > 0.02) {
            video.currentTime = target;
          }
        },
      });
    };

    if (video.readyState >= 2) {
      setup();
    } else {
      video.addEventListener("canplay", setup, { once: true });
    }

    return () => {
      trigger && trigger.kill();
      video.removeEventListener("canplay", setup);
    };
  }, [reduced, isTouch]);

  useEffect(() => {
    if (reduced || isTouch) return;
    const onScroll = () => {
      setNavVisible(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          autoPlay={false}
          loop={false}
          poster="/media/17742f711_generated_image.png"
          className={`absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 md:via-white/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />

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
          <p className="hero-line mt-6 text-base md:text-lg text-black/70 max-w-sm font-body leading-relaxed">
            Pink drinks, bold flavor, and a shop that feels like the fun part of the city.
          </p>
          <Link
            to="/menu"
            data-cursor-hover
            className="hero-line inline-block mt-8 bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-colors duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
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