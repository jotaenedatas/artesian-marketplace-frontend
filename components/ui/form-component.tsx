import { ComponentProps } from "react";

interface FieldProps extends ComponentProps<"input"> {
  label: string;
  errorMessage?: string[] | string;
}

export function Input({ label, errorMessage, className, ...props }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition
          ${errorMessage ? "border-red-500 focus:ring-red-200" : "border-gray-200"} ${className}`}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{Array.isArray(errorMessage) ? errorMessage[0] : errorMessage}</p>
      )}
    </div>
  );
}

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  errorMessage?: string[] | string;
}

export function TextArea({ label, errorMessage, className, ...props }: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition min-h-[100px]
          ${errorMessage ? "border-red-500 focus:ring-red-200" : "border-gray-200"} ${className}`}
        {...props}
      />
    </div>
  );
}

// Select customizado para Categorias
export function Select({ label, errorMessage, children, ...props }: ComponentProps<"select"> & { label: string, errorMessage?: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select
          className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none appearance-none bg-white
            ${errorMessage ? "border-red-500" : "border-gray-200"}`}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage[0]}</p>}
    </div>
  );
}