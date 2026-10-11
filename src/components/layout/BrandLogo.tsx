import React from "react";

interface BrandLogoProps {
  isScrolled?: boolean;
  className?: string;
}

export function BrandLogo({ isScrolled = false, className = "" }: BrandLogoProps) {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      {/* Light background logo (for scrolled white navbar & light cards) */}
      <img
        src="/logo.png"
        alt="Shan Testing and Trading Company"
        className={`h-11 sm:h-12 w-auto object-contain transition-opacity duration-300 ${
          isScrolled ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      />

      {/* Dark background logo (for transparent navy hero navbar & dark footer) */}
      <img
        src="/logo-dark.png"
        alt="Shan Testing and Trading Company"
        className={`h-11 sm:h-12 w-auto object-contain transition-opacity duration-300 ${
          isScrolled ? "opacity-0 hidden" : "opacity-100 block"
        }`}
      />
    </div>
  );
}
