import { getAPIClient } from "@/services/api";
import { BackendProduct, PaginatedProductsResponse, ProductFilters } from "@/types/backend";

export async function getProductById(
  id: string
): Promise<BackendProduct | null> {
  console.log(id);
  const api = await getAPIClient();
  try {
    const { data } = await api.get<BackendProduct>(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}`, error);
    return null;
  }
}

export async function searchProducts(filters: ProductFilters): Promise<PaginatedProductsResponse> {
  const api = await getAPIClient();
  
  // Limpa valores undefined/null/vazios
  const params = new URLSearchParams();
  
  if (filters.search) params.append("search", filters.search);
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters.material) params.append("material", filters.material);
  if (filters.minRating) params.append("minRating", filters.minRating.toString());
  if (filters.cursor) params.append("cursor", filters.cursor);
  
  // Padrão de itens por página
  params.append("take", (filters.take || 12).toString());

  try {
    const { data } = await api.get<PaginatedProductsResponse>(`/products?${params.toString()}`);
    return data;
  } catch (error) {
    console.error("Erro na busca:", error);
    return { data: [], meta: { nextCursor: null, hasNextPage: false } };
  }
}