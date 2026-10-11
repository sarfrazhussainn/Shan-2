"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const validImages = images?.filter(Boolean) ?? [];

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl bg-slate-100 shadow-md sm:aspect-[16/10] sm:rounded-3xl lg:aspect-[16/9]">
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          No preview available
        </div>
      </div>
    );
  }

  if (validImages.length === 1) {
    return (
      <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl shadow-xl sm:aspect-[16/10] sm:rounded-3xl lg:aspect-[16/9]">
        <Image
          src={validImages[0]}
          alt={title}
          fill
          sizes="(min-width:1024px) 65vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-full min-w-0 overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={validImages.length > 1}
        className="aspect-[4/3] w-full max-w-full sm:aspect-[16/10] lg:aspect-[16/9] [--swiper-navigation-color:#fff] [--swiper-navigation-size:18px] sm:[--swiper-navigation-size:24px]"
      >
        {validImages.map((src, i) => (
          <SwiperSlide key={i} className="relative h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`${title} - view ${i + 1}`}
                fill
                sizes="(min-width:1024px) 65vw, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
