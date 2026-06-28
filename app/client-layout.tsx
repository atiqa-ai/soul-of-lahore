'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import NavBar from './components/NavBar';
import PageTransition from './components/PageTransition';
import AmbientSoundtrack from './components/AmbientSoundtrack';
import ErrorBoundary from './components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  return (
    <>
      <AmbientSoundtrack />
      <ErrorBoundary>
        <NavBar />
        <PageTransition>
          {children}
        </PageTransition>
      </ErrorBoundary>
    </>
  );
}
