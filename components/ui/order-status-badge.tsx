import { OrderStatus } from "@/types/backend";

const statusMap: Record<OrderStatus, { label: string; color: string }> = {
  AWAITING_PAYMENT: { label: "Aguardando Pagamento", color: "bg-yellow-100 text-yellow-800" },
  PAYMENT_APPROVED: { label: "Pagamento Aprovado", color: "bg-blue-100 text-blue-800" },
  IN_PREPARATION: { label: "Em Preparação", color: "bg-purple-100 text-purple-800" },
  SHIPPED: { label: "Enviado", color: "bg-indigo-100 text-indigo-800" },
  DELIVERED: { label: "Entregue", color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelado", color: "bg-red-100 text-red-800" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusMap[status] || { label: status, color: "bg-gray-100" };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}