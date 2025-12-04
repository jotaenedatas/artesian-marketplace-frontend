import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de rotas que exigem autenticação
const protectedRoutes = [
  '/perfil',
  '/meus-pedidos',
  '/checkout',
  '/vender'
  //Atualmente apenas exemplos
];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Verifica se a rota atual está na lista de protegidas
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // CASO A: Tentou acessar rota protegida SEM token -> Manda pro Login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    // Salva onde ele queria ir para voltar depois
    loginUrl.searchParams.set('callbackUrl', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // CASO B: Usuário Logado tentando acessar Login/Cadastro -> Manda pra Home
  if (token && (pathname === '/login' || pathname === '/cadastro')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Matcher para ignorar arquivos estáticos e API routes internas
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};