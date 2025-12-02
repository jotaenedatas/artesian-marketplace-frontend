"use client";

import { useState, useEffect } from "react";

export default function EditarProduto() {
  const [titulo, setTitulo] = useState("Camiseta Capivara Premium");
  const [descricao, setDescricao] = useState("Camiseta confortável com estampa de capivara.");
  const [preco, setPreco] = useState("79.90");

  // Estado separado para evitar problemas
  const [imagemUrl, setImagemUrl] = useState(
    "https://amzn-product-images-favip-project.s3.amazonaws.com/dev/cmifhh76b0000qec4bvyqdm6p/7a5c2aee-6d7e-49b1-a9dc-7b4d2d910a10.jpg"
  );
  const [imagemFile, setImagemFile] = useState<File | null>(null);

  // Limpa blobs antigos
  useEffect(() => {
    return () => {
      if (imagemUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imagemUrl);
      }
    };
  }, [imagemUrl]);

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImagemUrl(preview);
    setImagemFile(file);
  }

  function handleSave() {
    console.log("Salvar produto:");
    console.log({ titulo, descricao, preco, imagemFile });

    // Aqui você enviaria para sua API (ex.: /api/artisan/products)
    // 1. Fazer upload da imagem (S3 / Supabase / Firebase)
    // 2. Pegar URL final
    // 3. Enviar dados para API
  }

  return (
    <main className="p-6 max-w-3xl mx-auto font-inter bg-gray-50 min-h-screen">
      <section className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Editar Produto</h1>

        {/* Imagem */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Produto</label>

          {imagemUrl && (
            <img src={imagemUrl} className="w-40 h-40 object-cover rounded-lg border mb-3" />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImagem}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Título */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Descrição */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border rounded-lg h-28"
          />
        </div>

        {/* Preço */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="w-full p-2 border rounded-lg"
            step="0.01"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Salvar Alterações
        </button>
      </section>
    </main>
  );
}
