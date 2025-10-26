// components/ui/FloatingLabelSearch.tsx
import React from "react";
// 1. Importa el icono DENTRO de este componente
import SearchIcon from "../icons/SearchIcon";

// 2. Definimos las props que aceptará el componente
type Props = {
  id: string;
  placeholder: string;
  className?: string; // Para pasar clases externas como 'w-1/3'
};

export default function FloatingLabelSearch({
  id,
  placeholder,
  className,
}: Props) {
  return (
    // 3. Aplicamos la className externa al div 'relative'
    <div className={`relative ${className}`}>
      <input
        id={id} // 4. Usamos la prop 'id'
        type="search"
        placeholder=" "
        className="
          peer 
          w-full 
          ring-blue-300 
          border border-gray-300 
          rounded-md 
          px-4 py-2 pr-10 
          text-sm font-normal 
          focus:outline-none 
          focus:ring-1 
          focus:ring-blue-700
        "
      />

      <label
        htmlFor={id} // 4. Usamos la prop 'id'
        className="
          absolute 
          z-10
          left-1
          top-2
          font-normal 
          text-sm 
          text-gray-500 
          pointer-events-none 
          transition-all 
          duration-300 
          ease-in-out
          peer-focus:-translate-y-7
          peer-focus:scale-87
          peer-focus:bg-white 
          peer-focus:px-1 
          peer-focus:text-blue-700
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:bg-transparent 
          peer-placeholder-shown:px-0 
          peer-placeholder-shown:text-gray-500
        "
      >
        {placeholder} {/* 5. Usamos la prop 'placeholder' */}
      </label>

      <button
        type="submit"
        className="
          absolute 
          inset-y-0 
          right-0 
          flex 
          items-center 
          px-3 
          text-gray-500 
          bg-blue-300 
          hover:text-black 
          focus:outline-none 
          peer-focus:bg-blue-500 
          peer-focus:text-white 
          rounded-r-md
        "
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
