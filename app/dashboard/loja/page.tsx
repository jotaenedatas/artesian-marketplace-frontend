import { getAPIClient } from "@/services/api";
import { BackendUser, UserRole } from "@/types/backend";
import { StoreSettingsForm } from "@/components/features/dashboard/store-form";
import { redirect } from "next/navigation";
import Link from "next/link";

// Estendendo o tipo User para incluir o perfil (igual ao seu Prisma include)
interface UserWithArtisan extends BackendUser {
  artisanProfile?: {
    id: string;
    storeName: string;
    storeDescription: string | null;
    status: string;
  } | null;
}

export default async function StoreManagementPage() {
  const api = await getAPIClient();
  let user: UserWithArtisan | null = null;

  try {
    // Busca o usuário logado + perfil de artesão
    const { data } = await api.get<UserWithArtisan>("/user/me");
    user = data;
    console.log(user)
  } catch (error) {
    redirect("/login");
  }

  // 1. VALIDAÇÃO DE PROPRIEDADE
  // Se não é ARTISAN ou não tem o perfil criado no banco -> Bloqueia
  if (user.role !== UserRole.ARTISAN || !user.artisanProfile) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 text-center border rounded-xl bg-orange-50 text-orange-800 border-orange-200">
        <h2 className="text-xl font-bold mb-2">Acesso Restrito</h2>
        <p className="mb-4">
          Você precisa ter uma conta de artesão aprovada para gerenciar uma
          loja.
        </p>
        <Link href="/dashboard" className="text-sm font-semibold underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minha Loja</h1>
          <p className="text-gray-500">
            Configure como os clientes veem sua marca.
          </p>
        </div>
        <Link
          href={`/artesao/${user.artisanProfile.id}`}
          target="_blank"
          className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
        >
          Ver Loja Pública &rarr;
        </Link>
      </div>

      <StoreSettingsForm initialData={user.artisanProfile} />
    </div>
  );
}
