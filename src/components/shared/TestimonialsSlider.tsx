"use client";

import { Quote } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { Testimonial } from "@/lib/types";

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="!pb-12 sm:!pb-14"
    >
      {items.map((t) => (
        <SwiperSlide key={t.id} className="!h-auto">
          <figure className="relative h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:rounded-3xl sm:p-8">
            <Quote className="h-8 w-8 text-gold-500/60 sm:h-9 sm:w-9" />
            <blockquote className="mt-3.5 text-sm leading-relaxed text-slate-700 sm:mt-4 sm:text-base">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 sm:mt-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0b2545] font-display text-sm font-bold text-gold-400 sm:h-11 sm:w-11">
                {t.author.charAt(0)}
              </span>
              <span className="text-xs leading-tight sm:text-sm">
                <span className="block font-bold text-[#0b2545]">{t.author}</span>
                <span className="text-slate-500">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
