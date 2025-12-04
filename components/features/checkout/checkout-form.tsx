"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { createOrderAction } from "@/actions/checkout";
import { BackendAddress } from "@/types/backend";

export function CheckoutForm({ addresses }: { addresses: BackendAddress[] }) {
  const router = useRouter();

  const { items, getTotal, updateQuantity, removeItem, clearCart } =
    useCartStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted)
    return (
      <div className="p-10 text-center text-gray-500">
        Carregando carrinho...
      </div>
    );

  // Se carrinho vazio
  if (items.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-dashed">
        <div className="text-4xl mb-4">🛒</div>
        <p className="text-xl font-medium text-gray-900 mb-6">
          Seu carrinho está vazio
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Ir para a Loja
        </Link>
      </div>
    );
  }

  const total = getTotal();

  async function handleFinishOrder() {
    if (!selectedAddressId) {
      setError("Por favor, selecione um endereço de entrega para continuar.");
      return;
    }

    setLoading(true);
    setError(null);

    const orderItems = items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));

    const result = await createOrderAction(selectedAddressId, orderItems);

    if (result.success) {
      clearCart();
      router.push("/dashboard/pedidos"); 
    } else {
      setError(result.message || "Erro ao finalizar compra");
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* COLUNA ESQUERDA: ITENS E ENDEREÇO */}
      <div className="md:col-span-2 space-y-6">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">
              1
            </span>
            Resumo do Pedido
          </h2>
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="h-20 w-20 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0 border">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full text-xs text-gray-400">
                      Sem foto
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Controle de Quantidade */}
                    <div className="flex items-center border rounded-lg bg-gray-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-200 text-gray-600 rounded-l-lg transition"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-200 text-gray-600 rounded-r-lg transition"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs text-red-500 hover:text-red-700 hover:underline font-medium"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Seleção de Endereço */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                2
              </span>
              Endereço de Entrega
            </h2>
            <Link
              href="/dashboard/enderecos/criar?callbackUrl=/checkout"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + Novo Endereço
            </Link>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center p-6 bg-yellow-50 rounded-xl text-yellow-800 border border-yellow-100">
              <p className="text-sm">
                Você ainda não tem endereços cadastrados.
              </p>
              <Link
                href="/dashboard/enderecos/criar?callbackUrl=/checkout"
                className="font-bold underline mt-1 block"
              >
                Cadastrar agora para continuar
              </Link>
            </div>
          ) : (
            <div className="grid gap-3">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`relative flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all
                    ${
                      selectedAddressId === addr.id
                        ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 shadow-sm"
                        : "hover:border-blue-300 hover:shadow-sm"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                    className="mt-1 accent-blue-600"
                  />
                  <div className="text-sm">
                    <span className="font-bold text-gray-900 block">
                      {addr.street}, {addr.number}
                    </span>
                    <span className="text-gray-600 block mt-0.5">
                      {addr.city} - {addr.state}, {addr.zipCode}
                    </span>
                    {addr.complement && (
                      <span className="text-gray-500 text-xs block mt-1">
                        {addr.complement}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* COLUNA DIREITA: RESUMO FINANCEIRO */}
      <div className="md:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-lg font-bold mb-6">Resumo da Compra</h2>

          <div className="space-y-3 text-sm mb-6 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({items.length} itens)</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
          </div>

          <div className="border-t border-dashed pt-4 mb-6">
            <div className="flex justify-between items-end">
              <span className="font-bold text-lg text-gray-900">Total</span>
              <span className="font-bold text-2xl text-blue-700">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            onClick={handleFinishOrder}
            disabled={loading || !selectedAddressId}
            className="w-full py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Processando..."
            ) : (
              <>
                Confirmar Pedido
                <span className="text-white/80 text-sm font-normal">
                  &rarr;
                </span>
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-400 mt-4 leading-tight">
            Ambiente seguro. Seus dados estão protegidos.
          </p>
        </div>
      </div>
    </div>
  );
}
