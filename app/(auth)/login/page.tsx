'use client';

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { InputField } from "@/components/ui/input-field";
import { SubmitButton } from "@/components/ui/submit-button";

export default function LoginPage() {
  const [state, action] = useActionState(loginAction, null);
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Entrar</h1>

        {state?.message && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {state.message}
          </div>
        )}

        <form action={action} className="space-y-4">
          
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            errorMessage={state?.errors?.email}
          />

          <InputField
            label="Senha"
            name="password"
            type="password"
            placeholder="********"
            errorMessage={state?.errors?.password}
          />

          <SubmitButton>Entrar</SubmitButton>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Não possui uma conta?{" "}
          <Link href={`/cadastro?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-blue-600 font-medium hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}