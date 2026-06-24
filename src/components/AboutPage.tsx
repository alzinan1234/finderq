// @ts-nocheck
'use client'
import React from 'react';
import { Users, Zap, Shield, TrendingUp, Star, MessageCircle, Award, Target, Swords, Trophy, Sparkles } from 'lucide-react';
const backgroundImage = '/assets/aY1Un5.jpg';
const finderQLogo = '/assets/999999-Photoroom.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { translations, LanguageCode } from '@/utils/translations';

interface AboutPageProps {
  onGetStarted: () => void;
  language?: string;
}

export function AboutPage({ onGetStarted, language = 'en' }: AboutPageProps) {
  const t = (key: keyof typeof translations.en): string => {
    const lang = language as LanguageCode;
    return (translations[lang] as any)?.[key] || (translations.en as any)[key] || key;
  };


  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from(logoRef.current, { y: -60, opacity: 0, duration: 1, ease: 'power3.out' })
        .from(titleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e27] overflow-hidden">
      {/* Hero Section with Background */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/30 via-[#0a0e27]/20 to-[#0a0e27]/80" />
        
        {/* Animated Glow Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c89b3c]/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={finderQLogo}
              alt="FinderQ Logo"
              className="h-72 w-auto object-contain"
            />
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <h1 className="text-white text-3xl mb-4 font-bold">
              {t('heroTitle')}
            </h1>
            <p className="text-[#c89b3c] text-xl mb-6 font-medium">
              {t('heroSubtitle')}
            </p>
          </div>

          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            {t('heroDescription')}
          </p>
        </div>

        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0e27]/100 via-[#0a0e27]/50 to-transparent" />
      </div>

      {/* How It Works Section - seamless continuation */}
      <div className="relative py-24 px-6 bg-[#0a0e27]" style={{ marginTop: '-1px' }}>
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#c89b3c]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white text-5xl mb-4 font-bold">HOW IT WORKS?</h2>
            <p className="text-white/60 text-xl">Get started in just a few simple steps</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Post an Ad */}
            <div className="group relative bg-gradient-to-br from-[#1a1d29] to-[#0a0e27] rounded-2xl p-8 border border-[#00d4ff]/20 hover:border-[#00d4ff]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#00b8e6] rounded-xl flex items-center justify-center shadow-lg shadow-[#00d4ff]/50">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold">Post an Ad</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#00d4ff] font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Select Your Region</h4>
                      <p className="text-white/60 text-sm">Choose EUW, EUNE, NA, KR, or BR from the region selector</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#00d4ff] font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Click "Create New Post"</h4>
                      <p className="text-white/60 text-sm">Fill in your rank, preferred roles, and game modes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#00d4ff] font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Write Your Message</h4>
                      <p className="text-white/60 text-sm">Describe what you're looking for and publish your ad</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#00d4ff] font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Connect with Players</h4>
                      <p className="text-white/60 text-sm">Receive messages and start playing together!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Riot Account */}
            <div className="group relative bg-gradient-to-br from-[#1a1d29] to-[#0a0e27] rounded-2xl p-8 border border-[#c89b3c]/20 hover:border-[#c89b3c]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c89b3c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c89b3c] to-[#8b6914] rounded-xl flex items-center justify-center shadow-lg shadow-[#c89b3c]/50">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold">Connect Riot Account</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#c89b3c]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#c89b3c] font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Open Your Profile</h4>
                      <p className="text-white/60 text-sm">Click on your avatar in the top-right corner</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#c89b3c]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#c89b3c] font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Click "Link Riot Account"</h4>
                      <p className="text-white/60 text-sm">Enter your Riot ID and tagline (e.g., Username#EUW)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#c89b3c]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#c89b3c] font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Get Verified</h4>
                      <p className="text-white/60 text-sm">Your rank, champions, and stats will be synced automatically</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#c89b3c]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#c89b3c] font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Unlock Riot Verified Badge</h4>
                      <p className="text-white/60 text-sm">Show others you're a verified player with exclusive features</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={onGetStarted}
              className="group relative px-10 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-xl hover:from-[#0066ff] hover:to-[#00d4ff] transition-all shadow-xl hover:shadow-2xl hover:shadow-[#00d4ff]/50 transform hover:scale-105 duration-300"
            >
              <span className="relative z-10 flex items-center gap-3 text-lg font-bold">
                Get Started Now
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            <p className="text-white/50 text-sm mt-4">Free to join • No credit card required</p>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16" />
    </div>
  );
}