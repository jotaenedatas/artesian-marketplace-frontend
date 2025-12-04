import Link from "next/link";
import { BackendUser } from "@/types/backend";

export function ArtisanDashboard({ user }: { user: BackendUser }) {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Painel do Artesão 🎨</h2>
            <p className="text-blue-100">Gerencie sua loja e suas vendas.</p>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12"></div>
      </div>

      <h3 className="text-lg font-bold text-gray-800">Gerenciamento</h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {" "}
        {/* Adjusted grid columns */}
        {/* PRODUTOS */}
        <Link
          href="/dashboard/produtos"
          className="p-6 bg-white border rounded-xl hover:border-blue-500 hover:shadow-md transition group relative overflow-hidden"
        >
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
              <path d="m3.09 8.84 12.35-6.61" />
              <path d="M20.91 8.84 8.56 2.23" />
              <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Produtos</h3>
          <p className="text-gray-500 text-sm mt-1">Catálogo da loja.</p>
        </Link>
        {/* VENDAS */}
        <Link
          href="/dashboard/vendas"
          className="p-6 bg-white border rounded-xl hover:border-green-500 hover:shadow-md transition group"
        >
          <div className="h-10 w-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Vendas</h3>
          <p className="text-gray-500 text-sm mt-1">Pedidos recebidos.</p>
        </Link>
        {/* LOJA */}
        <Link
          href="/dashboard/loja"
          className="p-6 bg-white border rounded-xl hover:border-purple-500 hover:shadow-md transition group"
        >
          <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
              <path d="M2 7h20" />
              <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Minha Loja</h3>
          <p className="text-gray-500 text-sm mt-1">Visual e dados.</p>
        </Link>
        {/* ENDEREÇOS */}
        <Link
          href="/dashboard/enderecos"
          className="p-6 bg-white border rounded-xl hover:border-orange-500 hover:shadow-md transition group"
        >
          <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Endereços</h3>
          <p className="text-gray-500 text-sm mt-1">Coleta e envio.</p>
        </Link>
        {/* MEU PERFIL (NOVO) */}
        <Link
          href="/dashboard/perfil"
          className="p-6 bg-white border rounded-xl hover:border-gray-500 hover:shadow-md transition group"
        >
          <div className="h-10 w-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Meu Perfil</h3>
          <p className="text-gray-500 text-sm mt-1">Dados da conta.</p>
        </Link>
      </div>
    </div>
  );
}
