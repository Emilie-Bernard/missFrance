import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("GET");
  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findMany().then((users) => {
        return users.sort((a, b) => b.quiz - a.quiz);
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Le compte n\'existe pas' }, { status: 400 });
    }

    // Create a new user
    return NextResponse.json(existingUser);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la connexion' }, { status: 500 });
  }
}
