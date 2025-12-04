'use server';

import { getAPIClient } from "@/services/api";
import { storeSettingsSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function updateStoreSettingsAction(artisanId: string, prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = storeSettingsSchema.safeParse(rawData);

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, message: "Dados inválidos." };
  }

  const api = await getAPIClient();

  try {
    await api.put(`/artisan/${artisanId}`, {
      storeName: validated.data.storeName,
      storeDescription: validated.data.storeDescription,
    });
    
    revalidatePath("/dashboard/loja");
    revalidatePath(`/artesao/${artisanId}`); // Atualiza a página pública também
    return { success: true, message: "Loja atualizada com sucesso!" };
  } catch (error) {
    console.log(error)
    return { 
      message: "Erro ao atualizar loja." 
    };
  }
}