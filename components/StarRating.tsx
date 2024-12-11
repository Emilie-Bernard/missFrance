import React from 'react';

interface StarRatingProps {
    rating: number;
    onRatingChange: (newRating: number) => void;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 10 }) => {
    const stars = Array.from({ length: maxRating }, (_, index) => index + 1);

    return (
        <div className="flex">
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => onRatingChange(star)}
                    className={`cursor-pointer text-2xl ${star <= rating ? 'text-gold' : 'text-gray-300'}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating; 