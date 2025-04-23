"use client";

import { useState } from "react";
import { createPacienteAPI } from "@/services/pacientesService";
import { CrearPaciente, Paciente } from "@/types";

export function useCreatePaciente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [createdPaciente, setCreatedPaciente] = useState<Paciente | null>(null);

  const createPaciente = async (nuevoPaciente: CrearPaciente) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setCreatedPaciente(null);

    try {
      const response = await createPacienteAPI(nuevoPaciente);
      setCreatedPaciente(response);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Error al crear el paciente");
    } finally {
      setLoading(false);
    }
  };

  return { createPaciente, loading, error, success, createdPaciente };
}
