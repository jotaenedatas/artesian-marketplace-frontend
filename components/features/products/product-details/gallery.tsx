"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const safeImages = images && images.length > 0 ? images : ["/placeholder.png"];
  const [selectedImage, setSelectedImage] = useState(safeImages[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Image
          src={selectedImage}
          alt={`Foto principal de ${productName}`}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {safeImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                selectedImage === img
                  ? "border-blue-600 ring-2 ring-blue-600/20"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`Vista ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}