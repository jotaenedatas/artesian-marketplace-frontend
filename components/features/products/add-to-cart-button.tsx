'use client';

import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { ShoppingBag, Check } from "lucide-react";

interface AddToCartProps {
  productId: string;
  price: number;
  name: string;
  imageUrl?: string;
  stock: number;
}

export function AddToCartButton({ productId, price, name, imageUrl, stock }: AddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const hasStock = stock > 0;

  const handleAddToCart = () => {
    if (!hasStock) return;

    setIsAdding(true);
    
    addItem({
      productId,
      title: name,
      price,
      imageUrl,
      stock, // Mudei de maxStock para stock para bater com a interface do addItem
      quantity: 1
    });

    // Feedback visual rápido (volta ao normal em 2s)
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!hasStock || isAdding}
      className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${isAdding 
          ? "bg-green-600 text-white shadow-green-600/20" 
          : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
        }
      `}
    >
      {isAdding ? (
        <>
          <Check size={24} />
          Adicionado!
        </>
      ) : hasStock ? (
        <>
          <ShoppingBag size={20} />
          Adicionar à Sacola
        </>
      ) : (
        "Produto Indisponível"
      )}
    </button>
  );
}