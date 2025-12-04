'use client';

import { useActionState, useState } from "react";
import Image from "next/image";
import { updateProductAction, uploadImageAction } from "@/actions/product-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { BackendProduct } from "@/types/backend";
import { Input, TextArea } from "@/components/ui/form-component";

export function EditProductForm({ product }: { product: BackendProduct }) {
  const updateActionWithId = updateProductAction.bind(null, product.id);
  const [state, action] = useActionState(updateActionWithId, null);
  
  const [uploading, setUploading] = useState(false);
  
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    await uploadImageAction(product.id, formData);
    setUploading(false);
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      
      {/* COLUNA DA ESQUERDA: GALERIA DE IMAGENS */}
      <div className="md:col-span-1 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-sm font-medium text-gray-700">Galeria de Imagens</h3>
             <span className="text-xs text-gray-400">{product.imageUrls.length} foto(s)</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* 1. Renderiza as imagens existentes */}
            {product.imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-200 group">
                <Image 
                  src={url} 
                  alt={`Produto ${index + 1}`} 
                  fill 
                  className="object-cover"
                />
                {/* Aqui futuramente você pode pôr um botão de 'X' para deletar a foto */}
              </div>
            ))}

            {/* 2. Botão de ADICIONAR NOVA FOTO */}
            <label 
              className={`relative aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition text-gray-400
                ${uploading ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
              `}
            >
              {uploading ? (
                 <div className="flex flex-col items-center animate-pulse">
                    <span className="text-xs font-medium">Enviando...</span>
                 </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  <span className="text-xs font-medium mt-1">Adicionar</span>
                </>
              )}
              
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Formatos: JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>
      </div>

      {/* COLUNA DA DIREITA: DADOS DO PRODUTO */}
      <div className="md:col-span-2">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {state?.message && (
             <div className={`mb-6 p-4 rounded-xl text-sm border ${state.success ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
               {state.message}
             </div>
          )}

          <form action={action} className="space-y-6">
            <Input 
              label="Título" 
              name="title" 
              defaultValue={product.title} 
              errorMessage={state?.errors?.title} 
            />

            <TextArea 
              label="Descrição" 
              name="description" 
              defaultValue={product.description} 
              errorMessage={state?.errors?.description} 
            />

            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Preço Atual (R$)" 
                name="price" 
                type="number" step="0.01" 
                defaultValue={product.price} 
                errorMessage={state?.errors?.price} 
              />
              <Input 
                label="Preço 'De' (Comparativo)" 
                name="compareAtPrice" 
                type="number" step="0.01" 
                defaultValue={product.compareAtPrice || ""} 
                placeholder="Opcional"
                errorMessage={state?.errors?.compareAtPrice} 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Material" 
                name="material" 
                defaultValue={product.material} 
                errorMessage={state?.errors?.material} 
              />
              <Input 
                label="Peso (kg)" 
                name="weight" 
                type="number" step="0.001" 
                defaultValue={product.weight} 
                errorMessage={state?.errors?.weight} 
              />
            </div>

            {/* Estoque Informativo */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
               <div>
                  <span className="text-sm font-medium text-gray-700 block">Estoque Atual</span>
                  <span className="text-xs text-gray-500">Gerencie na aba de inventário</span>
               </div>
               <span className="text-xl font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border">{product.stock}</span>
            </div>

            <div className="pt-2">
              <SubmitButton>Salvar Alterações</SubmitButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}