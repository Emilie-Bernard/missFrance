'use client';

import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { MissGrade } from '@prisma/client';

interface RatingPopupProps {
    missId: string;
    userId: string;
    onClose: () => void;
    data: MissGrade | null;
    ratingType?: string;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ missId, userId, onClose, data, ratingType = "all" }) => {
    const [elegance, setElegance] = useState(data?.elegance || 0);
    const [beauty, setBeauty] = useState(data?.beauty || 0);
    const [eloquence, setEloquence] = useState(data?.eloquence || 0);
    const [presentation, setPresentation] = useState(data?.presentation || 0);
    const [finalNote, setFinalNote] = useState(data?.finalNote || 0);
    const existingRating = data;

    const handleSubmit = async () => {
        const ratingData = {
            missId,
            userId,
            elegance,
            beauty,
            eloquence,
            presentation,
            finalNote,
        };

        try {
            const response = await fetch(`/api/rate-miss`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ratingData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            onClose();
        } catch (error: any) {
            window.alert(error.message);
        }
    };

    console.log(ratingType, ratingType === "all" );
    return (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Note Miss {missId}</h2>
                {(ratingType === "all" || ratingType === "elegance") && <div className="mb-4">
                    <p className="block mb-1">Elegance :</p>
                    <StarRating rating={elegance} onRatingChange={setElegance} />
                </div>}
                {(ratingType === "all" || ratingType === "beauty") && <div className="mb-4">
                    <p className="block mb-1">Beauté :</p>
                    <StarRating rating={beauty} onRatingChange={setBeauty} />
                </div>}
                {ratingType === "all" || ratingType === "eloquence" && <div className="mb-4">
                    <p className="block mb-1">Eloquence:</p>
                    <StarRating rating={eloquence} onRatingChange={setEloquence} />
                </div>}
                {(ratingType === "all" || ratingType === "presentation") && <div className="mb-4">
                    <p className="block mb-1">Présentation :</p>
                    <StarRating rating={presentation} onRatingChange={setPresentation} />
                </div>}
                {(ratingType === "all" || ratingType === "finalnote") && <div className="mb-4">
                    <p className="block mb-1">Note finale :</p>
                    <StarRating rating={finalNote} onRatingChange={setFinalNote} />
                </div>}
                <button
                    onClick={handleSubmit}
                    className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80"
                >
                    {existingRating ? 'Mettre à jour' : 'Valider'}
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default RatingPopup; 