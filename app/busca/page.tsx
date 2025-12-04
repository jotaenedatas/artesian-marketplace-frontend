import { Header } from "@/components/layout/header";
import { FilterSidebar } from "@/components/features/search/filter-sidebar";
import { ProductCard } from "@/components/features/products/product-card";
import Link from "next/link";
import { SearchX, ArrowRight, ArrowLeft } from "lucide-react";
import { searchProducts } from "@/services/products.service";

interface SearchPageProps {
  searchParams: Promise<{
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    material?: string;
    minRating?: string;
    cursor?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const filters = {
    search: params.search,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    material: params.material,
    minRating: params.minRating ? Number(params.minRating) : undefined,
    cursor: params.cursor,
  };

  const { data: products, meta } = await searchProducts(filters);

  const getNextPageUrl = () => {
    const nextParams = new URLSearchParams();
    if (params.search) nextParams.set("search", params.search);
    if (params.minPrice) nextParams.set("minPrice", params.minPrice);
    if (params.maxPrice) nextParams.set("maxPrice", params.maxPrice);
    if (params.material) nextParams.set("material", params.material);
    if (params.minRating) nextParams.set("minRating", params.minRating);

    if (meta.nextCursor) nextParams.set("cursor", meta.nextCursor);

    return `/busca?${nextParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb e Título */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">
              Início
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Busca</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            {params.search
              ? `Resultados para "${params.search}"`
              : "Explorar Produtos"}
          </h1>
          <p className="text-gray-500 mt-2">
            {products.length > 0
              ? `Mostrando ${products.length} produtos encontrados.`
              : "Nenhum produto encontrado com os filtros atuais."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar (Esquerda no Desktop, Topo no Mobile) */}
          <aside className="w-full lg:w-72 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Área de Resultados */}
          <section className="flex-1 w-full">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.title}
                      price={Number(product.price)}
                      description={product.description}
                      imageUrl={
                        product.imageUrls.length > 0
                          ? product.imageUrls[0]
                          : null
                      }
                      categoryName={product.categories?.[0]?.name}
                    />
                  ))}
                </div>

                {/* Paginação (Cursor) */}
                <div className="mt-12 flex justify-center items-center gap-4">
                  {params.cursor && (
                    <Link
                      href="/busca"
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition font-medium"
                    >
                      <ArrowLeft size={18} /> Início
                    </Link>
                  )}

                  {meta.hasNextPage && meta.nextCursor && (
                    <Link
                      href={getNextPageUrl()}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-600/20"
                    >
                      Próxima Página <ArrowRight size={18} />
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-dashed border-gray-200 text-center px-4">
                <div className="p-4 bg-gray-50 rounded-full mb-4">
                  <SearchX className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Não encontramos produtos que correspondam à sua seleção. Tente
                  ajustar os filtros ou buscar por outro termo.
                </p>
                <Link
                  href="/busca"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Limpar todos os filtros
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
