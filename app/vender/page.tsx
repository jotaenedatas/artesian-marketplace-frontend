import Link from "next/link";
import { Header } from "@/components/layout/header";
import { BecomeArtisanForm } from "@/components/features/artisan/become-artisan-form";
import { getAPIClient } from "@/services/api";
import { BackendUser, UserRole } from "@/types/backend";
import { redirect } from "next/navigation";

export default async function BecomeArtisanPage() {
  const api = await getAPIClient();
  let user: BackendUser | null = null;

  try {
    // Tenta buscar o usuário logado
    const { data } = await api.get<BackendUser>("/user/me");
    user = data;
  } catch (error) {
  }

  if (user?.role === UserRole.ARTISAN) {
    redirect("/dashboard/loja");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section / Cabeçalho */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Transforme sua arte em{" "}
              <span className="text-blue-600">negócio</span>.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Junte-se à comunidade da JC INC. Crie sua loja, gerencie pedidos e
              alcance clientes apaixonados por artesanato em todo o Brasil.
            </p>
          </div>

          {user ? (
            // --- USUÁRIO LOGADO (CLIENTE) ---
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Coluna Esquerda: Benefícios */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                  {/* Decorativo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>

                  <h3 className="font-bold text-2xl mb-6 relative z-10">
                    Por que vender aqui?
                  </h3>

                  <ul className="space-y-6 relative z-10">
                    <li className="flex gap-4 items-start">
                      <div className="bg-white/20 p-2 rounded-lg shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-50">
                          Loja Gratuita
                        </h4>
                        <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                          Crie seu catálogo personalizado sem custos de adesão.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <div className="bg-white/20 p-2 rounded-lg shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-50">
                          Gestão Simples
                        </h4>
                        <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                          Controle estoque, pedidos e vendas em um só lugar.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <div className="bg-white/20 p-2 rounded-lg shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-50">
                          Pagamento Seguro
                        </h4>
                        <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                          Receba suas vendas diretamente na sua conta bancária.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Coluna Direita: O Formulário */}
              <div className="lg:col-span-8">
                <BecomeArtisanForm />
              </div>
            </div>
          ) : (
            // --- VISITANTE (DESLOGADO) ---
            <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Identifique-se para começar
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Para garantir a segurança da nossa comunidade, você precisa
                acessar sua conta de cliente antes de abrir uma loja.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* O callbackUrl faz o usuário voltar pra cá depois de logar */}
                <Link
                  href="/login?callbackUrl=/vender"
                  className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  Entrar na conta
                </Link>
                <Link
                  href="/cadastro?callbackUrl=/vender"
                  className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition hover:border-gray-300"
                >
                  Criar conta grátis
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
