// app/api/users/route.ts

// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }

// app/api/users/route.ts
import { NextResponse } from 'next/server'

const users: any[] = []  // Simula la base de datos en memoria

// GET: listar usuarios
export async function GET() {
  return NextResponse.json(users)
}

// POST: crear nuevo usuario
export async function POST(req: Request) {
  const newUser = await req.json()

  newUser.id = Date.now() // Genera un id único
  users.push(newUser)

  return NextResponse.json(newUser, { status: 201 })
}
