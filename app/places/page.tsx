'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { places } from '@/data/places';
import SoulOfLahoreLogo from '@/app/components/SoulOfLahoreLogo';
import PlaceLogo from '@/app/components/PlaceLogo';
import CinematicTransition from '@/app/components/CinematicTransition';

interface MediaPlane {
  sprite: THREE.Sprite;
  nameSprite: THREE.Sprite;
  slug: string;
  title: string;
  userData: {
    orbitRadius: number; orbitAngle: number;
  };
}

export default function PlacesPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hoveredSlugRef = useRef<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = useCallback((slug: string) => {
    setNavigatingTo(slug);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    if (navigatingTo) {
      window.location.href = `/place/${navigatingTo}`;
    }
  }, [navigatingTo]);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container) return;

    let isVisible = true;
    let animId = 0;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let group: THREE.Group;
    let particles: THREE.Points;
    let clock: THREE.Clock;
    let planes: MediaPlane[];
    let raycaster: THREE.Raycaster;
    let mouse: THREE.Vector2;
    let hoveredSprite: THREE.Sprite | null = null;

    const render = () => {
      if (!isVisible) { animId = 0; return; }
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      for (let p = 0; p < planes.length; p++) {
        const { sprite, nameSprite, userData: u } = planes[p];
        u.orbitAngle += 0.002;
        sprite.position.x = Math.cos(u.orbitAngle) * u.orbitRadius;
        sprite.position.y = Math.sin(u.orbitAngle) * u.orbitRadius;
        nameSprite.position.x = sprite.position.x;
        nameSprite.position.y = sprite.position.y - 0.8;

        const isHovered = sprite === hoveredSprite;
        const targetScale = isHovered ? 1.5 : 1;
        sprite.scale.x += (targetScale - sprite.scale.x) * 0.08;
        sprite.scale.y += (targetScale - sprite.scale.y) * 0.08;

        nameSprite.material.opacity = Math.min(nameSprite.material.opacity + 0.02, 0.8);
      }

      raycaster.setFromCamera(mouse, camera);
      const sprites = planes.map(p => p.sprite);
      const intersects = raycaster.intersectObjects(sprites);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Sprite;
        const plane = planes.find(p => p.sprite === hit);
        if (plane && plane.slug !== hoveredSlugRef.current) {
          hoveredSlugRef.current = plane.slug;
          setHoveredSlug(plane.slug);
          hoveredSprite = hit;
        }
      } else if (hoveredSprite) {
        hoveredSlugRef.current = null;
        setHoveredSlug(null);
        hoveredSprite = null;
      }

      const ce = elapsed * 0.04;
      camera.position.x = Math.sin(ce) * 0.35 + Math.sin(elapsed * 0.07) * 0.1;
      camera.position.y = 0.5 + Math.sin(elapsed * 0.03) * 0.15 + Math.sin(elapsed * 0.06) * 0.08;
      camera.position.z = 10 + Math.sin(elapsed * 0.05) * 0.2;
      camera.lookAt(0, 0, 0);
      particles.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        clock = new THREE.Clock();
        render();
      }
    }, { threshold: 0.01 });
    if (section) observer.observe(section);

    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050505);

      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0.5, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';

      scene.fog = new THREE.FogExp2(new THREE.Color(0x050505), 0.018);

      const lowPower = window.devicePixelRatio < 2 || /Android|iPhone|iPad/i.test(navigator.userAgent);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5));

      const particleCount = lowPower ? 100 : 250;
      const particleGeo = new THREE.BufferGeometry();
      const particlePos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        particlePos[i * 3] = (Math.random() - 0.5) * 40;
        particlePos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        particlePos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
      particles = new THREE.Points(
        particleGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.3 })
      );
      scene.add(particles);

      group = new THREE.Group();
      scene.add(group);

      planes = [];
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2(-999, -999);

      const count = places.length;

      const fadeIn = (obj: any, prop: string, target: number, dur: number) => {
        const start = obj[prop];
        if (start === undefined) return;
        const t0 = performance.now();
        const upd = () => {
          const t = Math.min((performance.now() - t0) / (dur * 1000), 1);
          const e = 1 - Math.pow(1 - t, 3);
          obj[prop] = start + (target - start) * e;
          if (t < 1) requestAnimationFrame(upd);
        };
        requestAnimationFrame(upd);
      };

      const createCircularLogoTexture = (src: string, fallback: string): Promise<THREE.CanvasTexture> => {
        return new Promise((resolve) => {
          const size = 256;
          const cx = size / 2, cy = size / 2, radius = size / 2 - 6;
          const buildCanvas = (drawContent: (ctx: CanvasRenderingContext2D) => void) => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.clip();
            drawContent(ctx);
            ctx.restore();
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#D4A853';
            ctx.lineWidth = 4;
            ctx.shadowColor = 'rgba(212, 168, 83, 0.6)';
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(cx, cy, radius - 8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(212, 168, 83, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
            return canvas;
          };
          const makeFallback = () => {
            const canvas = buildCanvas((ctx) => {
              ctx.fillStyle = '#1a1a2e';
              ctx.fillRect(0, 0, size, size);
              ctx.font = 'bold 110px Arial,sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = '#D4A853';
              ctx.fillText(fallback, cx, cy + 4);
            });
            const tex = new THREE.CanvasTexture(canvas);
            tex.colorSpace = THREE.SRGBColorSpace;
            resolve(tex);
          };
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            try {
              const canvas = buildCanvas((ctx) => {
                const s = Math.min(img.width, img.height);
                ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
              });
              const tex = new THREE.CanvasTexture(canvas);
              tex.colorSpace = THREE.SRGBColorSpace;
              resolve(tex);
            } catch (_) {
              makeFallback();
            }
          };
          img.onerror = makeFallback;
          img.src = src;
        });
      };

      const orbitRadius = 4.0;
      const logoScale = 1.2;

      const createNameTexture = (text: string): THREE.CanvasTexture => {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 128;
        const ctx = c.getContext('2d')!;
        ctx.clearRect(0, 0, 512, 128);
        ctx.font = 'bold 36px Arial,Helvetica,sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#D4A853';
        ctx.fillText(text, 256, 64);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      };

      places.forEach((place, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;

        const makeLogo = (texture: THREE.Texture) => {
          const mat = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          });
          const sprite = new THREE.Sprite(mat);
          sprite.position.set(x, y, 0);
          sprite.scale.set(logoScale, logoScale, 1);

          const nameTex = createNameTexture(place.title);
          const nameMat = new THREE.SpriteMaterial({
            map: nameTex,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          });
          const nameSprite = new THREE.Sprite(nameMat);
          nameSprite.position.set(x, y - 0.8, 0);
          nameSprite.scale.set(2, 0.5, 1);
          group.add(nameSprite);
          fadeIn(nameMat, 'opacity', 0.8, 1);

          planes.push({
            sprite,
            nameSprite,
            slug: place.slug,
            title: place.title,
            userData: {
              orbitRadius,
              orbitAngle: angle,
            },
          });
          group.add(sprite);
          fadeIn(mat, 'opacity', 0.9, 0.8 + Math.random() * 0.4);
        };

        const mediaItem = place.media.find(m => m.type === 'image');
        const src = mediaItem?.src || '';
        const fallbackLetter = place.title.charAt(0);
        if (src) {
          createCircularLogoTexture(src, fallbackLetter).then(makeLogo);
        }
      });

      clock = new THREE.Clock();
      render();

      const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      const onMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onClick = () => {
        if (hoveredSlugRef.current) {
          handleNavigate(hoveredSlugRef.current);
        }
      };
      window.addEventListener('click', onClick);

      return () => {
        cancelAnimationFrame(animId);
        observer.disconnect();
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('click', onClick);
        renderer.dispose();
        planes.forEach(p => {
          const sm = p.sprite.material as THREE.SpriteMaterial;
          if (sm.map) sm.map.dispose();
          sm.dispose();
          const nm = p.nameSprite.material as THREE.SpriteMaterial;
          if (nm.map) nm.map.dispose();
          nm.dispose();
        });
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    } catch (_) {
      observer.disconnect();
    }
    }, [handleNavigate]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-black overflow-hidden"
        style={{ height: '100dvh' }}
      >
        <div ref={containerRef} className="absolute inset-0" />

        <div className="absolute inset-0 pointer-events-none z-[2]">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.8) 100%)',
          }} />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 px-4 md:px-8 py-4 flex items-center justify-between pointer-events-none">
          <Link href="/" className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group">
            <svg className="w-4 h-4 text-white/50 transition-transform group-hover:-translate-x-1 group-hover:text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="w-5 h-5">
              <SoulOfLahoreLogo size={20} variant="navbar" />
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
              Home
            </span>
          </Link>
          <button onClick={() => setMenuOpen(true)} className="pointer-events-auto flex flex-col gap-1.5 p-2 group" aria-label="Open menu">
            <span className="block w-6 h-px bg-white/50 group-hover:bg-white transition-colors" />
            <span className="block w-4 h-px bg-white/50 group-hover:bg-white transition-colors" />
            <span className="block w-5 h-px bg-white/50 group-hover:bg-white transition-colors" />
          </button>
        </div>

        <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center z-[3] pointer-events-none px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>
            <h2 className="page-title-line text-4xl md:text-6xl lg:text-7xl font-bold mb-3 leading-none">
              Twelve <span className="text-gold">Souls</span>
            </h2>
            <div className="page-title-line divider-gold w-16 md:w-24 mx-auto my-4 md:my-5" />
            <p className="page-title-line text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed px-4">
              Each frame holds a story spanning centuries. Touch one and step into another time.
            </p>
          </div>
        </div>

        {hoveredSlug && (
          <div className="fixed bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500">
            <div className="px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-amber-500/20 shadow-lg shadow-amber-500/5">
              <span className="text-xs tracking-[0.3em] uppercase text-amber-400/80">
                {places.find(p => p.slug === hoveredSlug)?.title || ''}
              </span>
            </div>
          </div>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/20">
            Click to enter
          </p>
        </div>
      </section>

      {/* Side menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
      )}

      {/* Side menu panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-neutral-950/95 backdrop-blur-2xl border-l border-white/5 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/50">Landmarks</span>
              <p className="text-xs text-white/20 mt-1">12 Souls of Lahore</p>
            </div>
            <button onClick={() => setMenuOpen(false)} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all border border-white/5" aria-label="Close menu">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-0.5">
            {places.map((place, i) => (
              <Link
                key={place.id}
                href={`/place/${place.slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.03] hover:pl-4 transition-all duration-300"
              >
                <div className="w-6 h-6 flex-shrink-0">
                  <PlaceLogo placeId={place.id} size={20} animated={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium truncate">{place.title}</span>
                  <span className="block text-[9px] tracking-[0.15em] uppercase text-white/30 truncate">{place.subtitle}</span>
                </div>
                <span className="text-[9px] font-mono text-white/20">{String(i + 1).padStart(2, '0')}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link href="/" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-amber-400/50 hover:text-amber-300 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <CinematicTransition
        isActive={navigatingTo !== null}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
