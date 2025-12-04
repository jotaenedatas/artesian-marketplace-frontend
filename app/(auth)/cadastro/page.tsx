"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registerAction } from "@/actions/auth";
import { InputField } from "@/components/ui/input-field";
import { SubmitButton } from "@/components/ui/submit-button";

export default function RegisterPage() {
  const [state, action] = useActionState(registerAction, null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crie sua conta
        </h1>

        {state?.message && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {state.message}
          </div>
        )}

        <form action={action} className="space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <InputField
            label="Nome Completo"
            name="name"
            type="text"
            placeholder="Seu nome"
            errorMessage={state?.errors?.["name"]}
          />

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
            placeholder="No mínimo 8 caracteres"
            errorMessage={state?.errors?.password}
          />

          <InputField
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            placeholder="Repita a senha"
            errorMessage={state?.errors?.["_form"]}
          />

          <SubmitButton>Cadastrar e Entrar</SubmitButton>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Já possui uma conta?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-blue-600 font-medium hover:underline"
          >
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}
