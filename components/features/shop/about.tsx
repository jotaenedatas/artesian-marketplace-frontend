import { Info } from "lucide-react";

export function ShopAbout({ description }: { description: string }) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Info className="text-blue-600" size={20} />
        <h2 className="text-xl font-bold text-gray-900">Sobre a Loja</h2>
      </div>
      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}