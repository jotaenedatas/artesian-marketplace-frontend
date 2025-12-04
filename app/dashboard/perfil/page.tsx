import { getAPIClient } from "@/services/api";
import { BackendUser } from "@/types/backend";
import { ProfileView } from "@/components/features/dashboard/profile-view";
import Link from "next/link";

export default async function ProfilePage() {
  const api = await getAPIClient();
  let user: BackendUser | null = null;

  try {
    // Rota GET /user do seu UserController
    const { data } = await api.get<BackendUser>("/auth/me");
    user = data;
  } catch (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Erro ao carregar perfil.</p>
      </div>
    );
  }

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block"
        >
          &larr; Voltar ao Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
        <p className="text-gray-500">Visualize as informações da sua conta.</p>
      </div>

      <ProfileView user={user} />
    </div>
  );
}
