"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: true }}
      loop={images.length > 1}
      className="overflow-hidden rounded-3xl shadow-xl [--swiper-navigation-color:#fff] [--swiper-navigation-size:22px]"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="relative aspect-[16/9]">
            <Image src={src} alt={`${title} ${i + 1}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" priority={i === 0} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
