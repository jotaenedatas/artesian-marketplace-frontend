import { EditProductForm } from "@/components/features/dashboard/product-form/edit-form";
import { getAPIClient } from "@/services/api";
import { BackendProduct } from "@/types/backend";

interface PageProps {
  params: Promise<{ id: string }>; // Atualizado para Next.js 15 (params é Promise)
  searchParams: Promise<{ new?: string }>; // searchParams também é Promise
}

export default async function EditPage({ params, searchParams }: PageProps) {
  // Em Next.js 15, params e searchParams devem ser aguardados
  const { id } = await params;
  const { new: isNew } = await searchParams; // Renomeando 'new' para 'isNew' pois 'new' é palavra reservada

  const api = await getAPIClient();

  let product: BackendProduct | null = null;

  try {
    const { data } = await api.get<BackendProduct>(`/products/${id}`);
    product = data;
  } catch (error) {
    // Se der erro 404 ou 500, já retorna aqui
    return (
      <div className="p-8 text-center text-gray-500">
        <h2 className="text-xl font-bold mb-2">Produto não encontrado</h2>
        <p>Verifique se o ID está correto ou se o produto foi excluído.</p>
      </div>
    );
  }

  // --- CORREÇÃO DO ERRO ---
  // Essa verificação garante ao TypeScript que 'product' não é null daqui para baixo
  if (!product) {
    return <div>Produto não carregado.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Editar Produto</h1>

        {isNew === "true" && (
          <p className="text-green-600 bg-green-50 p-3 rounded-lg mt-2 border border-green-100 flex items-center gap-2">
            ✅ <strong>Sucesso!</strong> Produto criado. Agora adicione as
            fotos.
          </p>
        )}
      </div>

      {/* Agora o TypeScript sabe que product é BackendProduct (sem null) */}
      <EditProductForm product={product} />
    </main>
  );
}
