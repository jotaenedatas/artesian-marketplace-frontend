import Link from "next/link";
import { cookies } from "next/headers";

export async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("session_token")?.value;

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b bg-white sticky top-0 z-50">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-black hover:opacity-80 transition"
      >
        JC INC
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-gray-600">
        <Link
          href="/categorias"
          className="hover:text-black transition-colors font-medium"
        >
          Categorias
        </Link>
        <Link
          href="/vender"
          className="hover:text-black transition-colors font-medium"
        >
          Quero vender
        </Link>
      </nav>

      <div>
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Minha Conta
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-6 py-2.5 bg-black text-white rounded-xl hover:opacity-80 transition font-medium shadow-sm"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
