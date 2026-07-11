const db = /** @type {any} */ (globalThis).__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VIDEO_URL = "/media/PiinkTeaVideo.mp4";

// How many viewport-heights of scroll the video should consume while pinned.
// Bigger number = slower/more precise scrub, longer pin. Tune to taste.
const PIN_VIEWPORT_HEIGHTS = 2.7;
// Slightly faster video progression per scroll while keeping the scrub smooth.
const VIDEO_SCROLL_SPEED = 1.08;
// Remove the very first 0.1s of the clip so the hero opens on the intended frame.
const VIDEO_START_OFFSET = 0.1;
// GSAP scrub smoothing (seconds of "catch up" lag). ~0.3-0.4 feels premium
// without introducing noticeable delay.
const SCRUB_SMOOTHING = 0.35;

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = /** @type {import("react").MutableRefObject<HTMLVideoElement | null>} */ (useRef(null));
  const copyRef = /** @type {import("react").MutableRefObject<HTMLDivElement | null>} */ (useRef(null));
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Scroll-driven playback state lives in a ref, not React state, so scroll
  // never triggers a re-render. rafId/targetTime/duration are all mutated
  // from inside the ScrollTrigger callback below.
  const scrollVideoState = useRef({ targetTime: 0, rafId: /** @type {number | null} */ (null), duration: 0 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Scroll-driven playback is desktop/precision-pointer only. On touch and
  // reduced-motion, scroll hijacking fights the browser's native fling
  // scrolling and feels janky, so we fall back to a static first frame.
  const showStatic = reduced || isTouch;
  const scrollVideoEnabled = videoReady && !showStatic;

  // --- Load the video and mark it ready -------------------------------
  useEffect(() => {
    const video = /** @type {HTMLVideoElement | null} */ (videoRef.current);
    if (!video) return;

    const markReady = () => {
      const startTime = Math.min(VIDEO_START_OFFSET, Math.max(0, video.duration || 0));
      if (video.currentTime !== startTime) {
        video.currentTime = startTime;
      }
      setVideoReady(true);
      video.pause();
    };

    if (video.readyState >= 2) {
      markReady();
    } else {
      video.addEventListener("loadedmetadata", markReady, { once: true });
      video.addEventListener("canplay", markReady, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, []);

  // Keep the hero copy visible throughout the interaction, but give it a gentle,
  // continuous motion that feels like it is breathing with the video.
  const handleScrollProgress = useCallback((/** @type {number} */ progress) => {
    const copy = /** @type {HTMLDivElement | null} */ (copyRef.current);
    if (!copy) return;

    const wobble = Math.sin(progress * Math.PI * 4 + 0.35) * 2.5;
    const drift = Math.sin(progress * Math.PI * 2) * 1.8;
    const sway = Math.sin(progress * Math.PI * 2.2) * 0.15;

    copy.style.opacity = "1";
    copy.style.transform = `translate3d(${drift}px, ${wobble}px, 0) rotate(${sway}deg)`;
    copy.style.pointerEvents = "auto";
  }, []);

  // --- Scroll-pinned video: GSAP ScrollTrigger is the source of truth --
  useEffect(() => {
    if (!scrollVideoEnabled) return undefined;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    /** @type {import("gsap/ScrollTrigger").ScrollTrigger | null} */
    let scrollTrigger = null;
    let cancelled = false;
    const state = scrollVideoState.current;

    // Only ever seek from inside rAF, and only once per rendered frame —
    // this is what keeps fast flicks/momentum scrolling from stuttering.
    const updateVideoFrame = () => {
      state.rafId = null;
      if (cancelled) return;
      if (video.readyState < 1) return; // metadata not ready yet

      const delta = Math.abs(video.currentTime - state.targetTime);
      // Sub-frame difference (assume ~120fps ceiling) isn't worth a seek —
      // this alone eliminates most redundant currentTime writes.
      if (delta < 1 / 120) return;

      try {
        // Safari supports fastSeek for cheaper, less-precise (but smoother) seeking.
        if (typeof video.fastSeek === "function") {
          video.fastSeek(state.targetTime);
        } else {
          video.currentTime = state.targetTime;
        }
      } catch {
        // Seeking can throw if the element is mid-teardown/detached — safe to ignore.
      }
    };

    const scheduleFrame = () => {
      if (state.rafId === null) {
        state.rafId = /** @type {number} */ (requestAnimationFrame(updateVideoFrame));
      }
    };

    const getTargetTime = (/** @type {number} */ progress) => {
      const safeDuration = Math.max(0, state.duration - VIDEO_START_OFFSET);
      const clampedProgress = Math.min(1, Math.max(0, progress * VIDEO_SCROLL_SPEED));
      return VIDEO_START_OFFSET + clampedProgress * safeDuration;
    };

    const setup = () => {
      if (cancelled) return;
      state.duration = video.duration || 0;
      if (!state.duration || Number.isNaN(state.duration)) return;

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * PIN_VIEWPORT_HEIGHTS)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: SCRUB_SMOOTHING,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.targetTime = getTargetTime(self.progress);
          scheduleFrame();
          handleScrollProgress(self.progress);
        },
        onRefreshInit: () => {
          // Re-sync target to current progress on refresh/resize instead of
          // snapping the video back to frame 0.
          if (scrollTrigger) {
            state.targetTime = getTargetTime(scrollTrigger.progress);
          }
        },
      });

      // Metadata/layout may settle after GSAP's first measurement pass —
      // force a recalculation now that section height & video duration are known.
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1 && video.duration) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadedmetadata", setup);
      if (state.rafId !== null) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
        scrollTrigger = null;
      }
    };
  }, [scrollVideoEnabled, handleScrollProgress]);

  // --- Intro text stagger ------------------------------------------------
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
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 md:via-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative z-20 flex h-full items-center px-6 md:px-16">
          <div ref={copyRef} className="w-full md:w-1/2 will-change-[opacity,transform]">
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