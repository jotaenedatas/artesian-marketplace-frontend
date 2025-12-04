"use client";

import { activateProductAction } from "@/actions/products";
import { useState } from "react";

export function ActivateButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleActivate() {
    setLoading(true);
    await activateProductAction(id);
    setLoading(false);
  }

  return (
    <button
      onClick={handleActivate}
      disabled={loading}
      className="text-green-600 hover:text-green-800 text-sm font-medium transition disabled:opacity-50 flex items-center gap-1"
    >
      {loading ? (
        "Ativando..."
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Ativar
        </>
      )}
    </button>
  );
}
