"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  useEffect(() => {
    // Mostrar/ocultar contraseña (si tuvieras un botón con ID toggle-password)
    const togglePasswordButton = document.getElementById("toggle-password");
    if (togglePasswordButton) {
      togglePasswordButton.addEventListener("click", () => {
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      });
    }

    // Validar formulario al enviar
    const form = document.getElementById("login-form") as HTMLFormElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    function validateForm(event: Event) {
      event.preventDefault();

      const emailInput = document.getElementById("email") as HTMLInputElement;
      const emailError = document.getElementById("email-error");
      const passwordError = document.getElementById("password-error");

      const email = emailInput.value;
      const password = passwordInput.value;

      let valid = true;

      // Validación de correo
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailError) {
        if (!emailPattern.test(email)) {
          emailError.classList.remove("hidden");
          valid = false;
        } else {
          emailError.classList.add("hidden");
        }
      }

      // Validación de contraseña
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (passwordError) {
        if (!passwordPattern.test(password)) {
          passwordError.classList.remove("hidden");
          valid = false;
        } else {
          passwordError.classList.add("hidden");
        }
      }

      if (valid) {
        form.submit(); // Enviar si es válido
      }
    }

    // Validación al enviar
    form.addEventListener("submit", validateForm);

    // Validación mientras se escribe la contraseña
    passwordInput?.addEventListener("input", () => validateForm(new Event("input")));

    return () => {
      form.removeEventListener("submit", validateForm);
      passwordInput?.removeEventListener("input", () => validateForm(new Event("input")));
    };
  }, []);

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
            <p id="password-error" className="hidden text-sm text-red-500 mt-1">
              La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.
            </p>
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
