export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-8 py-5 border-b bg-white">
        <h1 className="text-2xl font-bold tracking-tight">JC INC</h1>

        <nav className="hidden md:flex items-center gap-8 text-gray-600">
          <a href="#" className="hover:text-black">Categorias</a>
          <a href="#" className="hover:text-black">Promoções</a>
          <a href="#" className="hover:text-black">Quero vender</a>
          <a href="#" className="hover:text-black">Contato</a>
        </nav>

        <a href= "/login" className="px-4 py-2 bg-black text-white rounded-xl hover:opacity-80 transition">
          Entrar
        </a>
      </header>

      {/* HERO */}
      <section className="px-8 pt-16 pb-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        
        <div>
          <h2 className="text-5xl md:text-6xl font-bold leading-light te mb-6">
            O futuro do artesanato
            <span className="block text-blue-600">começa aqui.</span>
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Tecnologia, velocidade e design trabalhando juntos para entregar a melhor experiência de compra.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md">
              Começar Agora
            </button>
            <button className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition">
              Explorar Produtos
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="px-8 py-16 bg-white">
        <h3 className="text-3xl font-semibold mb-10 text-center">Categorias Populares</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          
          {["Artesanatos em barro", "Chaveiros", "Casa e utilitarios", ""].map((cat, i) => (
            <div
              key={i}
              className="p-6 bg-gray-100 rounded-xl cursor-pointer hover:shadow-xl transition shadow-sm flex flex-col items-center"
            >
              <div className="h-24 w-24 bg-white rounded-xl shadow flex items-center justify-center text-xl font-bold">
                IMG
              </div>
              <p className="mt-4 text-lg font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold mb-10">Produtos em Alta</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {[1,2,3].map((p) => (
            <div
              key={p}
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer"
            >
              <div className="h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-xl font-bold">
                IMG
              </div>

              <h4 className="text-lg font-semibold">Produto {p}</h4>
              <p className="text-gray-600 mt-1">Descrição curta do produto.</p>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-xl">R$ 199,99</span>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Comprar
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
