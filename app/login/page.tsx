export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Entrar</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Não possui uma conta?{" "}
          <a href="/login/cadastro" className="text-blue-600">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
