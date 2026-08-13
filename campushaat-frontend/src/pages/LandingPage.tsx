import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MagicBento from '../components/ui/MagicBento';
import DotField from '../components/ui/DotField';
import CinematicHero from '../components/ui/CinematicHero';
import LogoLoop from '../components/ui/LogoLoop';
import SpecularButton from '../components/ui/SpecularButton';
import ScrollStack from '../components/ui/ScrollStack';

import {
  ShieldCheck,
  MapPin,
  MessageSquare,
  BookOpen,
  Laptop,
  Armchair,
  Shirt,
  MoreHorizontal,
  Mail,
  Search,
  Handshake,
  ArrowRight,
  Globe,
  GraduationCap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-w-full min-h-screen bg-[#090D16] font-sans text-slate-100 selection:bg-[#e2dfff] selection:text-[#3323cc] transition-colors duration-200">

      {/* Main Content */}
      <main>
        <CinematicHero />

        {/* Section 2: Trust Grid with DotField Background */}
        <section id="trust" className="relative px-6 py-24 bg-[#0b0f19] overflow-hidden">
          {/* DotField Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <DotField
              dotRadius={1.5}
              dotSpacing={16}
              bulgeStrength={55}
              glowRadius={180}
              sparkle={true}
              waveAmplitude={3}
              gradientFrom="rgba(79, 70, 229, 0.25)"
              gradientTo="rgba(130, 245, 193, 0.2)"
              glowColor="#4f46e5"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 — Indigo */}
              <div
                className="reveal-on-scroll group p-8 rounded-2xl border border-indigo-500/30 hover:border-indigo-400/70 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-300 hover:-translate-y-1 relative z-10"
                style={{ background: 'linear-gradient(135deg, rgba(49,46,129,0.5) 0%, rgba(15,23,42,0.85) 100%)', backdropFilter: 'blur(12px)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
                >
                  <ShieldCheck className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Verified Students Only
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every user is authenticated using a valid university email address. No spammers, no bots, no off-campus strangers.
                </p>
              </div>

              {/* Card 2 — Emerald */}
              <div
                className="reveal-on-scroll group p-8 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/70 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-1 relative z-10"
                style={{ background: 'linear-gradient(135deg, rgba(6,78,59,0.5) 0%, rgba(15,23,42,0.85) 100%)', backdropFilter: 'blur(12px)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)' }}
                >
                  <MapPin className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Hyper-Local Campus Trading
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Browse items available right on campus. Skip shipping costs and long delivery waits—simply meet up at the library or student center.
                </p>
              </div>

              {/* Card 3 — Amber */}
              <div
                className="reveal-on-scroll group p-8 rounded-2xl border border-amber-500/30 hover:border-amber-400/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-300 hover:-translate-y-1 relative z-10"
                style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.5) 0%, rgba(15,23,42,0.85) 100%)', backdropFilter: 'blur(12px)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  <MessageSquare className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Private In-App Messaging
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Communicate safely without sharing your personal phone number or social media profiles. Negotiate and arrange meetups right inside the app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works — CSS sticky-stack (zero JS, GPU composited) */}
        <section
          id="how-it-works"
          className="px-6 bg-[#070b14]"
          style={{ paddingTop: '5rem', paddingBottom: '8rem' }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 reveal-on-scroll transition-all duration-700 ease-out opacity-0 translate-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#e2dfff] text-[#3323cc] rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                Three simple steps
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4" style={{ letterSpacing: '-0.02em' }}>
                How it works
              </h2>
              <p className="text-slate-300 text-base max-w-lg mx-auto">
                Simplifying peer-to-peer campus trading in three easy steps.
              </p>
            </div>

            {/* Animated ScrollStack */}
            <ScrollStack>
              {/* Card 1 — Verify */}
              <div
                className="rounded-[28px] border-l-[4px] border-l-indigo-400 p-8 md:p-11 min-h-[18rem] flex flex-col justify-between shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(49,46,129,0.45) 0%, rgba(15,23,42,0.9) 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(99,102,241,0.15)' }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)' }}
                  >
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="font-mono text-7xl font-bold text-indigo-400/25 leading-none tracking-tighter">01</span>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Step 01</p>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 tracking-tight">
                    Verify your university email
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Sign up with your <strong className="text-white font-semibold">.edu or .ac.in address</strong> to unlock your campus-only marketplace. Every account is tied to a real, verified student.
                  </p>
                </div>
              </div>

              {/* Card 2 — Browse */}
              <div
                className="rounded-[28px] border-l-[4px] border-l-emerald-400 p-8 md:p-11 min-h-[18rem] flex flex-col justify-between shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(6,78,59,0.45) 0%, rgba(15,23,42,0.9) 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(16,185,129,0.15)' }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.35)' }}
                  >
                    <Search className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="font-mono text-7xl font-bold text-emerald-400/25 leading-none tracking-tighter">02</span>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Step 02</p>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 tracking-tight">
                    Browse listings or post your own
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Discover textbooks, electronics, dorm gear, and more — all from verified students on your campus. Create your own listing in <strong className="text-white font-semibold">under 30 seconds</strong>.
                  </p>
                </div>
              </div>

              {/* Card 3 — Chat & Meet */}
              <div
                className="rounded-[28px] border-l-[4px] border-l-amber-400 p-8 md:p-11 min-h-[18rem] flex flex-col justify-between shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.45) 0%, rgba(15,23,42,0.9) 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,158,11,0.15)' }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.35)' }}
                  >
                    <Handshake className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="font-mono text-7xl font-bold text-amber-400/25 leading-none tracking-tighter">03</span>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Step 03</p>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 tracking-tight">
                    Chat safely &amp; meet on campus
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Negotiate the price in our <strong className="text-white font-semibold">private in-app chat</strong> — no personal numbers shared. Arrange a safe meetup at the library or student center.
                  </p>
                </div>
              </div>
            </ScrollStack>
          </div>
        </section>

        {/* Section 3.5: Platform Features — MagicBento */}
        <section className="relative px-6 py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c0a10 0%, #120F17 50%, #0c0a10 100%)' }}>
          {/* Subtle radial glow backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(132,0,255,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-14 reveal-on-scroll transition-all duration-700 ease-out opacity-0 translate-y-6">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
                style={{ background: 'rgba(132,0,255,0.15)', color: 'rgba(200,150,255,0.9)', border: '1px solid rgba(132,0,255,0.25)' }}
              >
                Everything you need
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
                Built for campus life
              </h2>
              <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(200,200,220,0.65)' }}>
                Every feature designed around how students actually buy, sell, and connect on campus.
              </p>
            </div>

            {/* MagicBento Grid */}
            <div className="flex justify-center">
              <MagicBento
                textAutoHide={false}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Category Showcase */}
        <section className="px-6 py-24 bg-[#0b0f19] overflow-hidden" id="categories">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-950/80 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                  Browse Campus Marketplace
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
                  Popular Categories
                </h2>
                <p className="text-slate-300 text-base">
                  What students are actively buying and selling this week.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-[#3525cd] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm"
              >
                View all categories <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* LogoLoop marquee for categories */}
            <div className="py-4">
              <LogoLoop
                logos={[
                  {
                    title: 'Textbooks',
                    icon: <BookOpen className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Electronics',
                    icon: <Laptop className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Dorm Gear',
                    icon: <Armchair className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Clothing',
                    icon: <Shirt className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Campus Transit',
                    icon: <MapPin className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Notes & Study',
                    icon: <ShieldCheck className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Gaming & Accessories',
                    icon: <Globe className="w-7 h-7 text-[#3525cd]" />,
                  },
                  {
                    title: 'Miscellaneous',
                    icon: <MoreHorizontal className="w-7 h-7 text-[#3525cd]" />,
                  },
                ]}
                speed={50}
                direction="left"
                gap={24}
                logoHeight={120}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={false}
                ariaLabel="Popular Categories Marquee"
                renderItem={(item: any) => (
                  <div
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer p-5 rounded-2xl flex flex-col items-center justify-center text-center w-48 h-36 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all hover:scale-105 group"
                    style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.7) 0%, rgba(15,23,42,0.85) 100%)', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                  >
                    <div
                      className="w-13 h-13 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                      style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}
                    >
                      {item.icon}
                    </div>
                    <span className="font-bold text-base text-slate-100 whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Stats Bar */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#090d16] to-[#070b14]">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-950/80 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/20">
                Proven Impact &amp; Scale
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">
                Trusted by students across the nation
              </h2>
              <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">
                Empowering university communities with a safe, verified peer-to-peer campus marketplace.
              </p>
            </div>

            {/* Liquid Glass Stats Banner */}
            <div
              className="rounded-3xl p-10 md:p-14 shadow-2xl grid md:grid-cols-3 gap-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.5) 0%, rgba(15,23,42,0.85) 100%)', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div className="reveal-on-scroll transition-all duration-700 opacity-0 translate-y-6">
                <div className="text-4xl lg:text-5xl font-bold text-indigo-400 mb-2">
                  500k+
                </div>
                <div className="text-slate-100 text-sm font-bold uppercase tracking-wider mb-1">
                  Verified Students
                </div>
                <div className="text-slate-400 text-xs">
                  Authenticated with official university emails
                </div>
              </div>

              <div className="reveal-on-scroll transition-all duration-700 delay-100 opacity-0 translate-y-6">
                <div className="text-4xl lg:text-5xl font-bold text-indigo-400 mb-2">
                  1.2M+
                </div>
                <div className="text-slate-100 text-sm font-bold uppercase tracking-wider mb-1">
                  Items Listed
                </div>
                <div className="text-slate-400 text-xs">
                  Textbooks, tech, dorm gear &amp; campus transit
                </div>
              </div>

              <div className="reveal-on-scroll transition-all duration-700 delay-200 opacity-0 translate-y-6">
                <div className="text-4xl lg:text-5xl font-bold text-indigo-400 mb-2">
                  300+
                </div>
                <div className="text-slate-100 text-sm font-bold uppercase tracking-wider mb-1">
                  University Campuses
                </div>
                <div className="text-slate-400 text-xs">
                  Active academic trading networks nationwide
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section className="px-6 py-24 bg-gradient-to-b from-[#070b14] to-[#090d16]">
          <div className="max-w-5xl mx-auto">
            <div
              className="reveal-on-scroll relative rounded-[32px] p-10 md:p-16 text-center text-white shadow-2xl border border-indigo-500/30 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(49,46,129,0.9) 0%, #131738 50%, #0a0d24 100%)', boxShadow: '0 8px 60px rgba(99,102,241,0.15), 0 4px 20px rgba(0,0,0,0.4)' }}
            >
              {/* Radial glow background accent */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>

              {/* Category Pill */}
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-indigo-400/30 backdrop-blur-md">
                Get Started Today
              </div>

              <h2 className="relative z-10 text-3xl md:text-5xl font-bold mb-5 tracking-tight text-white">
                Ready to trade with your campus?
              </h2>
              <p className="relative z-10 text-indigo-200/90 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join thousands of verified students. Save money, list dorm gear, and buy safely within your university community.
              </p>
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SpecularButton
                  size="lg"
                  radius={16}
                  tint="#ffffff"
                  tintOpacity={0.9}
                  textColor="#1e1b4b"
                  lineColor="#818cf8"
                  baseColor="#ffffff"
                  intensity={1.4}
                  followMouse={true}
                  autoAnimate={true}
                  onClick={() => navigate('/login')}
                  className="font-amazon font-bold shadow-xl"
                >
                  Get Started Now
                </SpecularButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#070b14] pt-16 pb-12 font-amazon transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 bg-[#3525cd] flex items-center justify-center text-white rounded-md"
                style={{
                  clipPath:
                    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                }}
              >
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-amazon font-bold text-xl text-indigo-400 tracking-tight">
                CampusHaat
              </span>
            </div>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              Building the most trusted peer-to-peer marketplace for university students. Secure, local, and academic-first.
            </p>
          </div>

          <div>
            <h5 className="font-amazon text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Product
            </h5>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#how-it-works" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#trust" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#trust" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Verification
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-amazon text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Company
            </h5>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-amazon text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Legal
            </h5>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-indigo-400 transition-colors">
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-300">
          <p>© 2026 CampusHaat Verified Academic Network. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
