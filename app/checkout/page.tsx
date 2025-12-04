import { getAPIClient } from "@/services/api";
import { BackendAddress, BackendUser, UserRole } from "@/types/backend";
import { CheckoutForm } from "@/components/features/checkout/checkout-form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const api = await getAPIClient();

  // Variáveis para armazenar o resultado das chamadas
  let user: BackendUser | null = null;
  let addresses: BackendAddress[] = [];

  // 1. DATA FETCHING (Apenas busca dados aqui)
  try {
    // Busca usuário
    const { data: userData } = await api.get<BackendUser>("/user/me");
    user = userData;

    // Se for Customer, busca os endereços
    // (Otimização: não busca endereço se não for cliente)
    if (user.role === UserRole.CUSTOMER) {
      const { data: addrData } = await api.get<BackendAddress[]>(
        "/user/address"
      );
      addresses = addrData;
    }
  } catch (error) {
    // Se der erro 401 (não logado), redireciona
    redirect("/login?callbackUrl=/checkout");
  }

  // 2. LÓGICA DE RENDERIZAÇÃO (Fora do try/catch)

  // Caso A: Usuário logado mas NÃO é cliente (Bloqueio)
  if (user && user.role !== UserRole.CUSTOMER) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Acesso Restrito
        </h1>
        <p className="text-gray-600 mb-6">
          Sua conta de {user.role.toLowerCase()} não permite realizar compras.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  // Caso B: Fluxo Normal (Cliente ou Visitante Logado corretamente)
  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block"
          >
            &larr; Continuar Comprando
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Finalizar Compra
          </h1>
        </div>

        <CheckoutForm addresses={addresses} />
      </div>
    </div>
  );
}
