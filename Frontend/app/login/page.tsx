"use client";


import { useRef, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    let valid = true;

    if (!emailPattern.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!passwordPattern.test(password)) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (!valid) return;

    const validEmail = "demo@demo.com";
    const validPassword = "Demo123!";

    if (email !== validEmail || password !== validPassword) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    // Guardar cookie válida por 1 hora
    document.cookie = "auth=true; path=/; max-age=3600";

    // Redirigir (puedes usar router.push también si prefieres)
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <h1>DEMO LOGIN</h1>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Correo electrónico"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {emailError && (
              <p className="text-sm text-red-500">
                Por favor, ingresa un correo electrónico válido.
              </p>
            )}
          </div>

          <div className="relative">
            <input

              ref={passwordRef}
              type="password"
              placeholder="Contraseña"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {passwordError && (
              <p className="text-sm text-red-500 mt-1">
                La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link href="/recuperar" className="text-sm text-blue-500 hover:text-blue-700">
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
            <Link href="/registro" className="text-sm text-gray-600 hover:text-gray-800">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
