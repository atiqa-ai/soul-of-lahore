'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { places as allPlaces, type Place } from '@/data/places';
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
  const headerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const textAnimateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLElement>(null);

  const nextPlace = getNextPlace(place.slug);
  const prevPlace = getPrevPlace(place.slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      if (bgRef.current) {
        gsap.fromTo(bgRef.current, { scale: 1 }, { scale: 1.15, duration: 12, ease: 'none', repeat: -1, yoyo: true });
      }
    }, headerRef);
    const observers: IntersectionObserver[] = [];
    textAnimateRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' });
            observer.unobserve(el);
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => {
      ctx.revert();
      observers.forEach(o => o.disconnect());
    };
  }, [place.slug]);

  return (
    <div className="bg-black text-white">
      {/* Sticky top nav */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/" className="pointer-events-auto flex items-center gap-3 text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors">
          <div className="w-8 h-8 md:w-10 md:h-10">
            <PlaceLogo placeId={place.id} size={32} animated />
          </div>
          <span>Soul of Lahore</span>
        </Link>
        <div className="pointer-events-auto text-right">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">{place.label}</p>
          <p className="text-xs md:text-sm font-medium text-white/80">{place.title}</p>
        </div>
      </div>

      {/* Hero header */}
      <section ref={headerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Cinematic background — first media item or place-specific */}
        <img
          ref={bgRef}
          src={place.heroImage || (place.slug === 'minar-pakistan' ? 'https://www.dronestagr.am/wp-content/uploads/2018/01/10Jan2018_0005.jpg' : place.media[0]?.type === 'video' ? place.media[1]?.src : place.media[0]?.src)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-amber-500/40" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">{place.title}</h1>
          <p className="text-lg md:text-xl text-amber-400/80 font-light tracking-wide mb-6">{place.subtitle}</p>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">{place.longDescription}</p>
        </div>
      </section>

      {/* Media sections - each full viewport */}
      {place.media.map((item, i) => (
        <section
          key={item.id}
          ref={(el) => { sectionsRef.current[i] = el; }}
          className="relative w-full h-screen overflow-hidden snap-start"
        >
          {item.type === 'image' ? (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${item.src}')`,
                ...(item.objectPosition ? { backgroundPosition: item.objectPosition } : {})
              }}
            />
          ) : (
            <video
              src={item.src}
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

          {/* Caption + Description */}
          <div
            ref={(el) => { textAnimateRefs.current[i] = el; }}
            className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center px-8"
          >
            {item.caption && (
              <h2 className="text-xl md:text-3xl font-bold text-white/90 tracking-wide text-center max-w-2xl mb-4">
                {item.caption}
              </h2>
            )}
            <p className="text-sm md:text-base text-white/80 leading-relaxed tracking-wide max-w-2xl mx-auto text-center [text-shadow:_0_2px_12px_rgba(0,0,0,0.5)]">
              {item.description}
            </p>
          </div>
        </section>
      ))}

      {/* Bottom navigation */}
      <section ref={bottomRef} className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-t from-black via-gray-950 to-black">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-amber-500/40" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white/90">{place.title}</h2>
          <p className="text-sm text-white/50 mb-10">{place.subtitle}</p>

          <div className="flex items-center justify-center gap-8">
            <div>
              {prevPlace ? (
                <Link
                  href={`/place/${prevPlace.slug}`}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4 text-white/60 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">{prevPlace.title}</span>
                </Link>
              ) : (
                <Link
                  href="/"
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4 text-white/60 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">Home</span>
                </Link>
              )}
            </div>
            <div>
              {nextPlace ? (
                <Link
                  href={`/place/${nextPlace.slug}`}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">{nextPlace.title}</span>
                  <svg className="w-4 h-4 text-white/60 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/"
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">Complete</span>
                  <svg className="w-4 h-4 text-white/60 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
