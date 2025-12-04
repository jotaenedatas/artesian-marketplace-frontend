"use client";

import { useState } from "react";
import {
  increaseStockAction,
  decreaseStockAction,
} from "@/actions/product-stock";
import { Minus, Plus, X, Check, Package } from "lucide-react";

interface StockManagerProps {
  productId: string;
  currentStock: number;
}

type Mode = "VIEW" | "ADD" | "REMOVE";

export function StockManager({ productId, currentStock }: StockManagerProps) {
  const [mode, setMode] = useState<Mode>("VIEW");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  async function handleUpdate(
    actionFn: typeof increaseStockAction,
    formData: FormData
  ) {
    setLoading(true);
    setMessage(null);

    try {
      const result = await actionFn(productId, formData);

      // Tratamento robusto da mensagem de erro
      let msgText = "Operação concluída";
      if (result && result.message) {
        if (Array.isArray(result.message)) {
          msgText = result.message.join(", ");
        } else if (typeof result.message === "object") {
          msgText = JSON.stringify(result.message);
        } else {
          msgText = String(result.message);
        }
      } else if (!result.success) {
        msgText = "Erro desconhecido ao atualizar estoque.";
      }

      if (result.success) {
        setMode("VIEW");
        setMessage({ text: msgText, type: "success" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: msgText, type: "error" });
      }
    } catch (err) {
      setMessage({
        text: "Erro de comunicação com o servidor.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  // --- MODO 1: VISUALIZAÇÃO ---
  if (mode === "VIEW") {
    return (
      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Package size={20} />
            <span>Controle de Estoque</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {currentStock} un.
          </div>
        </div>

        {message && (
          <div
            className={`text-xs mb-3 px-2 py-1 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode("REMOVE")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition shadow-sm font-medium"
          >
            <Minus size={16} />
            Reduzir
          </button>

          <button
            type="button"
            onClick={() => setMode("ADD")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition shadow-sm font-medium"
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>
      </div>
    );
  }

  // --- MODO 2 e 3: FORMULÁRIO (ADD ou REMOVE) ---
  const isAdd = mode === "ADD";
  const actionToCall = isAdd ? increaseStockAction : decreaseStockAction;

  return (
    <div
      className={`p-5 rounded-xl border-2 transition-colors ${
        isAdd ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className={`font-bold text-sm uppercase tracking-wide ${
            isAdd ? "text-green-800" : "text-red-800"
          }`}
        >
          {isAdd ? "Entrada de Estoque" : "Baixa de Estoque"}
        </span>
        <button
          type="button"
          onClick={() => {
            setMode("VIEW");
            setMessage(null);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      <form
        action={(formData) => handleUpdate(actionToCall, formData)}
        className="flex gap-2"
      >
        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Qtd"
          autoFocus
          required
          className={`flex-1 p-2 rounded-lg border focus:ring-2 outline-none shadow-sm transition-all
            ${
              isAdd
                ? "border-green-300 focus:border-green-500 focus:ring-green-500 text-green-900 placeholder:text-green-400 bg-white"
                : "border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder:text-red-400 bg-white"
            }
          `}
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm flex items-center gap-2 transition disabled:opacity-50
            ${
              isAdd
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          `}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Check size={18} />
              Confirmar
            </>
          )}
        </button>
      </form>

      {message && (
        <p
          className={`text-xs mt-2 font-medium ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
