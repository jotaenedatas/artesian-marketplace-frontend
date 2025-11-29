"use client";

import { useRef } from "react";
import Link from "next/link";
import { BackendCategory } from "@/types/backend";

interface CategoryCarouselProps {
  categories: BackendCategory[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função para rolar para a esquerda
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Função para rolar para a direita
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Botão Esquerda (só aparece no hover da seção para ficar clean) */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 -ml-4"
        aria-label="Rolar para esquerda"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Área de Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Esconde barra de rolagem
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/busca?categoriaId=${cat.id}`}
            className="flex-shrink-0"
          >
            <div className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors whitespace-nowrap font-medium text-sm shadow-sm">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>

      {/* Botão Direita */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity -mr-4"
        aria-label="Rolar para direita"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
