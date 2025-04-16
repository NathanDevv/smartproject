"use client";

import { useState } from "react";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function JsonPlaceholderDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar los datos"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cargar los datos al hacer clic en el botón

  const handleLoadData = () => {
    fetchPosts();
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">JSONPlaceholder Demo</h1>
        <p className="text-gray-600 mb-4">
          Visualización de datos desde JSONPlaceholder API
        </p>

        <button
          onClick={handleLoadData}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading
            ? "Cargando..."
            : posts.length > 0
            ? "Recargar datos"
            : "Cargar datos"}
        </button>
      </header>

      {error && (
        <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.slice(0, 12).map((post) => (
              <div
                key={post.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectPost(post)}
              >
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-medium truncate">{post.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    #{post.id}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {post.body}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Usuario ID: {post.userId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Post ID: {selectedPost.id} | Usuario ID: {selectedPost.userId}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-line">
                {selectedPost.body}
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}