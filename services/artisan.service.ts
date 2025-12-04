import { getAPIClient } from "@/services/api";
import { ArtisanDashboardStats, ArtisanProfile } from "@/types/backend";


export async function getArtisanProfile(id: string): Promise<ArtisanProfile | null> {
  const api = await getAPIClient();
  try {
    const { data } = await api.get<ArtisanProfile>(`/artisan/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil do artesão:", error);
    return null;
  }
}

export async function getArtisanStats(id: string): Promise<ArtisanDashboardStats | null> {
  const api = await getAPIClient();
  try {
    const { data } = await api.get<ArtisanDashboardStats>(`/artisan/${id}/dashboard`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar estatísticas do artesão:", error);
    return null;
  }
}