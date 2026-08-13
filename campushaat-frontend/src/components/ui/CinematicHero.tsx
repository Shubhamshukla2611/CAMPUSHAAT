import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  type FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import './CinematicHero.css';

/**
 * 🎬 PLACEHOLDER — Replace with your real campus-life hero video.
 * Ideal content: students walking on campus at golden hour, a book
 * hand-off, quad or hallway — anything warm & trustworthy.
 */
const HERO_VIDEO_URL = '/video/campus-hero.mp4';

/* ── Fade constants ──────────────────────────────────────────── */
const FADE_DURATION = 500; // ms
const FADE_OUT_THRESHOLD = 0.55; // seconds remaining before video ends

/* ================================================================
   CinematicHero
   ================================================================ */
export const CinematicHero: React.FC = () => {
  const navigate = useNavigate();

  /* refs */
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  /* state */
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  /* ── animation helpers ─────────────────────────────────────── */
  const cancelAnim = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const fade = useCallback(
    (
      el: HTMLElement,
      from: number,
      to: number,
      duration: number,
      onComplete?: () => void,
    ) => {
      cancelAnim();
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        el.style.opacity = String(from + (to - from) * progress);
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          animFrameRef.current = null;
          onComplete?.();
        }
      };
      animFrameRef.current = requestAnimationFrame(step);
    },
    [cancelAnim],
  );

  /** Fade from current opacity → 1 */
  const fadeIn = useCallback(
    (el: HTMLElement) => {
      const current = parseFloat(el.style.opacity || '0');
      fade(el, current, 1, FADE_DURATION);
    },
    [fade],
  );

  /** Fade from current opacity → 0 */
  const fadeOut = useCallback(
    (el: HTMLElement, onComplete?: () => void) => {
      const current = parseFloat(el.style.opacity || '1');
      fade(el, current, 0, FADE_DURATION, onComplete);
    },
    [fade],
  );

  /* ── video lifecycle ───────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    const handleCanPlay = () => {
      fadingOutRef.current = false;
      fadeIn(video);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return;
      if (video.duration - video.currentTime <= FADE_OUT_THRESHOLD) {
        fadingOutRef.current = true;
        fadeOut(video);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      cancelAnim();
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeIn(video);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnim();
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [fadeIn, fadeOut, cancelAnim]);

  /* ── email submit ──────────────────────────────────────────── */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Please enter your university email');
      return;
    }
    navigate('/login', { state: { email: trimmedEmail, tab: 'signin' } });
  };

  /* ── render ────────────────────────────────────────────────── */
  return (
    <section className="cinematic-hero relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* ─── Background Video ─── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110 origin-bottom"
        src={HERO_VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{ opacity: 0, filter: 'brightness(0.55)' }}
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75 z-[1]" />

      {/* ─── Navigation Bar ─── */}
      <nav className="relative z-20 px-4 sm:px-6 py-3 sm:py-4">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto shadow-xl">
          {/* Left — Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => navigate('/')}
          >
            <div
              className="w-9 h-9 bg-white flex items-center justify-center rounded-lg shadow-sm"
              style={{
                clipPath:
                  'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              }}
            >
              <GraduationCap size={22} className="text-[#3B6FE3]" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              CampusHaat
            </span>
          </div>

          {/* Center — Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold"
            >
              How It Works
            </a>
            <a
              href="#categories"
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold"
            >
              Categories
            </a>
            <a
              href="#trust"
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold"
            >
              For Colleges
            </a>
          </div>

          {/* Right — Get Started */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#3B6FE3] hover:bg-[#2B58C9] text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero Content ─── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight font-bold drop-shadow-md"
        >
          Built for your campus.
        </h1>

        <div className="max-w-xl w-full space-y-4">
          {/* University email input bar */}
          <form
            onSubmit={handleSubmit}
            className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 shadow-xl border border-white/30"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Enter your university email"
              className="flex-1 bg-transparent text-white placeholder:text-white/70 text-base outline-none border-none font-medium"
            />
            <button
              type="submit"
              className="bg-white rounded-full p-3 text-[#1A2340] shrink-0 hover:bg-white/90 transition-colors shadow-sm active:scale-95"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          {emailError && (
            <p className="text-red-400 text-xs font-semibold">{emailError}</p>
          )}

          {/* Subtitle */}
          <p className="text-white/90 text-sm md:text-base leading-relaxed px-4 font-medium drop-shadow-sm">
            The marketplace built exclusively for verified students. Buy, sell,
            and trade within your own campus — no strangers, no spam, no
            shipping.
          </p>

          {/* See How It Works */}
          <div className="flex justify-center pt-2">
            <a
              href="#how-it-works"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-semibold hover:bg-white/20 transition-all inline-block shadow-md hover:scale-[1.02] border border-white/30"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* ─── Trust Strip ─── */}
      <div className="relative z-10 flex justify-center gap-4 pb-12 flex-wrap px-4">
        <div className="liquid-glass rounded-full px-5 py-3 flex items-center gap-2.5 text-white text-xs font-semibold shadow-md border border-white/20">
          <ShieldCheck size={16} className="text-[#3B6FE3]" />
          Verified Students Only
        </div>
        <div className="liquid-glass rounded-full px-5 py-3 flex items-center gap-2.5 text-white text-xs font-semibold shadow-md border border-white/20">
          <MapPin size={16} className="text-[#10B981]" />
          Hyper-Local
        </div>
        <div className="liquid-glass rounded-full px-5 py-3 flex items-center gap-2.5 text-white text-xs font-semibold shadow-md border border-white/20">
          <MessageCircle size={16} className="text-[#D97706]" />
          Private In-App Chat
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
