"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    document.cookie = "auth=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div>
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>

      <div className="flex items-center gap-3 relative">
        <span className="text-sm font-medium">
          Bienvenido, <b>NombreUsuario</b>
        </span>

        <div
          className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer"
          onClick={toggleMenu}
        >
          <Image
            src="/profilePlaceholder.webp"
            alt="user profile pic"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 w-56 bg-white border rounded-md shadow-lg z-10">
            <div className="px-4 py-2 font-medium border-b">Mi cuenta</div>
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Perfil
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Configuración
              </button>
            </div>
            <div className="border-t py-1">
              <button
                className="w-full text-left font-bold px-4 py-2 hover:cursor-pointer hover:bg-gray-100 text-red-600"
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
