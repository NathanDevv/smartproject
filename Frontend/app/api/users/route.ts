import { NextResponse, NextRequest } from "next/server";
import { users } from "@/lib/data";

// Obtener todos los usuarios
export async function GET() {
  return NextResponse.json(users);
}

// Crear un nuevo usuario
export async function POST(req: NextRequest) {
  const newUser = await req.json();

  newUser.id = Date.now(); // Genera un ID único
  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
