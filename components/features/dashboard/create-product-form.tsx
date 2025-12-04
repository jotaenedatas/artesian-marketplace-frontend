'use client'; // <--- Obrigatório aqui

import { useActionState } from "react";
import Link from "next/link";
import { createProductAction } from "@/actions/product-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { BackendCategory } from "@/types/backend";
import { Input, Select, TextArea } from "@/components/ui/form-component"; // Verifique o nome do arquivo, geralmente é form-components

interface CreateProductFormProps {
  categories: BackendCategory[];
}

export function CreateProductForm({ categories }: CreateProductFormProps) {
  const [state, action] = useActionState(createProductAction, null);

  return (
    <main className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard/produtos"
          className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block"
        >
          &larr; Voltar para lista
        </Link>
        <h1 className="text-3xl font-bold text-blue-700">Criar Produto</h1>
        <p className="text-gray-600">
          Preencha as informações básicas para iniciar.
        </p>
      </div>

      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        {state?.message && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {state.message}
          </div>
        )}

        <form action={action} className="space-y-6">
          <Input
            label="Título *"
            name="title"
            placeholder="Nome do produto"
            errorMessage={state?.errors?.title}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Categoria *"
              name="categoryId"
              defaultValue=""
              errorMessage={state?.errors?.categoryId}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>

            <Input
              label="Preço (R$) *"
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              errorMessage={state?.errors?.price}
            />
          </div>

          <TextArea
            label="Descrição"
            name="description"
            placeholder="Detalhes do produto..."
            errorMessage={state?.errors?.description}
          />

          <div className="grid md:grid-cols-3 gap-6">
            <Input
              label="Estoque Inicial *"
              name="stock"
              type="number"
              placeholder="0"
              errorMessage={state?.errors?.stock}
            />
            <Input
              label="Material"
              name="material"
              placeholder="Ex: Algodão"
              errorMessage={state?.errors?.material}
            />
            <Input
              label="Peso (kg)"
              name="weight"
              type="number"
              step="0.001"
              placeholder="0.000"
              errorMessage={state?.errors?.weight}
            />
          </div>

          <div className="pt-4">
            <SubmitButton>Criar Produto</SubmitButton>
          </div>
        </form>
      </section>
    </main>
  );
}