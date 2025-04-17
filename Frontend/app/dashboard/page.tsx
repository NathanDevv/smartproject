"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // Función para cerrar sesión
  const logout = () => {
    document.cookie = "auth=; path=/; max-age=0"; // Borrar cookie
    window.location.href = "/login";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Cambia el estado de loading después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpiar el timer cuando el componente se desmonte
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loading ? (
        <Loader /> // Mostrar el loader mientras carga
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-3xl font-bold text-center mb-6">Bienvenido al Dashboard</h1>
          <div className="flex justify-center">
            <button
              onClick={logout}
              className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
