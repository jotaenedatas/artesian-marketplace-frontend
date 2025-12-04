import Link from "next/link";
import Image from "next/image";
import { getAPIClient } from "@/services/api";
import { BackendProduct } from "@/types/backend";
import { ArchiveButton } from "@/components/features/dashboard/archive-button";
import { ActivateButton } from "@/components/features/dashboard/activate-button";

export default async function MyProductsPage() {
  const api = await getAPIClient();
  let products: BackendProduct[] = [];

  try {
    const { data } = await api.get<BackendProduct[]>("/products/my-products");
    products = data;
  } catch (error) {
    console.error("Erro ao carregar produtos", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Produtos</h1>
          <p className="text-gray-500 text-sm">
            Gerencie o catálogo completo da sua loja.
          </p>
        </div>

        <Link
          href="/dashboard/produtos/criar"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Novo Produto
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {products.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 w-20">Imagem</th>
                <th className="p-4">Nome</th>
                <th className="p-4">Preço</th>
                <th className="p-4 text-center">Estoque</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`transition ${
                    product.status === "ARCHIVED"
                      ? "bg-gray-50 opacity-75"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg relative overflow-hidden border grayscale-0">
                      {product.imageUrls[0] ? (
                        <Image
                          src={product.imageUrls[0]}
                          alt={product.title}
                          fill
                          className={`object-cover ${
                            product.status === "ARCHIVED" ? "grayscale" : ""
                          }`}
                        />
                      ) : (
                        <span className="text-xs text-gray-400 flex items-center justify-center h-full">
                          Sem foto
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 font-medium text-gray-900">
                    {product.title}
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(product.price))}
                  </td>

                  <td className="p-4 text-center text-gray-600">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${
                        product.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : product.status === "PAUSED"
                          ? "bg-yellow-100 text-yellow-800"
                          : product.status === "ARCHIVED"
                          ? "bg-gray-200 text-gray-600"
                          : "bg-gray-100 text-gray-800"
                      }
                    `}
                    >
                      {product.status === "DRAFT" && "Rascunho"}
                      {product.status === "ACTIVE" && "Ativo"}
                      {product.status === "PAUSED" && "Pausado"}
                      {product.status === "ARCHIVED" && "Arquivado"}
                    </span>
                  </td>

                  <td className="p-4 text-right flex justify-end items-center gap-4">
                    <Link
                      href={`/dashboard/produtos/${product.id}/editar`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Editar
                    </Link>

                    {/* MUDANÇA AQUI: Se for Arquivado OU Rascunho, mostra botão Ativar */}
                    {product.status === "ARCHIVED" ||
                    product.status === "DRAFT" ? (
                      <ActivateButton id={product.id} />
                    ) : (
                      <ArchiveButton id={product.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">Você ainda não tem produtos cadastrados.</p>
            <Link
              href="/dashboard/produtos/criar"
              className="text-blue-600 font-medium hover:underline"
            >
              Cadastre seu primeiro produto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
