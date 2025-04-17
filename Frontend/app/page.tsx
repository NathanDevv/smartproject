import React from 'react';


export default function Home() {
  return (
    <header className="bg-gray-900 text-white flex justify-between items-center p-4">
      <h1 className="text-3xl font-bold">Psicologia Educativa e infantil</h1>
      <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <p className="text-base font-semibold">Iniciar sesion</p>
      </a>
    </header>
  )
 
}
