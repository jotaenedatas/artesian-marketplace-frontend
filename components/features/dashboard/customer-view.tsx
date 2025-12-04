import Link from "next/link";
import { BackendUser } from "@/types/backend";

export function CustomerDashboard({ user }: { user: BackendUser }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Olá, {user.name} 👋
        </h2>
        <p className="text-gray-500">
          Bem-vindo à sua área do cliente. Acompanhe seus pedidos e mantenha
          seus dados atualizados.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* MEUS PEDIDOS */}
        <Link
          href="/dashboard/pedidos"
          className="p-6 bg-white border rounded-2xl hover:border-blue-500 hover:shadow-lg transition group"
        >
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 17h4V5H2v12h3m10 0h4V5H10v12h-3" />
              <path d="M22 17h-2" />
              <path d="M7 17H5" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Meus Pedidos</h3>
          <p className="text-gray-500 text-sm mt-1">Rastreie suas compras.</p>
        </Link>

        {/* MEUS DADOS */}
        <Link
          href="/dashboard/perfil"
          className="p-6 bg-white border rounded-2xl hover:border-gray-400 hover:shadow-lg transition group"
        >
          <div className="h-12 w-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          <h3 className="font-bold text-lg text-gray-900">Meus Dados</h3>
          <p className="text-gray-500 text-sm mt-1">Informações pessoais.</p>
        </Link>

        {/* ENDEREÇOS */}
        <Link
          href="/dashboard/enderecos"
          className="p-6 bg-white border rounded-2xl hover:border-gray-400 hover:shadow-lg transition group"
        >
          <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          <p className="text-gray-500 text-sm mt-1">Locais de entrega.</p>
        </Link>
      </div>
    </div>
  );
}
