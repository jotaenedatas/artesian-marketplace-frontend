"use client";

import { useActionState } from "react";
import { applyArtisanAction } from "@/actions/artisan";
import { Input, TextArea } from "@/components/ui/form-component";
import { SubmitButton } from "@/components/ui/submit-button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function BecomeArtisanForm() {
  const [state, action] = useActionState(applyArtisanAction, null);

  if (state?.success) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Solicitação Enviada!
        </h2>
        <p className="text-gray-600 mb-6">
          Recebemos o seu cadastro. Nossa equipe irá analisar seus dados e em
          breve você receberá um retorno.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-900">Dados da Loja</h2>
        <p className="text-sm text-gray-500">
          Conte-nos sobre o seu negócio artesanal.
        </p>
      </div>

      {state?.message && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {state.message}
        </div>
      )}

      <form action={action} className="space-y-6">
        <Input
          label="Nome da Loja *"
          name="storeName"
          placeholder="Ex: Ateliê Mãos de Fada"
          errorMessage={state?.errors?.storeName}
        />

        <TextArea
          label="Descrição da Loja"
          name="storeDescription"
          placeholder="O que você produz? Qual a sua história?"
          errorMessage={state?.errors?.storeDescription}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Identificação (CPF ou CNPJ) *"
            name="identification"
            placeholder="000.000.000-00"
            errorMessage={state?.errors?.identification}
          />

          {/* Campo de URL simples agora */}
          <Input
            label="Link do Comprovante de Residência *"
            name="proofOfAddressUrl"
            placeholder="https://drive.google.com/..."
            errorMessage={state?.errors?.proofOfAddressUrl}
          />
        </div>

        <div className="pt-4">
          <SubmitButton>Enviar Solicitação</SubmitButton>
          <p className="text-xs text-center text-gray-400 mt-4">
            Ao enviar, você concorda com os termos de parceria da JC INC.
          </p>
        </div>
      </form>
    </section>
  );
}
