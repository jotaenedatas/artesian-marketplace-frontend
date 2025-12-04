import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  description: z.string().optional(),
  price: z.coerce
    .number("Informe um número válido")
    .positive("O preço deve ser positivo"),
  stock: z.coerce
    .number("Informe um número inteiro")
    .int("O estoque deve ser um número inteiro")
    .min(0, "O estoque não pode ser negativo"),
  material: z.string().optional(),
  weight: z.coerce
    .number()
    .positive("O peso deve ser positivo")
    .optional()
    .or(z.literal("")),
});

export const updateProductSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().positive("O preço deve ser positivo"),
  compareAtPrice: z.coerce.number().positive().optional().or(z.literal("")),
  material: z.string().optional(),
  weight: z.coerce.number().positive().optional().or(z.literal("")),
});

export const addressSchema = z.object({
  zipCode: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado (UF) é obrigatório").max(2, "Use a sigla (ex: PE)"),
  country: z.string().min(1, "País é obrigatório").default("Brasil"),
});

export const storeSettingsSchema = z.object({
  storeName: z.string().min(3, "O nome da loja deve ter pelo menos 3 caracteres"),
  storeDescription: z.string().max(500, "A descrição deve ter no máximo 500 caracteres").optional().or(z.literal("")),
});

export const becomeArtisanSchema = z.object({
  storeName: z.string().min(3, "O nome da loja deve ter pelo menos 3 caracteres").max(100),
  storeDescription: z.string().max(500, "Máximo de 500 caracteres").optional(),
  identification: z.string().min(5, "Documento inválido").max(50),
  proofOfAddressUrl: z.string().url("Informe uma URL válida (http://...)"),
});