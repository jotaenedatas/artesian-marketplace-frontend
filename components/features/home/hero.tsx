import Link from "next/link";

export function HeroSection() {
  return (
    <section className="px-8 pt-16 pb-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
      <div>
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
          O futuro do artesanato
          <span className="block text-blue-600">começa aqui.</span>
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed">
          Tecnologia, velocidade e design trabalhando juntos para entregar a
          melhor experiência.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/cadastro"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 font-medium"
          >
            Começar Agora
          </Link>
          <Link
            href="/busca"
            className="px-8 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700"
          >
            Explorar Produtos
          </Link>
        </div>
      </div>
    </section>
  );
}
