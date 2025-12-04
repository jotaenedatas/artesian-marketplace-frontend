import { Header } from "@/components/layout/header";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Autônomo (Entrar/Minha Conta) */}
      <Header />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="bg-white rounded-xl shadow-sm border p-4 space-y-1 sticky top-24">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition"
            >
              Visão Geral
            </Link>
            <Link 
              href="/dashboard/pedidos" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition"
            >
              Meus Pedidos
            </Link>
            <Link 
              href="/dashboard/enderecos" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition"
            >
              Endereços
            </Link>
            
            <div className="pt-4 mt-4 border-t">
               <form action={async () => {
                 'use server';
                 const { logoutAction } = await import('@/actions/auth');
                 await logoutAction();
               }}>
                 <button className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition flex items-center gap-2">
                   Sair
                 </button>
               </form>
            </div>
          </nav>
        </aside>

        {/* ÁREA DO CONTEÚDO (Muda conforme a página) */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}