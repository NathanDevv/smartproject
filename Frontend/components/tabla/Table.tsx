'use client';

import { useEffect, useState } from 'react';
import { User } from './types';

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  useEffect(() => {
    // Hacemos fetch desde el cliente solo si necesitás usar datos dinámicos.
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

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabla de usuarios</h1>
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
          {currentUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border">{user.firstname} {user.lastname}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.address.city}</td>
              <td className="p-3 border">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
