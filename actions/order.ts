'use server';

import { getAPIClient } from "@/services/api";
import { revalidatePath } from "next/cache";

export async function cancelOrderAction(orderId: string) {
  const api = await getAPIClient();
  try {
    await api.put(`/orders/${orderId}/cancel`);
    revalidatePath("/dashboard/pedidos");
    return { success: true, message: "Pedido cancelado com sucesso." };
  } catch (error) {
    return { success: false, message: "Não foi possível cancelar o pedido." };
  }
}