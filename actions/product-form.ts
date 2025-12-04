"use server";

import { getAPIClient } from "@/services/api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProductSchema, updateProductSchema } from "@/lib/schema";

// --- CRIAR PRODUTO ---
export async function createProductAction(
  prevState: unknown,
  formData: FormData
) {
  const rawData = Object.fromEntries(formData);
  const validated = createProductSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Verifique os campos.",
    };
  }

  // Limpa campos opcionais vazios
  const payload = {
    ...validated.data,
    weight: validated.data.weight === "" ? undefined : validated.data.weight,
  };

  const api = await getAPIClient();
  let newId = "";

  try {
    const { data } = await api.post("/products", payload);
    newId = data.id;
    revalidatePath("/dashboard/produtos");
  } catch (error) {
    console.log(error);
    return {
      message: "Erro ao criar produto.",
    };
  }

  // Redireciona para edição para adicionar foto
  redirect(`/dashboard/produtos/${newId}/editar?new=true`);
}

// --- EDITAR DADOS ---
export async function updateProductAction(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const rawData = Object.fromEntries(formData);
  const validated = updateProductSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Verifique os campos.",
    };
  }

  const payload = {
    ...validated.data,
    compareAtPrice:
      validated.data.compareAtPrice === ""
        ? undefined
        : validated.data.compareAtPrice,
    weight: validated.data.weight === "" ? undefined : validated.data.weight,
  };

  const api = await getAPIClient();

  try {
    await api.put(`/products/${id}`, payload);
    revalidatePath("/dashboard/produtos");
    revalidatePath(`/dashboard/produtos/${id}/editar`);
    return { message: "Produto atualizado com sucesso!", success: true };
  } catch (error) {
    console.log(error);
    return { message: "Erro ao atualizar." };
  }
}

// --- UPLOAD DE IMAGEM ---
export async function uploadImageAction(id: string, formData: FormData) {
  const api = await getAPIClient();

  try {
    // O NestJS espera o campo 'file' no interceptor
    await api.post(`/products/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    revalidatePath(`/dashboard/produtos/${id}/editar`);
    return { success: true, message: "Imagem enviada!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao enviar imagem." };
  }
}
