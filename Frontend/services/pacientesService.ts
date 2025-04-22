import { Paciente } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getAllPacientes(): Promise<Paciente[]> {
  const res = await fetch(`${BASE_URL}/Api/pacientes`);
  if (!res.ok) throw new Error("Error al obtener pacientes");
  return res.json();
}

export async function getPacienteById(id: number): Promise<Paciente> {
  const res = await fetch(`${BASE_URL}/Api/${id}`);
  if (!res.ok) throw new Error("Error al obtener pacientes");
  return res.json();
}

export async function createPaciente(paciente: Paciente) {
  const res = await fetch(`${BASE_URL}/Api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  if (!res.ok) throw new Error("Error al crear paciente");
  return res.json();
}

export async function deletePaciente(id: number) {
  const res = await fetch(`${BASE_URL}/Api/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar paciente");
  return res.json();
}

export async function updatePaciente(id: number, paciente: Paciente) {
  const res = await fetch(`${BASE_URL}/Api/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  if (!res.ok) throw new Error("Error al editar paciente");
  return res.json();
}
