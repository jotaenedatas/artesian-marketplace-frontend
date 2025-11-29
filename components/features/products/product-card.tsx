import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string | null;
  categoryName?: string;
}

export function ProductCard({
  id,
  name,
  price,
  description,
  imageUrl,
  categoryName,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition p-4 border border-gray-100 group flex flex-col h-full relative">
      {/* Imagem ou Placeholder */}
      <div className="h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-bold group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-xs font-medium">Sem foto</span>
          </div>
        )}
      </div>

      {/* Nome da Categoria (se houver) */}
      {categoryName && (
        <span className="text-xs text-blue-600 font-semibold uppercase mb-1 block truncate">
          {categoryName}
        </span>
      )}

      <h4
        className="text-lg font-semibold text-gray-900 mb-1 leading-tight line-clamp-1"
        title={name}
      >
        {name}
      </h4>

      <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
        {description}
      </p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
        <span className="font-bold text-xl text-gray-900">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </span>

        <Link
          href={`/produto/${id}`}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Comprar
        </Link>
      </div>
    </div>
  );
}
