import { getAPIClient } from "@/services/api";
import { BackendOrder } from "@/types/backend";
import { OrderCard } from "@/components/features/dashboard/order-card";

export default async function MySalesPage() {
  const api = await getAPIClient();
  let sales: BackendOrder[] = [];

  try {
    // Busca VENDAS do artesão
    const { data } = await api.get<BackendOrder[]>("/orders/sales");
    sales = data;
  } catch (error) {
    console.log("Erro ao buscar vendas");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Minhas Vendas</h1>
        <p className="text-gray-500 text-sm">
          Gerencie os pedidos recebidos na sua loja.
        </p>
      </div>

      {sales.length > 0 ? (
        <div className="space-y-4">
          {sales.map((order) => (
            <OrderCard key={order.id} order={order} isSale={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-lg font-medium text-gray-900">
            Nenhuma venda ainda
          </h3>
          <p className="text-gray-500">
            Divulgue seus produtos para começar a vender.
          </p>
        </div>
      )}
    </div>
  );
}
