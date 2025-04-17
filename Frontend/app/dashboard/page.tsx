"use client";

export default function DashboardPage() {
  const logout = () => {
    document.cookie = "auth=; path=/; max-age=0"; // Borrar cookie
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Bienvenido al dashboard</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
