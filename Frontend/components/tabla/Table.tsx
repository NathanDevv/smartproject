'use client';

import { useEffect, useState } from 'react';
import { User } from './types';

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Filtrar por nombre, email y ciudad
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const email = user.email.toLowerCase();
    const city = user.address.city.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      fullName.includes(search) ||
      email.includes(search) ||
      city.includes(search)
    );
  });

  // 📄 Lógica de paginación
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-10">Tabla de usuarios</h1>

      {/* 🔍 Input de búsqueda */}
      <h1 className="text-2xl font-bold mb-2">Búsqueda</h1>
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

      {/* 📊 Tabla */}
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Ciudad</th>
            <th className="p-3 border">Compañía</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{user.firstname} {user.lastname}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.address.city}</td>
                <td className="p-3 border">{user.company.name}</td>
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
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
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
