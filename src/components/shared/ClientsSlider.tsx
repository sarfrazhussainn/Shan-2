"use client";

import Image from "next/image";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Client } from "@/lib/types";

export function ClientLogo({ c }: { c: Client }) {
  if (c.logo)
    return <Image src={c.logo} alt={c.name} width={160} height={64} className="h-10 w-auto object-contain sm:h-12" />;
  const initials = c.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0b2545] font-display text-xs font-bold text-gold-400 sm:h-11 sm:w-11 sm:text-sm">
        {initials}
      </span>
      <div className="leading-tight">
        <div className="font-display text-sm font-bold text-[#0b2545] sm:text-base">{c.name}</div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[11px]">
          {c.industry}
        </div>
      </div>
    </div>
  );
}

export function ClientsSlider({ clients }: { clients: Client[] }) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      slidesPerView="auto"
      spaceBetween={14}
      loop
      freeMode
      speed={5000}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      allowTouchMove={false}
      className="[&_.swiper-wrapper]:!ease-linear"
    >
      {clients.concat(clients).map((c, i) => (
        <SwiperSlide key={`${c.id}-${i}`} className="!w-auto">
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-sm sm:rounded-2xl sm:px-6 sm:py-4">
            <ClientLogo c={c} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
