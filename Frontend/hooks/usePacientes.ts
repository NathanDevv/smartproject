"use client";

import { useEffect, useState } from "react";
import { Paciente } from "@/types";
import { getAllPacientes } from "@/services/pacientesService";

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getAllPacientes();
        setPacientes(data);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al traer todos los pacientes");
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  return { pacientes, loading, error };
}
