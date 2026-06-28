'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { places as allPlaces, type Place } from '@/data/places';
import DocumentaryEngine from '@/app/components/DocumentaryEngine';
import PlaceLogo from '@/app/components/PlaceLogo';

function getNextPlace(currentSlug: string): Place | null {
  const idx = allPlaces.findIndex(p => p.slug === currentSlug);
  if (idx === -1 || idx === allPlaces.length - 1) return null;
  return allPlaces[idx + 1];
}

function getPrevPlace(currentSlug: string): Place | null {
  const idx = allPlaces.findIndex(p => p.slug === currentSlug);
  if (idx <= 0) return null;
  return allPlaces[idx - 1];
}

interface PlaceClientProps {
  place: Place;
}

export default function PlaceClient({ place }: PlaceClientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const nextPlace = getNextPlace(place.slug);
  const prevPlace = getPrevPlace(place.slug);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, { autoAlpha: 0, scale: 0.8, rotate: -10 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.3 });
      }
    }, el);
    return () => ctx.revert();
  }, [place.slug]);

  return (
    <div ref={ref} className="relative w-full h-screen bg-black overflow-hidden">
      <DocumentaryEngine items={place.media} />

      <div className="absolute top-0 left-0 right-0 z-40 p-4 md:p-8 flex items-center justify-between pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-3 text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors">
          <div ref={logoRef} className="w-8 h-8 md:w-10 md:h-10">
            <PlaceLogo placeId={place.id} size={32} animated />
          </div>
          <span>Soul of Lahore</span>
        </Link>
        <div className="pointer-events-auto text-right">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">{place.label}</p>
          <p className="text-xs md:text-sm font-medium text-white/80">{place.title}</p>
        </div>
      </div>

      <div className="absolute bottom-12 md:bottom-20 left-6 md:left-16 right-6 md:right-16 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          {prevPlace ? (
            <Link
              href={`/place/${prevPlace.slug}`}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">{prevPlace.title}</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">Home</span>
            </Link>
          )}
        </div>
        <div className="pointer-events-auto">
          {nextPlace ? (
            <Link
              href={`/place/${nextPlace.slug}`}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">{nextPlace.title}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">Complete</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
