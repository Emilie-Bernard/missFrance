
import { MissGrade } from "@prisma/client";
import { Card } from "@nextui-org/card";

const MarkCardboard = ({ miss, setPopUpType, setIsPopUpOpen }: { miss: MissGrade, setPopUpType: (type: string) => void, setIsPopUpOpen: (open: boolean) => void }) => {
    const list = [
        {
            name: "Elégance",
            type: "elegance",   
            value: miss.elegance
        },
        {
            name: "Beauté",
            type: "beauty",
            value: miss.beauty
        },
        {
            name: "Eloquence",
            type: "eloquence",
            value: miss.eloquence
        },
        {
            name: "Présentation",
            type: "presentation",
            value: miss.presentation
        },
    ]
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="grid grid-cols-2 gap-2 items-center">
                {list.map((item) => (
                    <Card isPressable className="bg-gold/50 text-black w-full" onPress={() => { setPopUpType(item.type); setIsPopUpOpen(true); }}>
                        <div className="flex flex-col items-center justify-center p-2">
                            <h2 className="">{item.name}</h2>
                            <p className="text-2xl font-bold">{item.value}<span className="text-sm">/10</span></p>
                        </div>
                    </Card>

                ))}
            </div>
            <Card isPressable className="bg-gold/50 text-black w-full" onPress={() => { setPopUpType("finalnote"); setIsPopUpOpen(true); }}>
                <div className="flex flex-col items-center justify-center p-2">
                    <h2 className="">Note Finale</h2>
                    <p className="text-2xl font-bold">{miss.finalNote}<span className="text-sm">/10</span></p>
                </div>
            </Card>
        </div>
    );
};

export default MarkCardboard;   