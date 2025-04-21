// tabla/types.ts

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    address: {
      city: string;
    };
    company: {
      name: string;
    };
  };
  