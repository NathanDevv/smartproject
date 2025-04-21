import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  console.log("ID a eliminar:", id);

  // Simulación de eliminación
  return NextResponse.json({ message: `Usuario ${id} eliminado.` }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      const body = await request.json();
  
      const { name, email, address, company } = body;
  
      console.log("ID a actualizar:", id);
      console.log("Datos nuevos:", { name, email, address, company });
  
      // Simulación de actualización
      // Aquí normalmente llamarías a tu base de datos para actualizar
      // Por ejemplo: await db.users.update(id, { ... })
  
      return NextResponse.json(
        { message: `Usuario ${id} actualizado.`, updatedUser: { id, name, email, address, company } },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error en PUT:", error);
      return NextResponse.json({ message: "Error al actualizar el usuario." }, { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
    console.log("Obteniendo usuario con ID:", id);
  
    // Simulación de obtención de usuario
    const fakeUser = {
      id,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      address: {
        city: "Santiago",
      },
      company: {
        name: "Empresa X",
      },
    };
  
    return NextResponse.json(fakeUser, { status: 200 });
}
