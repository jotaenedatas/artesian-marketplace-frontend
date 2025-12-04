"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import { Slider } from "@/components/ui/slider"; 
import { Star, X, Filter } from "lucide-react";

// --- CONSTANTES ---
const MIN_LIMIT = 0;
const MAX_LIMIT = 1000;

interface FilterFormProps {
  initialPriceRange: number[];
  initialMaterial: string;
}

function FilterForm({ initialPriceRange, initialMaterial }: FilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [material, setMaterial] = useState(initialMaterial);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // 1. Preço
    if (priceRange[0] > MIN_LIMIT) params.set("minPrice", priceRange[0].toString());
    else params.delete("minPrice");

    if (priceRange[1] < MAX_LIMIT) params.set("maxPrice", priceRange[1].toString());
    else params.delete("maxPrice");

    // 2. Material
    if (material) params.set("material", material);
    else params.delete("material");

    // 3. Resetar Paginação
    params.delete("cursor");

    startTransition(() => {
      router.push(`/busca?${params.toString()}`);
    });
  };

  const handleRatingClick = (rating: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchParams.get("minRating") === rating.toString()) {
      params.delete("minRating");
    } else {
      params.set("minRating", rating.toString());
    }
    
    params.delete("cursor");
    router.push(`/busca?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/busca");
  };

  return (
    <div className="space-y-8 p-1">
      {/* Cabeçalho Mobile */}
      <div className="lg:hidden flex items-center gap-2 text-gray-900 font-bold mb-4">
        <Filter size={20} />
        <h2>Filtros</h2>
      </div>

      {/* --- PREÇO --- */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Faixa de Preço</h3>
        </div>
        
        <div className="px-2 mb-6">
          <Slider
            value={priceRange}
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={10}
            minStepsBetweenThumbs={1}
            onValueChange={(vals) => setPriceRange(vals)}
            className="my-4"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">R$</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500 transition shadow-sm"
              placeholder="Min"
            />
          </div>
          <span className="text-gray-400 font-medium">-</span>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">R$</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500 transition shadow-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* --- MATERIAL --- */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Material</h3>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white text-sm cursor-pointer hover:border-gray-400 transition"
        >
          <option value="">Todos os materiais</option>
          <option value="Algodão">Algodão</option>
          <option value="Couro">Couro</option>
          <option value="Madeira">Madeira</option>
          <option value="Cerâmica">Cerâmica</option>
          <option value="Metal">Metal</option>
        </select>
      </div>

      <hr className="border-gray-100" />

      {/* --- AVALIAÇÃO --- */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Avaliação Mínima</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => {
            const isActive = searchParams.get("minRating") === rating.toString();
            return (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={`flex items-center justify-between w-full p-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 border border-blue-200 font-medium" 
                    : "text-gray-600 hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < rating ? "fill-current" : "text-gray-300 fill-none"}
                      />
                    ))}
                  </div>
                  <span>& Acima</span>
                </div>
                {isActive && <X size={16} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- ACTIONS --- */}
      <div className="pt-4 space-y-3 sticky bottom-0 bg-white pb-4 lg:static lg:pb-0">
        <button
          onClick={applyFilters}
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transform flex justify-center items-center gap-2"
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Aplicar Filtros"
          )}
        </button>
        
        <button
           onClick={clearFilters}
           className="w-full text-gray-500 text-sm hover:text-gray-900 py-2 transition underline decoration-gray-300 hover:decoration-gray-900"
        >
          Limpar tudo
        </button>
      </div>
    </div>
  );
}

function FilterWrapper() {
  const searchParams = useSearchParams();

  const initialMin = Number(searchParams.get("minPrice")) || MIN_LIMIT;
  const initialMax = Number(searchParams.get("maxPrice")) || MAX_LIMIT;
  const initialMaterial = searchParams.get("material") || "";

  const filterKey = JSON.stringify({ initialMin, initialMax, initialMaterial });

  return (
    <aside className="w-full lg:w-64">
      <FilterForm 
        key={filterKey} 
        initialPriceRange={[initialMin, initialMax]} 
        initialMaterial={initialMaterial} 
      />
    </aside>
  );
}

export function FilterSidebar() {
  return (
    <Suspense fallback={
      <div className="w-full lg:w-64 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    }>
      <FilterWrapper />
    </Suspense>
  );
}