"use client";
import { useState } from "react";
import { Test } from "@/interfaces/testInterface";
import { useAnswerStore } from "@/app/store/answerStore";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import { cn } from "@/lib/utils";
import { countMark } from "@/utils/function";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { ProgressBar } from "./ProgressBar";

const TestComponent = ({ test }: { test: Test[] }) => {
    const { user } = useUserStore();
    const { answers, addAnswer } = useAnswerStore();
    const router = useRouter();

    const [selection, setSelection] = useState<string | null>(null);
    const [index, setIndex] = useState<number>(0);

    const handleValidate = async () => {
        if (selection) {
            addAnswer({
                questionId: test[index].id.toString(),
                choiceSelected: selection,
                answer: test[index].answer
            });
            setSelection(null);
            if (index < test.length - 1) {
                setIndex(index + 1);
            }
            else {
                const response = await fetch('/api/modify-user', {
                    method: 'POST',
                    body: JSON.stringify({ data: {quiz: countMark(answers)}, email: user?.email }),
                });
                const data = await response.json();
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    router.push("/");
                }
            }
        }
    }
    return <div className="flex flex-col gap-4 w-full">
        <ProgressBar currentIndexQuestion={index} totalQuestions={test.length}/>
        <h1 className="text-2xl font-bold">{test[index].question}</h1>
        <Table isStriped removeWrapper>
            <TableHeader className="bg-black text-gold">
                <TableColumn>Réponse</TableColumn>
            </TableHeader>      
            <TableBody className="bg-black text-gold">
                {test[index].choices.map((item, idx) => {
                    const key = Object.keys(item)[0];
                    const value = item[key];
                    return (
                        <TableRow 
                            className={cn("cursor-pointer hover:bg-gold bg-black text-white rounded-lg", selection === key && "bg-gold text-black")} 
                            key={key}
                        >
                            <TableCell 
                                className="cursor-pointer rounded-lg" 
                                onClick={() => setSelection(key)}
                            >
                                {value}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
        <button className="bg-gold text-black rounded-md px-4 py-2" onClick={() => handleValidate()}>Valider</button>
    </div>;
};

export default TestComponent;
