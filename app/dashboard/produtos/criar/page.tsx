import { getAPIClient } from "@/services/api";
import { BackendCategory } from "@/types/backend";
import { CreateProductForm } from "@/components/features/dashboard/create-product-form"; // Importa o componente cliente

export default async function CreateProductPage() {
  const api = await getAPIClient();
  let categories: BackendCategory[] = [];

  try {
    const { data } = await api.get("/categories");
    categories = data;
  } catch (e) {
    console.error("Erro ao buscar categorias", e);
  }

  // Passa os dados buscados no servidor para o componente cliente
  return <CreateProductForm categories={categories} />;
}