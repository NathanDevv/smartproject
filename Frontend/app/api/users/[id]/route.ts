import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  const body = await request.json();
  users[index] = { ...users[index], ...body };

  return NextResponse.json(users[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  const deleted = users.splice(index, 1);

  return NextResponse.json({ message: `Usuario ${id} eliminado.`, deleted });
}
