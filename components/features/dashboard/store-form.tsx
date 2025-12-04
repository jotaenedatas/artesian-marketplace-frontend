"use client";

import { useActionState } from "react";
import { updateStoreSettingsAction } from "@/actions/store";
import { Input, TextArea } from "@/components/ui/form-component";
import { SubmitButton } from "@/components/ui/submit-button";

interface StoreData {
  id: string;
  storeName: string;
  storeDescription: string | null;
}

export function StoreSettingsForm({ initialData }: { initialData: StoreData }) {
  const updateActionWithId = updateStoreSettingsAction.bind(
    null,
    initialData.id
  );
  const [state, action] = useActionState(updateActionWithId, null);

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
        </div>
        <div className="px-8 pb-6 relative flex items-end">
          <div className="-mt-12 relative">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center text-3xl font-bold text-gray-300 bg-gray-50">
              {initialData.storeName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="ml-4 mb-1">
            <h2 className="text-xl font-bold">{initialData.storeName}</h2>
            <p className="text-sm text-gray-500">Visualização do perfil</p>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <form
        action={action}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6"
      >
        <h3 className="text-lg font-bold text-gray-800 border-b pb-4">
          Dados da Loja
        </h3>

        {state?.message && (
          <div
            className={`p-4 rounded-xl text-sm border ${
              state.success
                ? "bg-green-50 text-green-700 border-green-100"
                : "bg-red-50 text-red-600 border-red-100"
            }`}
          >
            {state.message}
          </div>
        )}

        <Input
          label="Nome da Loja"
          name="storeName"
          defaultValue={initialData.storeName}
          errorMessage={state?.errors?.storeName}
        />

        <TextArea
          label="Descrição / Bio"
          name="storeDescription"
          defaultValue={initialData.storeDescription || ""}
          placeholder="Conte a história do seu artesanato..."
          errorMessage={state?.errors?.storeDescription}
        />

        <div className="pt-4 flex justify-end">
          <div className="w-40">
            <SubmitButton>Salvar Alterações</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
