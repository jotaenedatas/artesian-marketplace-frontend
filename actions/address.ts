'use server';

import { getAPIClient } from "@/services/api";
import { addressSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAddressAction(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = addressSchema.safeParse(rawData);

  if (!validated.success) {
    return { 
      errors: validated.error.flatten().fieldErrors, 
      message: "Verifique os campos do endereço." 
    };
  }

  const api = await getAPIClient();

  try {
    await api.post("/user/address", validated.data);
    
    revalidatePath("/dashboard/enderecos");
  } catch (error) {
    console.error(error);
    return { 
      message: "Erro ao salvar endereço." 
    };
  }

  redirect("/dashboard/enderecos");
}