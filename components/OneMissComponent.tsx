'use client';

import { Miss } from "@/interfaces/missInterface";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, UserPenIcon } from "lucide-react";
import { useUserStore } from "@/app/store/userStore";
import { useState, useEffect } from "react";
import { MissGrade } from "@prisma/client";
import RatingPopup from "@/components/RatingPopup";
import MarkCardboard from "@/components/MarkCardboard";
import { useRouter } from "next/navigation";


const OneMissComponent = ({ miss }: { miss: Miss }) => {
    const { user } = useUserStore();
    const [missRate, setMissRate] = useState<MissGrade | null>(null);
    const [popUpType, setPopUpType] = useState("all");
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const router = useRouter();
    if (!miss) {
        return <p>No data available</p>;
    }
    useEffect(() => {
        const fetchMissRate = async () => {
            const missRate = await fetch(`/api/get-rating-one-miss`, {
                method: 'POST',
                body: JSON.stringify({
                    missId: miss.region,
                    userId: user?.id,
                }),
            });
            const data = await missRate.json();
            setMissRate(data);
        };
        fetchMissRate();
    }, [isRatingOpen]);
    return (
        <aside className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-5 left-5 z-20 bg-black/30 rounded-full p-2">
                <ChevronLeftIcon className="text-black" onClick={() => router.back()} />
            </div>
            <div className="p-0 flex flex-col items-center justify-center">
                <div className="flex-col inset relative text-white whitespace-normal h-[418px] w-full">
                    <Image
                        alt="Woman listing to music"
                        className="absolute w-full h-full object-cover rounded-b-[20px] rounded-t-[0px]"
                        width={800}
                        height={800}
                        src={`/${miss.region.toLowerCase()}.jpg`}
                    /></div>
                <h2 className="text-2xl text-center text-gold font-bold mt-5">MISS {miss.region.toUpperCase()}</h2>
                <h1 className="text-xl text-center text-gold">{miss.name}</h1>
                <p className="text-sm text-center text-gold"><span className="text-gold">{miss.age} ans</span> / <span className="text-gold">{miss.height} m</span>  </p>
                <Link className="text-sm text-center text-gold mb-5" rel="noopener noreferrer" target="_blank" href={`https://www.instagram.com/${miss.instagram}`}>@{miss.instagram}</Link>
                {missRate && <MarkCardboard miss={missRate} setPopUpType={setPopUpType} setIsPopUpOpen={setIsRatingOpen} />}
                
                <div className="flex flex-col items-center absolute bottom-2 right-2 lg:bottom-12 lg:right-12 gap-2">
                    <div className="cursor-pointer rounded-full bg-gold p-2 text-center text-black h-12 w-12 flex items-center justify-center" title="Noter" onClick={() => { setPopUpType("all"); setIsRatingOpen(true)}}><UserPenIcon color="black" /></div>
                </div>
            </div>
            {isRatingOpen && (
                <RatingPopup
                    missId={miss.region}
                    userId={user?.id || ''}
                    onClose={() => setIsRatingOpen(false)}
                    data={missRate}
                    ratingType={popUpType}
                />
            )}
        </aside>
    );
};

export default OneMissComponent;