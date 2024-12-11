import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { missId, userId, elegance, beauty, eloquence, presentation, finalNote } = await req.json();

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

        if (existingRating) {
            // Update existing rating
            const updatedRating = await prisma.missGrade.update({
                where: {
                    id: existingRating.id, // Use the existing rating's ID
                },
                data: {
                    elegance,
                    beauty,
                    eloquence,
                    presentation,
                    finalNote,
                },
            });

            return NextResponse.json(updatedRating);
        } else {
            // Create a new rating
            const newRating = await prisma.missGrade.create({
                data: {
                    userId,
                    missId,
                    elegance,
                    beauty,
                    eloquence,
                    presentation,
                    finalNote,
                },
            });
            return NextResponse.json(newRating);

        }
    } catch (error) {
        console.error('Error rating Miss:', error);
        return NextResponse.json({ error: 'An error occurred while rating Miss' }, { status: 500 });
    }
}