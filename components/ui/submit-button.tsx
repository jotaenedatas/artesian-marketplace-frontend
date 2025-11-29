'use client';

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {pending ? (
        <>
          {/* Spinner simples via CSS */}
          <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin mr-2" />
          Entrando...
        </>
      ) : (
        children
      )}
    </button>
  );
}