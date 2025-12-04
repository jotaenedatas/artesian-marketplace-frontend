"use server";

import { getAPIClient } from "@/services/api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Tipagem do item para o DTO do NestJS
interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export async function createOrderAction(
  userAddressId: string,
  items: CreateOrderItemDto[]
) {
  const api = await getAPIClient();
    console.log(items)

  try {
    // Payload exato que seu CreateOrderDto espera
    const payload = {
      items: items,
      userAddressId: userAddressId,
    };

    // POST /orders
    const { data: order } = await api.post("/orders", payload);

    // Revalida para atualizar histórico
    revalidatePath("/dashboard/pedidos");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao processar o pedido.",
    };
  }
}
