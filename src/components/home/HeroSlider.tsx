"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import type { HeroSlide } from "@/lib/types";
import { LinkButton } from "@/components/ui/LinkButton";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-navy-950">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={1100}
        onRealIndexChange={(s) => setActive(s.realIndex)}
        className="h-full w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.id}>
            <Image src={s.image} alt={s.title} fill priority={i === 0} sizes="100vw" className="object-cover" />
            <div className="hero-slider-overlay absolute inset-0" />
            <div className="pattern-geo absolute inset-0 opacity-40" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 backdrop-blur">
                {slides[active]?.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-[1.12] text-white sm:mt-6 sm:text-5xl lg:text-6xl">
                {slides[active]?.title}
              </h1>
              <p className="mt-3.5 max-w-xl text-base text-slate-200 sm:mt-5 sm:text-lg">
                {slides[active]?.subtitle}
              </p>
              <div className="pointer-events-auto mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <LinkButton href="/#quote" variant="gold">
                  Request a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </LinkButton>
                <LinkButton href="/projects" variant="ghost-light">
                  View Our Projects
                </LinkButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ChevronDown />
      </motion.a>
    </section>
  );
}
