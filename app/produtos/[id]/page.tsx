import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { getProductById } from "@/services/products.service";
import { ProductGallery } from "@/components/features/products/product-details/gallery";
import { ProductInfo } from "@/components/features/products/product-details/info";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="py-10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs - Navegação de topo */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-hidden">
            <Link href="/" className="hover:text-blue-600 transition">
              Início
            </Link>
            <span>/</span>
            <Link href="/busca" className="hover:text-blue-600 transition">
              Produtos
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          {/* Grid Principal: Galeria vs Info */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Coluna Esquerda: Galeria */}
            <div className="w-full lg:sticky lg:top-8">
              <ProductGallery
                images={product.imageUrls}
                productName={product.title}
              />
            </div>

            {/* Coluna Direita: Informações */}
            <div className="w-full">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Adicionar a seção de Reviews no futuro */}
        </div>
      </main>

      <footer className="bg-white border-t py-12 text-center text-gray-500 mt-20">
        <p className="mb-2">© 2025 JC INC. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
