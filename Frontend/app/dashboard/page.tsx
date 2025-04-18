"use client";

import { useState, useEffect } from "react";
import { Loader, Navbar } from "@/components";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full h-screen">
          <Navbar />
          <h1 className="text-3xl font-bold text-center m-6">DashBoard</h1>
        </div>
      )}
    </div>
  );
}
