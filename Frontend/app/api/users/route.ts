// app/api/users/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://jsonplaceholder.org/users');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
