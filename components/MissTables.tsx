'use client'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    SortDescriptor
} from "@nextui-org/table";
import { Miss, MissWithGrade } from "@/interfaces/missInterface";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { MissGrade } from "@prisma/client";
import { useAsyncList } from "@react-stately/data";


interface TablesProps {
    miss: Miss[];
}

const Tables: React.FC<TablesProps> = ({ miss }) => {
    const router = useRouter();
    const [missRate, setMissRate] = useState<MissGrade[] | null>(null);
    const { user } = useUserStore();

    useEffect(() => {
        const fetchMissRate = async () => {
            const missRate = await fetch(`/api/get-rating`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: user?.id,
                }),
            });
            const data = await missRate.json();
            setMissRate(data);
        };
        fetchMissRate();
    }, []);

    let list = useAsyncList<MissWithGrade>({
        async load({ }) {
            let res = await fetch(`/api/get-rating`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: user?.id,
                }),
            });
            const data = await res.json();

            const enrichedTestResults = miss ? miss.map((result, index) => {
                const profileData = data && data.length > index ? data[index] : null;
            
                return {
                    ...result,
                    elegance: profileData?.elegance,
                    beauty: profileData?.beauty,
                    eloquence: profileData?.eloquence,
                    finalNote: profileData?.finalNote,
                } as MissWithGrade;
              }) : [];

            return {
                items: enrichedTestResults,
            };
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let first: string | number, second: string | number;

                    // Handle sorting for "Note"
                    if (sortDescriptor.column === "Note") {
                        first = missRate?.find(grade => grade.missId === a.region)?.finalNote?.toString() || "0"; // Default to "0" if not found
                        second = missRate?.find(grade => grade.missId === b.region)?.finalNote?.toString() || "0"; // Default to "0" if not found
                    } 
                    // Handle sorting for "Région"
                    else if (sortDescriptor.column === "Région") {
                        first = a.region;
                        second = b.region;
                    } else {
                        first = '';
                        second = '';
                    }

                    // Compare values as strings
                    let cmp = typeof first === 'string' && typeof second === 'string' 
                        ? first.localeCompare(second) // Use localeCompare for string comparison
                        : (first < second ? -1 : 1); // Fallback for non-string comparison

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1; // Reverse the order if sorting in descending
                    }

                    return cmp; // Ensure cmp is always a number
                }),
            };
        },
    });

    return <Table isStriped removeWrapper
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort as (descriptor: SortDescriptor) => void}>
        <TableHeader>
            <TableColumn key="finalNote" className="text-gold bg-black" allowsSorting>Note</TableColumn>
            <TableColumn key="region" className="text-gold bg-black" allowsSorting>Région</TableColumn>
            <TableColumn className="text-gold bg-black">Nom</TableColumn>
            <TableColumn className="text-gold bg-black">Age</TableColumn>
        </TableHeader>
        <TableBody
            items={list.items}
        >
            {(item: MissWithGrade) => (
                <TableRow onClick={() => router.push(`/miss/${encodeURIComponent(item.region)}`)} className="cursor-pointer hover:bg-gold bg-black text-white rounded-lg" key={item.name}>
                    <TableCell>{missRate?.map((grade: MissGrade) => grade.missId === item.region && item.finalNote)}</TableCell>
                    <TableCell className="rounded-l-lg">{item.region}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.age}</TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
}

export { Tables };
