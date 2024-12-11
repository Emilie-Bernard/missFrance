import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { missId, userId } = await req.json();

    try {
        // Check if a rating already exists for the given missId and userId
        const existingRating = await prisma.missGrade.findFirst({
            where: {
                userId: {
                    equals: userId,
                },
                missId: {
                    equals: missId,
                },
            },
        });


        return NextResponse.json(existingRating);
    } catch (error) {
        console.error('Error rating Miss:', error);
        return NextResponse.json({ error: 'An error occurred while rating Miss' }, { status: 500 });
    }
}