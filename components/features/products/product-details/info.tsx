import { BackendProduct } from "@/types/backend";
import { Store, Package, ShoppingBag, Heart } from "lucide-react";

interface ProductInfoProps {
  product: BackendProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const formatPrice = (val: string | number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(val));

  const hasStock = product.stock > 0;

  return (
    <div className="flex flex-col h-full">
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

      {/* Título */}
      <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
        {product.title}
      </h1>

      {/* Preço */}
      <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-gray-100">
        <span className="text-4xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
          <span className="text-xl text-gray-400 line-through decoration-gray-400">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Descrição */}
      <div className="prose prose-gray text-gray-600 leading-relaxed mb-8">
        <p>{product.description}</p>
      </div>

      {/* Detalhes Técnicos (Só renderiza se tiver os dados) */}
      {(product.material || product.weight) && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {product.material && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Package size={18} />
                <span className="text-xs font-semibold uppercase">Material</span>
              </div>
              <span className="font-medium text-gray-900">{product.material}</span>
            </div>
          )}
          {product.weight && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Package size={18} />
                <span className="text-xs font-semibold uppercase">Peso</span>
              </div>
              <span className="font-medium text-gray-900">{product.weight} kg</span>
            </div>
          )}
        </div>
      )}

      {/* Card do Vendedor (Artesão) */}
      {product.artisan && (
        <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition hover:border-blue-200">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Store size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Vendido e entregue por
            </p>
            <p className="font-bold text-gray-900 text-lg">
              {product.artisan.storeName}
            </p>
          </div>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
        <button
          disabled={!hasStock}
          className="flex-1 h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={20} />
          {hasStock ? "Adicionar à Sacola" : "Indisponível"}
        </button>
      </div>
    </div>
  );
}