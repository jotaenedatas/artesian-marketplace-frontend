"use client";

export default function GestaoProdutos() {
  const produtos = [
    {
      id: 1,
      titulo: "Camiseta Capivara Premium",
      preco: 79.9,
      estoque: 457,
      imagem:
        "https://amzn-product-images-favip-project.s3.amazonaws.com/dev/cmifhh76b0000qec4bvyqdm6p/7a5c2aee-6d7e-49b1-a9dc-7b4d2d910a10.jpg",
    },
    {
      id: 2,
      titulo: "Teste cabuloso",
      preco: 79.9,
      estoque: 25,
      imagem:
        "https://amzn-product-images-favip-project.s3.amazonaws.com/dev/product-cmigrqib50000qe245jdhlm5f/f0dd2f31-0465-4ab0-84fd-6a2b9354f7d0.webp",
    },
  ];

  return (
    <main className="p-6 max-w-5xl mx-auto font-inter bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <section className="flex items-center justify-between mb-8 bg-white p-5 rounded-2xl shadow">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Gestão de Produtos</h1>
          <p className="text-gray-600 mt-1">Gerencie seu catálogo, estoque e preços.</p>
        </div>
        <a href="/dashboard/produtos/criar" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          + Adicionar Produto
        </a>
      </section>

      {/* Tabela */}
      <section className="bg-white p-5 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Seus Produtos</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 text-sm">
                <th className="p-3">Produto</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Estoque</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.imagem} className="w-14 h-14 rounded-lg object-cover" />
                    <span className="font-medium text-gray-800">{p.titulo}</span>
                  </td>
                  <td className="p-3 font-semibold text-gray-700">R$ {p.preco}</td>
                  <td
                    className={`p-3 font-semibold ${
                      p.estoque < 30 ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {p.estoque}
                  </td>
                  <td className="p-3 text-right flex gap-2 justify-end">
                    <a href="/dashboard/produtos/editar" className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                      Editar
                    </a>
                    <a href="/dashboard/produtos/editar" className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition">
                      Excluir
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
