"use client"
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional icons

type Props = {
  images: string[];
  title: string;
};

export default function ImageCarousel({ images, title }: Props) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-96 mb-6 overflow-hidden rounded-md">
      <div className="w-full h-full relative">
        <Image
          src={images[current]}
          alt={`${title} image ${current + 1}`}
          fill
          className="object-cover rounded-md transition duration-500"
        />
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full z-10"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full z-10"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full ${
                current === i ? "bg-white" : "bg-white/50"
              } cursor-pointer`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
