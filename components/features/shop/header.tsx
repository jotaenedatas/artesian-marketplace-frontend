import { ArtisanDashboardStats } from "@/types/backend";
import { Store, Star, Package } from "lucide-react";

interface ShopHeaderProps {
  storeName: string;
  stats: ArtisanDashboardStats | null;
}

export function ShopHeader({ storeName, stats }: ShopHeaderProps) {
  const rating = stats ? Number(stats.averageRating) : 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-8 transition-all hover:shadow-md">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
        <Store size={48} strokeWidth={1.5} />
      </div>

      {/* Informações */}
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{storeName}</h1>

        {stats && (
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
            {/* Avaliação */}
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100 text-yellow-700">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-yellow-600/70">
                • {stats.totalReviews} avaliações
              </span>
            </div>

            {/* Total de Produtos */}
            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
              <Package size={16} className="text-gray-500" />
              <span>{stats.totalProducts} produtos cadastrados</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
