"use server";

import { getAPIClient } from "@/services/api";
import { becomeArtisanSchema } from "@/lib/schema";

export async function applyArtisanAction(prevState: unknown, formData: FormData) {
  const rawData = {
    storeName: formData.get("storeName"),
    storeDescription: formData.get("storeDescription"),
    identification: formData.get("identification"),
    proofOfAddressUrl: formData.get("proofOfAddressUrl"), 
  };

  const validated = becomeArtisanSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Verifique os dados do formulário.",
    };
  }

  const api = await getAPIClient();

  try {
    await api.post("/artisan/apply", {
      storeName: validated.data.storeName,
      storeDescription: validated.data.storeDescription,
      identification: validated.data.identification,
      proofOfAddressUrl: validated.data.proofOfAddressUrl,
    });

    return { success: true, message: "Solicitação enviada com sucesso!" };
  } catch (error) {
    const errorMsg = "Erro ao processar solicitação.";
    return { message: errorMsg };
  }
}
