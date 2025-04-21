"use client";

import { useState, useEffect } from "react";
import { Loader, Navbar } from "@/components";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const authCookie = cookies.find((cookie) => cookie.startsWith("auth="));

    if (authCookie === "auth=true") {
      setIsAuthenticated(true);
      // Obtener el nombre del usuario del localStorage
      const storedName = localStorage.getItem("nombreUsuario") || "Invitado";
      setNombreUsuario(storedName);
    } else {
      router.push("/login");
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full h-screen">
          <Navbar nombreUsuario={nombreUsuario} />
          <h1 className="text-3xl font-bold text-center m-6">Bienvenido al Dashboard</h1>
        </div>
      )}
    </div>
  );
}
