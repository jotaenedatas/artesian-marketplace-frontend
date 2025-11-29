import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/features/home/hero";
import { CategoriesSection } from "@/components/features/home/categories";
import { ProductCard } from "@/components/features/products/product-card";
import { getAPIClient } from "@/services/api";
import { BackendProduct } from "@/types/backend";

async function getFeaturedProducts() {
  const api = await getAPIClient();
  try {
    const { data } = await api.get<BackendProduct[]>("/products");

    // Filtro para não mostrar produtos "Rascunho"
    return data.filter((p) => p.status !== "DRAFT");
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main>
        <HeroSection />

        {/* Componente agora lida com categorias sem imagem */}
        <CategoriesSection />

        <section id="produtos" className="px-8 py-20 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                Produtos em Alta
              </h3>
              <p className="text-gray-500 mt-2">
                Destaques da comunidade JC INC.
              </p>
            </div>
            <a
              href="/busca"
              className="text-blue-600 font-medium hover:underline hidden sm:block"
            >
              Ver todos &rarr;
            </a>
          </div>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  // Mapeamento: backend.title -> frontend.name
                  name={product.title}
                  description={product.description}
                  // Mapeamento: backend.price(string) -> frontend.price(number)
                  price={Number(product.price)}
                  // Mapeamento: pega primeira url ou undefined
                  imageUrl={
                    product.imageUrls.length > 0
                      ? product.imageUrls[0]
                      : undefined
                  }
                  // Mapeamento: pega nome da categoria aninhada
                  categoryName={product.categories[0]?.name}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
              <p className="text-gray-500">
                Nenhum produto disponível no momento.
              </p>
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <a
              href="/busca"
              className="text-blue-600 font-medium hover:underline"
            >
              Ver todos os produtos &rarr;
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12 text-center text-gray-500">
        <p className="mb-2">© 2025 JC INC. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
