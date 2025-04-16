"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <h1>DEMO LOGIN</h1>
        </div>

        <form id="login-form" className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              placeholder="Correo electrónico"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p id="email-error" className="hidden text-sm text-red-500">
              Por favor, ingresa un correo electrónico válido.
            </p>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/recuperar"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/registro"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
