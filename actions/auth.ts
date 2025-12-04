"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
  callbackUrl: z.string().optional(),
});

// Tipo de retorno para o useFormState
export type LoginState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState | null> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    const formattedErrors = z.flattenError(validatedFields.error);

    return {
      errors: {
        email: formattedErrors.fieldErrors.email,
        password: formattedErrors.fieldErrors.password,
      },
      message: "Campos inválidos.",
    };
  }

  const { email, password, callbackUrl } = validatedFields.data;

  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    const cookieStore = await cookies();

    cookieStore.set("session_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data?.message || "Credenciais inválidas.",
      };
    }
    return {
      message: "Ocorreu um erro inesperado.",
    };
  }

  const destination =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";

  redirect(destination);
}

const registerSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    callbackUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export async function registerAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState | null> {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    const formattedErrors = z.flattenError(validatedFields.error);
    return {
      errors: {
        email: formattedErrors.fieldErrors.email,
        password: formattedErrors.fieldErrors.password,
        _form: formattedErrors.fieldErrors.confirmPassword,
      },
      message: "Verifique os campos abaixo.",
    };
  }

  const { name, email, password, callbackUrl } = validatedFields.data;

  try {
    await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const { data: loginData } = await api.post("/auth/login", {
      email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set("session_token", loginData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data?.message || "Erro ao criar conta.",
      };
    }
    return {
      message: "Ocorreu um erro inesperado.",
    };
  }

  const destination =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";
  redirect(destination);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  redirect("/login");
}
