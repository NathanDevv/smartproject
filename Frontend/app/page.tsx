import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-3xl font-bold">Psicología Educativa e Infantil</h1>
        </div>

        <div className="flex-shrink-0">
          <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Iniciar sesión
          </a>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <section className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Image
              src="/images/Foto Rene.png"
              alt="Psicologia"
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 md:pl-6 text-justify">
            <h2 className="text-2xl font-bold mb-4">¿Quién soy?</h2>
            <p className="text-gray-600 text-base mb-4">
              ¡Hola! Soy <span className='font-bold text-blue-600'>Maria Renee Ramirez Cordova</span>, psicóloga infantil y educativa.
            </p>
            <p className="text-gray-600 text-base mb-4">
              Me apasiona <span className='font-bold text-blue-600'>bailar hip hop</span>, disfrutar del mar <span className='font-bold text-blue-600'>surf</span>, escuchar <span className='font-bold text-blue-600'>música</span> y sobre todo <span className='font-bold text-blue-600'>trabajar con niños</span>. Es emocionante verlos crecer y aprender.
            </p>
            <p className="text-gray-600 text-base">
              Me alegra que estés aquí, soy <span className='font-bold text-blue-600'>Maria Renee Ramirez Cordova</span>, tu psicóloga infantil y educativa. Te doy la bienvenida a mi hogar virtual. Aquí encontrarás información valiosa para ti y tus seres queridos. No dudes en hacerte sentir, soy solo yo, no hay nadie más, así que siéntete cómoda, como si estuvieras en mi consultorio.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white p-4 md:p-6 text-center">
        <p>&copy; 2025 Psicología Educativa e Infantil</p>
      </footer>
    </>
  );
}
