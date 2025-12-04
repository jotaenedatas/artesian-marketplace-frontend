"use client";

import Link from "next/link";
import { BackendOrder } from "@/types/backend";
import { OrderStatusBadge } from "@/components/ui/order-status-badge";
import { useState } from "react";
import { cancelOrderAction } from "@/actions/order";

interface OrderCardProps {
  order: BackendOrder;
  isSale?: boolean; // Se true, esconde botão de cancelar (vendedor não cancela por aqui no seu fluxo)
}

export function OrderCard({ order, isSale = false }: OrderCardProps) {
  const [cancelling, setCancelling] = useState(false);

  // Formata Data
  const date = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Formata Preço
  const total = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(order.totalAmount));

  async function handleCancel() {
    if (!confirm("Tem certeza que deseja cancelar este pedido?")) return;
    setCancelling(true);
    await cancelOrderAction(order.id);
    setCancelling(false);
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:border-blue-300 transition group">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <div>
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
            {isSale ? "Venda realizada em" : "Pedido realizado em"}
          </span>
          <p className="text-gray-900 font-medium">{date}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <span className="text-lg font-bold text-gray-900">{total}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center pt-4 border-t border-gray-50 gap-4">
        <div className="text-sm text-gray-500">
          <span className="block">
            ID:{" "}
            <span className="font-mono text-gray-700">
              #{order.id.slice(-8).toUpperCase()}
            </span>
          </span>
          {order.trackingCode && (
            <span className="block mt-1 text-blue-600">
              Rastreio: {order.trackingCode}
            </span>
          )}
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Link
            href={`/dashboard/pedidos/${order.id}`}
            className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition text-center"
          >
            Ver Detalhes
          </Link>

          {/* Botão de Cancelar (Apenas para Clientes e se não estiver cancelado/entregue) */}
          {!isSale && order.status === "AWAITING_PAYMENT" && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {cancelling ? "..." : "Cancelar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
