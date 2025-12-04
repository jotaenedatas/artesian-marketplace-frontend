"use client";

import { BackendUser } from "@/types/backend";
import { Input } from "@/components/ui/form-component";

interface ProfileViewProps {
  user: BackendUser & { createdAt?: string }; 
}

export function ProfileView({ user }: ProfileViewProps) {
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })
    : "Data não disponível";

  return (
    <div className="max-w-3xl">
      {/* CABEÇALHO COM AVATAR */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-6">
        <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 uppercase tracking-wide">
              {user.role}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              Membro desde {joinDate}
            </span>
          </div>
        </div>
      </div>

      {/* DADOS DA CONTA */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4">
          Dados Pessoais
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Nome Completo"
            defaultValue={user.name}
            readOnly
            className="bg-gray-50 text-gray-600 cursor-not-allowed border-gray-200"
          />

          <Input
            label="Email de Acesso"
            defaultValue={user.email}
            readOnly
            className="bg-gray-50 text-gray-600 cursor-not-allowed border-gray-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="ID do Usuário"
            defaultValue={user.id}
            readOnly
            className="bg-gray-50 text-gray-500 cursor-not-allowed font-mono text-sm border-gray-200"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value="********"
              readOnly
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50">
          <p className="text-sm text-gray-500">
            Para alterar seus dados ou senha, entre em contato com o suporte ou
            aguarde futuras atualizações do sistema.
          </p>
        </div>
      </section>
    </div>
  );
}
