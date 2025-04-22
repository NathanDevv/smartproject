import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib/data";

// Obtener un solo usuario por ID
export async function GET(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const id = pathParts[pathParts.length - 1]; // Obtener el último segmento de la URL (ID)

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// Actualizar un usuario por ID
export async function PUT(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const id = pathParts[pathParts.length - 1]; // Obtener el último segmento de la URL (ID)

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  const body = await request.json();
  users[index] = { ...users[index], ...body };

  return NextResponse.json(users[index]);
}

// Eliminar un usuario por ID
export async function DELETE(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const id = pathParts[pathParts.length - 1]; // Obtener el último segmento de la URL (ID)

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  const deleted = users.splice(index, 1);

  return NextResponse.json({ message: `Usuario ${id} eliminado.`, deleted });
}
