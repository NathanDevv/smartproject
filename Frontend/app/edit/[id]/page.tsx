"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

function FormPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params?.id as string;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        city: "",
        company: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${userId}`);
                if (!res.ok) throw new Error("No se pudo obtener el usuario");

                const user = await res.json();
                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    city: user.address?.city || "",
                    company: user.company?.name || "",
                });
            } catch (error) {
                console.error("Error al cargar usuario:", error);
                setMessage("❌ No se pudo cargar el usuario.");
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            email: formData.email,
            address: {
                city: formData.city,
            },
            company: {
                name: formData.company,
            },
        };

        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "PUT", // O PATCH, dependiendo de tu API
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage("✅ Usuario actualizado exitosamente.");
                router.push("/dashboard");
            } else {
                setMessage("❌ Error al actualizar el usuario.");
            }
        } catch (error) {
            console.error("Error al enviar:", error);
            setMessage("❌ Ocurrió un error al enviar la solicitud.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Editar usuario</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Compañía"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Actualizar Usuario
                </button>
            </form>

            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}

export default FormPage;
