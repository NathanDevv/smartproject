// tabla/getUsers.ts

import { User } from "./types";

export async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.org/users', {
    cache: 'no-store', // o 'force-cache' si preferís
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
