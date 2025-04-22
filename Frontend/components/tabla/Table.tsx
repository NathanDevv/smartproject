"use client";

import { useEffect, useState } from "react";
import { User } from "./types";
import { useRouter } from "next/navigation";

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const usersPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Filtrar por nombre, email y ciudad
  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();
    const city = user.address.city.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) || email.includes(search) || city.includes(search)
    );
  });

  //Lógica de eliminación
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
  
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Error al eliminar el usuario.");
      }
    } catch (error) {
      console.error("Error al hacer la petición DELETE:", error);
    }
  };  

  // 📄 Lógica de paginación
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-10">
        Tabla de usuarios
      </h1>

      {/* 🔍 Input de búsqueda */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Búsqueda</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, email o ciudad..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Resetear a la página 1 al buscar
            }}
            className="mb-4 px-4 py-2 border rounded w-full md:w-1/2"
          />

          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => {router.push("/new")}}
          >
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* 📊 Tabla */}
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Ciudad</th>
            <th className="p-3 border">Compañía</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.address.city}</td>
                <td className="p-3 border">{user.company.name}</td>

                <td className="p-3 border">
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/edit/${user.id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ⬅️➡️ Botones de paginación */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
