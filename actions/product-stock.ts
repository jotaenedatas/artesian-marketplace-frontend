'use server';

import { getAPIClient } from "@/services/api";
import { revalidatePath } from "next/cache";

function validateQuantity(formData: FormData) {
  const quantity = Number(formData.get("quantity"));
  if (!quantity || quantity <= 0) {
    throw new Error("A quantidade deve ser maior que zero.");
  }
  return quantity;
}

export async function increaseStockAction(productId: string, formData: FormData) {
  const api = await getAPIClient();
  try {
    const quantity = validateQuantity(formData);
    
    await api.put(`/products/${productId}/stock/increase`, { quantity });
    
    revalidatePath(`/dashboard/produtos/${productId}/editar`);
    return { success: true, message: `Adicionado ${quantity} ao estoque.` };
  } catch (error) {
    return { success: false, message: error || "Erro ao aumentar estoque." };
  }
}

export async function decreaseStockAction(productId: string, formData: FormData) {
  const api = await getAPIClient();
  try {
    const quantity = validateQuantity(formData);
    
    await api.put(`/products/${productId}/stock/decrease`, { quantity });
    
    revalidatePath(`/dashboard/produtos/${productId}/editar`);
    return { success: true, message: `Removido ${quantity} do estoque.` };
  } catch (error) {
    return { success: false, message: error || "Erro ao reduzir estoque." };
  }
}