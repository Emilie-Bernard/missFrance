import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, data} = await req.json();
  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      return NextResponse.json({ error: 'Le compte n\'existe pas' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la connexion' }, { status: 500 });
  }
}
