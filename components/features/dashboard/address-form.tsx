'use client';

import { useActionState } from "react";
import Link from "next/link";
import { createAddressAction } from "@/actions/address";
import { Input } from "@/components/ui/form-component"; // Reutilizando seus inputs
import { SubmitButton } from "@/components/ui/submit-button";

export function CreateAddressForm() {
  const [state, action] = useActionState(createAddressAction, null);

  return (
    <form action={action} className="space-y-6 max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      
      {state?.message && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
          {state.message}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Input 
            label="CEP" 
            name="zipCode" 
            placeholder="00000-000" 
            maxLength={9}
            errorMessage={state?.errors?.zipCode} 
          />
        </div>
        <div className="md:col-span-2">
           {/* País geralmente é fixo ou select, deixei input por enquanto */}
           <Input 
            label="País" 
            name="country" 
            defaultValue="Brasil"
            errorMessage={state?.errors?.country} 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Input 
            label="Rua / Avenida" 
            name="street" 
            placeholder="Nome da rua" 
            errorMessage={state?.errors?.street} 
          />
        </div>
        <div className="md:col-span-1">
          <Input 
            label="Número" 
            name="number" 
            placeholder="123" 
            errorMessage={state?.errors?.number} 
          />
        </div>
      </div>

      <Input 
        label="Complemento (Opcional)" 
        name="complement" 
        placeholder="Apto 101, Bloco B" 
        errorMessage={state?.errors?.complement} 
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Input 
            label="Cidade" 
            name="city" 
            placeholder="Ex: Caruaru" 
            errorMessage={state?.errors?.city} 
          />
        </div>
        <div className="col-span-1">
          <Input 
            label="UF" 
            name="state" 
            placeholder="PE" 
            maxLength={2}
            errorMessage={state?.errors?.state} 
            className="uppercase"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Link href="/dashboard/enderecos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          Cancelar
        </Link>
        <div className="w-32">
          <SubmitButton>Salvar</SubmitButton>
        </div>
      </div>
    </form>
  );
}