import { getAPIClient } from "@/services/api";
import { BackendOrder } from "@/types/backend";
import { OrderCard } from "@/components/features/dashboard/order-card";
import Link from "next/link";

export default async function MyOrdersPage() {
  const api = await getAPIClient();
  let orders: BackendOrder[] = [];

  try {
    // Busca compras do usuário
    const { data } = await api.get<BackendOrder[]>("/orders");
    orders = data;
  } catch (error) {
    console.error("Erro ao buscar pedidos");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Pedidos</h1>
          <p className="text-gray-500 text-sm">
            Acompanhe suas compras recentes.
          </p>
        </div>
        <Link
          href="/"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Continuar Comprando
        </Link>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} isSale={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-lg font-medium text-gray-900">
            Você ainda não fez pedidos
          </h3>
          <p className="text-gray-500 mb-6">
            Explore nossos produtos artesanais e faça sua primeira compra.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Ir para a Loja
          </Link>
        </div>
      )}
    </div>
  );
}
