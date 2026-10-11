"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/shared/ProjectCard";

export function ProjectsSlider({ projects }: { projects: Project[] }) {
  const ref = useRef<SwiperType | null>(null);
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        onSwiper={(s) => (ref.current = s)}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        loop
        className="!pb-14"
      >
        {projects.map((p) => (
          <SwiperSlide key={p.id} className="!h-auto">
            <ProjectCard p={p} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute -top-20 right-0 hidden gap-2 sm:flex">
        {[
          { Icon: ChevronLeft, fn: () => ref.current?.slidePrev(), label: "Previous" },
          { Icon: ChevronRight, fn: () => ref.current?.slideNext(), label: "Next" },
        ].map(({ Icon, fn, label }) => (
          <button
            key={label}
            type="button"
            onClick={fn}
            aria-label={label}
            suppressHydrationWarning
            className="grid h-11 w-11 place-items-center rounded-full border border-navy-900/15 text-navy-900 transition hover:bg-navy-900 hover:text-white"
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
