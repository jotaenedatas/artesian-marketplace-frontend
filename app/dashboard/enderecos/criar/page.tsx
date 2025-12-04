import { CreateAddressForm } from "@/components/features/dashboard/address-form";
import Link from "next/link";

export default function CreateAddressPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/enderecos"
          className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block"
        >
          &larr; Voltar para endereços
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Endereço</h1>
        <p className="text-gray-500">
          Informe os dados para entrega e faturamento.
        </p>
      </div>

      <CreateAddressForm />
    </div>
  );
}
