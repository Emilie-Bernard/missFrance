import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { firstName, lastName, email, password } = await req.json();
  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'L\'email existe déjà' }, { status: 400 });
    }

    // Create a new user
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
  }
}
