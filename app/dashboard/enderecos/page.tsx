import Link from "next/link";
import { getAPIClient } from "@/services/api";
import { BackendAddress } from "@/types/backend";

export default async function AddressesPage() {
  const api = await getAPIClient();
  let addresses: BackendAddress[] = [];

  try {
    const { data } = await api.get<BackendAddress[]>("/user/address");
    addresses = data;
  } catch (error) {
    console.error("Erro ao buscar endereços");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Endereços</h1>
          <p className="text-gray-500 text-sm">
            Gerencie seus locais de entrega.
          </p>
        </div>

        <Link
          href="/dashboard/enderecos/criar"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Novo Endereço
        </Link>
      </div>

      {addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:border-blue-300 transition"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
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
                <div>
                  <h3 className="font-bold text-gray-900">
                    {addr.street}, {addr.number}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {addr.complement && (
                      <span className="block">{addr.complement}</span>
                    )}
                    {addr.city} - {addr.state}, {addr.zipCode}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 uppercase">
                    {addr.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-dashed">
          <p className="mb-4">Você ainda não cadastrou nenhum endereço.</p>
          <Link
            href="/dashboard/enderecos/criar"
            className="text-blue-600 font-medium hover:underline"
          >
            Adicionar o primeiro endereço
          </Link>
        </div>
      )}
    </div>
  );
}
