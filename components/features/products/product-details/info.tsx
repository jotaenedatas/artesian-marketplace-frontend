"use client";

import { BackendProduct, UserRole } from "@/types/backend";
import { Store, Package, ShoppingBag, Check, Ban } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";

interface ProductInfoProps {
  product: BackendProduct;
  userRole?: string | null; // Nova prop opcional
}

export function ProductInfo({ product, userRole }: ProductInfoProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (val: string | number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(val));

  const hasStock = product.stock > 0;

  // LÓGICA DE BLOQUEIO
  // Se tem role definida E não é CUSTOMER, então é restrito (Artesão/Admin)
  // Se for null (visitante), permite comprar
  const isRestrictedUser = userRole && userRole !== UserRole.CUSTOMER;

  const handleAddToCart = () => {
    if (!hasStock || isRestrictedUser) return;

    setIsAdding(true);
    addItem({
      productId: product.id,
      title: product.title,
      price: Number(product.price),
      stock: product.stock,
      imageUrl: product.imageUrls[0],
      quantity: 1,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* ... (Categoria, Título, Preço e Descrição continuam iguais) ... */}

      {/* Categoria e Status */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100">
          {product.categories?.[0]?.name || "Artesanato"}
        </span>

        {hasStock ? (
          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
            Em Estoque
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full border border-red-100">
            Esgotado
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
        {product.title}
      </h1>

      <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-gray-100">
        <span className="text-4xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice &&
          Number(product.compareAtPrice) > Number(product.price) && (
            <span className="text-xl text-gray-400 line-through decoration-gray-400">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
      </div>

      <div className="prose prose-gray text-gray-600 leading-relaxed mb-8">
        <p>{product.description}</p>
      </div>

      {/* Detalhes Técnicos (Peso/Material) aqui... igual ao anterior */}
      {(product.material || product.weight) && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {product.material && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Package size={18} />
                <span className="text-xs font-semibold uppercase">
                  Material
                </span>
              </div>
              <span className="font-medium text-gray-900">
                {product.material}
              </span>
            </div>
          )}
          {product.weight && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Package size={18} />
                <span className="text-xs font-semibold uppercase">Peso</span>
              </div>
              <span className="font-medium text-gray-900">
                {product.weight} kg
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card do Vendedor (Link) aqui... igual ao anterior */}
      {product.artisan && (
        <Link
          href={`/artesao/${product.artisan.id}`}
          className="flex items-center gap-4 mb-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:border-blue-300 hover:shadow-md cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Store size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Vendido e entregue por
            </p>
            <p className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">
              {product.artisan.storeName}
            </p>
          </div>
        </Link>
      )}

      {/* BOTÃO DE AÇÃO COM RESTRIÇÃO */}
      <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
        {isRestrictedUser ? (
          // CASO 1: ARTESÃO/ADMIN (Botão Bloqueado)
          <div className="w-full p-4 bg-gray-100 text-gray-500 rounded-xl border border-gray-200 text-center flex flex-col items-center justify-center gap-1 cursor-not-allowed">
            <div className="flex items-center gap-2 font-bold">
              <Ban size={20} />
              <span>Compra Indisponível</span>
            </div>
            <p className="text-xs">
              Sua conta de {userRole?.toLowerCase()} não permite compras.
            </p>
          </div>
        ) : (
          // CASO 2: CLIENTE OU VISITANTE (Botão Normal)
          <button
            onClick={handleAddToCart}
            disabled={!hasStock || isAdding}
            className={`flex-1 h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              ${
                isAdding
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
        )}
      </div>
    </div>
  );
}
