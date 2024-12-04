'use client'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
import { Miss } from "@/interfaces/missInterface";
import React from "react";
import { useRouter } from "next/navigation";

interface TablesProps {
    miss: Miss[];
}

const Tables: React.FC<TablesProps> = ({ miss }) => {
    const router = useRouter(); 
    console.log("Miss data:", miss);

    return <Table isStriped removeWrapper>
        <TableHeader>
            <TableColumn className="text-gold bg-black">Région</TableColumn>
            <TableColumn className="text-gold bg-black">Nom</TableColumn>
            <TableColumn className="text-gold bg-black">Age</TableColumn>
            <TableColumn className="text-gold bg-black">Hauteur</TableColumn>
        </TableHeader>
        <TableBody>
            {miss.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} className="text-center text-white">No data available</TableCell>
                </TableRow>
            ) : (
                miss.map((miss) => (
                    <TableRow onClick={() => router.push(`/miss/${miss.region}`)} className="cursor-pointer hover:bg-gold bg-black text-white rounded-lg" key={miss.name}>
                        <TableCell className="rounded-l-lg">{miss.region}</TableCell>
                        <TableCell>{miss.name}</TableCell>
                        <TableCell>{miss.age}</TableCell>
                        <TableCell>{miss.height}</TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    </Table>
}

export { Tables };