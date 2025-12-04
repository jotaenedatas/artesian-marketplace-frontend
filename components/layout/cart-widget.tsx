"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export function CartWidget() {
  const count = useCartStore((state) => state.getCount());
  const [mounted, setMounted] = useState(false);

  // CORREÇÃO: Usamos setTimeout para evitar o erro de "Synchronous setState"
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    // Renderiza um ícone vazio e estático enquanto carrega
    // Isso evita o "pulo" visual e erros de hidratação
    return (
      <div className="p-2 text-gray-400">
        <ShoppingCart size={24} />
      </div>
    );
  }

  return (
    <Link
      href="/checkout"
      className="relative p-2 text-gray-700 hover:text-blue-600 transition group"
      title="Ver meu carrinho"
    >
      <ShoppingCart
        size={24}
        className="group-hover:scale-110 transition-transform"
      />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white animate-in zoom-in duration-300">
          {count}
        </span>
      )}
    </Link>
  );
}
