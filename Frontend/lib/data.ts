// lib/data.ts

type User = {
    id: string;
    name: string;
    email: string;
    address: {
      city: string;
    };
    company: {
      name: string;
    };
  };
  
  // Este array simula tu "base de datos en memoria"
export const users: User[] = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      address: {
        city: "Santiago",
      },
      company: {
        name: "Empresa X",
      },
    },
    {
      id: "2",
      name: "Ana García",
      email: "ana.garcia@example.com",
      address: {
        city: "Valparaíso",
      },
      company: {
        name: "Empresa Y",
      },
    },
];
  