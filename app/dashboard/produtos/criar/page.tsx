"use client";

export default function CriarProduto() {
  return (
    <main className="p-6 max-w-4xl mx-auto font-inter bg-gray-50 min-h-screen">
      <section className="bg-white p-6 rounded-2xl shadow mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Criar Produto</h1>
        <p className="text-gray-600 mb-6">Preencha as informações abaixo para cadastrar um novo produto.</p>

        <form className="space-y-5">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <input
              type="text"
              placeholder="Nome do produto"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium mb-1">Categoria *</label>
            <input
              type="text"
              placeholder="ID da categoria"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              placeholder="Descrição detalhada"
              className="w-full p-3 border rounded-xl h-28 focus:ring-2 focus:ring-blue-600 outline-none"
            ></textarea>
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-medium mb-1">Preço *</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 79.90"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Estoque */}
          <div>
            <label className="block text-sm font-medium mb-1">Estoque *</label>
            <input
              type="number"
              placeholder="Quantidade em estoque"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <input
              type="text"
              placeholder="Ex: Algodão, Madeira, etc."
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-medium mb-1">Peso (kg)</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 0.35"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Upload de Imagens */}
          <div>
            <label className="block text-sm font-medium mb-2">Imagens do Produto</label>
            <input
              type="file"
              multiple
              className="w-full border p-3 rounded-xl bg-gray-50 cursor-pointer"
            />
          </div>

          {/* Botão */}
          <button
            type="button"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Criar Produto
          </button>
        </form>
      </section>
    </main>
  );
}