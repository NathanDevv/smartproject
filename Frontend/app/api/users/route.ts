import { NextResponse } from 'next/server'
import { users } from "@/lib/data"

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
