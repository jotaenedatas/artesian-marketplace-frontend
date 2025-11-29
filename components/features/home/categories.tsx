import { getAPIClient } from "@/services/api";
import { BackendCategory } from "@/types/backend";
import { CategoryCarousel } from "./category-carousel";

export async function CategoriesSection() {
  const api = await getAPIClient();
  let categories: BackendCategory[] = [];

  try {
    const { data } = await api.get<BackendCategory[]>("/categories");
    categories = data;
  } catch (error) {
    console.error("Erro ao buscar categorias");
  }

  if (categories.length === 0) return null;

  return (
    <section className="px-8 py-10 border-b border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl font-bold mb-6 text-gray-900">
          Navegue por categorias
        </h3>

        <CategoryCarousel categories={categories} />
      </div>
    </section>
  );
}
