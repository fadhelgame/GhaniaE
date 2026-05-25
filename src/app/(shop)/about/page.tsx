"use client";

import Link from "next/link";
import { Leaf, Shield, Sparkles, Heart, Users, Award } from "lucide-react";
import { useT } from "@/hooks/useT";
import { translations } from "@/lib/translations";

const missionIcons = [Sparkles, Leaf, Shield, Heart, Users];

export default function AboutPage() {
  const { t, tArr } = useT();
  const a = translations.about;

  const missions = tArr(a.missions);

  return (
    <div className="min-h-screen bg-[#F7FAF9]">

      {/* Hero */}
      <section className="relative bg-[#1A2B2A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#5BA8A0]"
              style={{
                width: `${(i + 1) * 180}px`,
                height: `${(i + 1) * 180}px`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
          <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-4">
            {t(a.pageLabel)}
          </p>
          <h1
            className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t(a.heroTitle1)}{" "}
            <em className="text-[#8ECEC8] not-italic">{t(a.heroTitle2)}</em>
          </h1>
          <p className="text-[#8AA8A5] text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            {t(a.heroDesc)}
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-[#E4F2F0]" />
            <div className="absolute w-56 h-56 rounded-full bg-[#C4E4E0]/60" />
            <div className="absolute text-center">
              <p className="text-5xl font-bold text-[#1A2B2A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                غنية
              </p>
              <p className="text-sm text-[#5BA8A0] mt-2 font-medium tracking-widest uppercase">Ghaniah</p>
              <p className="text-xs text-[#8AA8A5] mt-1">
                {t(a.meaning1)} · {t(a.meaning2)} · {t(a.meaning3)}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
                {t(a.ourStory)}
              </p>
              <h2
                className="text-3xl font-bold text-[#1A2B2A] leading-tight mb-5"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {t(a.bornTitle)}
              </h2>
            </div>
            <p className="text-[#4A6663] text-sm leading-relaxed">{t(a.story1)}</p>
            <p className="text-[#4A6663] text-sm leading-relaxed">{t(a.story2)}</p>
            <p className="text-[#4A6663] text-sm leading-relaxed">{t(a.story3)}</p>
          </div>
        </div>
      </section>

      {/* Visi */}
      <section className="bg-white border-y border-[#D8ECEB]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E4F2F0] flex items-center justify-center mx-auto mb-6">
            <Award size={20} className="text-[#5BA8A0]" />
          </div>
          <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
            {t(a.visionLabel)}
          </p>
          <h2
            className="text-2xl lg:text-3xl font-bold text-[#1A2B2A] leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t(a.visionText)}
          </h2>
        </div>
      </section>

      {/* Misi */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
            {t(a.missionLabel)}
          </p>
          <h2
            className="text-2xl lg:text-3xl font-bold text-[#1A2B2A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t(a.commitmentTitle)}
          </h2>
        </div>

        <div className="space-y-4">
          {missions.map((item, i) => {
            const Icon = missionIcons[i];
            return (
              <div key={i} className="flex items-start gap-5 bg-white rounded-2xl border border-[#D8ECEB] p-5">
                <div className="w-10 h-10 rounded-xl bg-[#E4F2F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-[#5BA8A0]" />
                </div>
                <p className="text-sm text-[#4A6663] leading-relaxed pt-1.5">{item}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A2B2A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 text-center">
          <h2
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t(a.ctaTitle)}
          </h2>
          <p className="text-[#8AA8A5] text-sm mb-8">{t(a.ctaDesc)}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#5BA8A0] hover:bg-[#4A9189] text-white px-8 py-3.5 rounded-full text-sm font-medium transition-colors"
          >
            {t(a.ctaBtn)}
          </Link>
        </div>
      </section>
    </div>
  );
}
