'use client';

import { archiveProductAction } from "@/actions/products";
import { useState } from "react";

export function ArchiveButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleArchive() {
    setLoading(true);
    await archiveProductAction(id);
    setLoading(false);
  }

  return (
    <button
      onClick={handleArchive}
      disabled={loading}
      // Mudei a cor para amber/orange pois não é uma exclusão destrutiva total
      className="text-orange-600 hover:text-orange-800 text-sm font-medium transition disabled:opacity-50"
    >
      {loading ? "Arquivando..." : "Arquivar"}
    </button>
  );
}