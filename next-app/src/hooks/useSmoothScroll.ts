"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Hero entrance
    gsap.from(".hero-headline", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero-sub", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.4 });
    // fromTo evita ficar preso em opacity:0 quando compete com CSS/Strict Mode
    gsap.fromTo(
      ".hero-ctas",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6, clearProps: "opacity" }
    );
    gsap.from(".hero-ticker", { y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8 });

    // Scroll reveal for cards
    const animateSections = gsap.utils.toArray('.benefit-card, .market-card, .kpi-card, .support-item, .testimonial-card');
    animateSections.forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
      });
    });

    // CTA glow parallax
    gsap.to(".cta-bg-glow", {
      scrollTrigger: { trigger: ".cta-section", start: "top bottom", end: "bottom top", scrub: 1 },
      y: -150, scale: 1.1
    });

    // Desktop navbar keeps the same green glass tone as the mobile shell.
    if (window.matchMedia("(min-width: 1024px)").matches) {
      ScrollTrigger.create({
        start: "top -40",
        onEnter: () => gsap.to(".nav", {
          background: "rgba(45, 114, 112, 0.92)",
          backdropFilter: "blur(28px) saturate(145%)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
          borderBottomColor: "rgba(255,255,255,0.12)",
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto"
        }),
        onLeaveBack: () => gsap.to(".nav", {
          background: "rgba(45, 114, 112, 0.85)",
          backdropFilter: "blur(22px) saturate(130%)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.15)",
          borderBottomColor: "rgba(255,255,255,0.08)",
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto"
        })
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
