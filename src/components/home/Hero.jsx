const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

const VIDEO_URL = "/media/PiinkTeaVideo.mp4";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resetVideo = () => {
      setVideoReady(true);
      video.currentTime = 0;
      video.pause();
    };

    if (video.readyState >= 2) {
      resetVideo();
    } else {
      video.addEventListener("loadedmetadata", resetVideo, { once: true });
      video.addEventListener("canplay", resetVideo, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", resetVideo);
      video.removeEventListener("canplay", resetVideo);
    };
  }, [reduced, isTouch]);

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

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const showStatic = reduced || isTouch;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      <div className="relative h-screen min-h-screen">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={VIDEO_URL}
            muted
            playsInline
            preload="auto"
            autoPlay={false}
            loop={false}
            poster="/poster.jpg"
            className={`absolute inset-0 h-full w-full object-cover object-right transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
              }
            }}
            onCanPlay={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
              }
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 md:via-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative z-20 flex h-full items-center px-6 md:px-16">
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
            <p className="hero-line mt-6 max-w-sm text-base leading-relaxed text-black/70 md:text-lg font-body">
              Pink drinks, bold flavor, and a shop that feels like the fun part of the city.
            </p>
            <Link
              to="/menu"
              data-cursor-hover
              className="hero-line mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-primary hover:text-black"
            >
              View The Menu
            </Link>
          </div>
        </div>

        {!showStatic && (
          <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs font-mono tracking-[0.3em] text-black/50 animate-bounce">
            SCROLL
          </div>
        )}
      </div>
    </section>
  );
}