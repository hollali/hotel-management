"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

type ImageItem = { url?: string; file?: { asset?: { url?: string } } };

type Props = {
  coverImage: ImageItem;
  images?: ImageItem[];
  roomName: string;
};

const ImageGallery = ({ coverImage, images = [], roomName }: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages: string[] = [
    coverImage?.url || coverImage?.file?.asset?.url || "",
    ...images.map((img) => img.url || img.file?.asset?.url || ""),
  ].filter(Boolean);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* Main Cover Image */}
      <div
        className="relative h-[400px] md:h-[500px] overflow-hidden mb-6 cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        {allImages[0] ? (
          <>
            <Image
              src={allImages[0]}
              alt={roomName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <FaExpand className="text-stellar-blue text-sm" />
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-beige flex items-center justify-center">
            <span className="text-stellar-grey">No Image</span>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {allImages.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {allImages.slice(0, 5).map((src, i) => (
            <div
              key={i}
              className="relative h-24 w-24 md:h-28 md:w-28 overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <Image
                src={src}
                alt={`${roomName} ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {i === 4 && allImages.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    +{allImages.length - 5}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-10 p-2 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 text-white/60 text-sm z-10">
            {activeIndex + 1} / {allImages.length}
          </div>

          {/* Previous */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 md:left-6 text-white/60 hover:text-white transition-colors z-10 p-3 rounded-full hover:bg-white/10"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-xl md:text-2xl" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-8 md:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[activeIndex]}
              alt={`${roomName} ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* Next */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 md:right-6 text-white/60 hover:text-white transition-colors z-10 p-3 rounded-full hover:bg-white/10"
              aria-label="Next image"
            >
              <FaChevronRight className="text-xl md:text-2xl" />
            </button>
          )}

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  className={`relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-sm transition-all duration-200 ${
                    i === activeIndex
                      ? "ring-2 ring-brand opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
