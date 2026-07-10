"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageItem = { url?: string; file?: { asset?: { url?: string } } };

type Props = {
  coverImage: ImageItem;
  images?: ImageItem[];
  roomName: string;
};

const ImageGallery = ({ coverImage, images = [], roomName }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages: string[] = [
    coverImage?.url || coverImage?.file?.asset?.url || "",
    ...images.map((img) => img.url || img.file?.asset?.url || ""),
  ].filter(Boolean);

  const activeSrc = allImages[activeIndex];

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (allImages.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-beige flex items-center justify-center">
        <span className="text-stellar-grey">No Image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 mb-8">
      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden shrink-0">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-20 h-20 lg:w-[100px] lg:h-[100px] overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? "ring-2 ring-brand ring-offset-2 opacity-100"
                  : "opacity-50 hover:opacity-80 ring-offset-0"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${roomName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 h-[350px] sm:h-[400px] md:h-[480px] lg:h-[520px] overflow-hidden bg-beige">
        <Image
          key={activeIndex}
          src={activeSrc}
          alt={`${roomName} ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />

        {/* Nav Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full shadow-md z-10"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-stellar-blue text-sm" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full shadow-md z-10"
              aria-label="Next image"
            >
              <FaChevronRight className="text-stellar-blue text-sm" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full z-10">
            {activeIndex + 1} / {allImages.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
