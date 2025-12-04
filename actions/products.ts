'use server';

import { getAPIClient } from "@/services/api";
import { revalidatePath } from "next/cache";


export async function archiveProductAction(productId: string) {
  const api = await getAPIClient();
  try {
    await api.put(`/products/${productId}/status`, { status: 'ARCHIVED' });
    revalidatePath("/dashboard/produtos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao arquivar:", error);
    return { success: false, error: "Falha ao arquivar" };
  }
}

export async function activateProductAction(productId: string) {
  const api = await getAPIClient();
  try {
    await api.put(`/products/${productId}/status`, { status: 'ACTIVE' });
    revalidatePath("/dashboard/produtos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao ativar:", error);
    return { success: false, error: "Falha ao ativar" };
  }
}