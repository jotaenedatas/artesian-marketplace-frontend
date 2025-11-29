import { ComponentProps } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  label: string;
  errorMessage?: string[] | string; // Aceita array (do Zod) ou string
}

export function InputField({ label, errorMessage, className, ...props }: InputFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-sm mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 transition-colors
          ${errorMessage ? "border-red-500 focus:ring-red-200" : "border-gray-300"}
          ${className}`}
        {...props}
      />
      {/* Renderiza o erro se existir */}
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">
          {Array.isArray(errorMessage) ? errorMessage[0] : errorMessage}
        </p>
      )}
    </div>
  );
}