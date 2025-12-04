import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAPIClient } from "@/services/api";
import { ProductCard } from "@/components/features/products/product-card";
import { BackendProduct } from "@/types/backend";

// Tipagem baseada no retorno do seu getArtisanById
interface PublicArtisan {
  id: string;
  storeName: string;
  storeDescription: string | null;
  userId: string; 
  products: BackendProduct[];
}

interface CurrentUser {
  id: string;
}

export default async function PublicStorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const api = await getAPIClient();

  let artisan: PublicArtisan | null = null;
  let isOwner = false;

  try {
    const { data } = await api.get<PublicArtisan>(`/artisan/${id}`);
    artisan = data;
  } catch (error) {
    return notFound();
  }

  try {
    const { data: currentUser } = await api.get<CurrentUser>("/user/me");

    if (currentUser && currentUser.id === artisan.userId) {
      isOwner = true;
    }
  } catch (error) {
    // Usuário não logado, isOwner continua false
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CAPA */}
      <div className="bg-white border-b">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative"></div>

        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-end -mt-12 gap-4">
            <div className="flex items-end gap-6">
              {/* Avatar */}
              <div className="h-32 w-32 bg-white rounded-full p-1 shadow-lg overflow-hidden relative flex-shrink-0">
                <div className="h-full w-full bg-gray-100 rounded-full flex items-center justify-center text-4xl font-bold text-gray-400">
                  {artisan.storeName.charAt(0)}
                </div>
              </div>

              <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {artisan.storeName}
                </h1>
                <p className="text-gray-600 max-w-lg mt-1">
                  {artisan.storeDescription || "Sem descrição definida."}
                </p>
              </div>
            </div>

            {/* BOTÕES INTELIGENTES */}
            <div className="mb-4 flex gap-3">
              {isOwner ? (
                // LÓGICA: SÓ APARECE PARA O DONO
                <Link
                  href="/dashboard/loja"
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition flex items-center gap-2 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                  Editar Minha Loja
                </Link>
              ) : (
                // PARA VISITANTES
                // <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
                //   Seguir Loja
                // </button>
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUTOS DA LOJA */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span>Produtos</span>
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
            {artisan.products?.length || 0}
          </span>
        </h2>

        {artisan.products && artisan.products.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {artisan.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                description={product.description}
                price={Number(product.price)}
                imageUrl={product.imageUrls[0]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed">
            <p className="text-gray-500 text-lg">
              Esta loja ainda não tem produtos ativos.
            </p>
            {isOwner && (
              <Link
                href="/dashboard/produtos/criar"
                className="text-blue-600 font-medium hover:underline mt-2 inline-block"
              >
                Cadastre seu primeiro produto agora &rarr;
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
