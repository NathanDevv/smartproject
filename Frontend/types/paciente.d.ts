export interface Paciente {
  id: number;
  name: string;
  surname: string;
  birthdate: Date;
  identification: number;
  diagnosis: string;
  institution: string;
}

export interface CrearPaciente {
  id?: number;
  name: string;
  surname: string;
  birthdate?: Date;
  diagnosis: string;
  institution: string;
}

export interface EditarPaciente {
  id: number;
  name: string;
  surname: string;
  birthdate?: Date;
  diagnosis: string;
  institution: string;
}
