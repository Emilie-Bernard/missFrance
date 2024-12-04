
import { Miss } from "@/interfaces/missInterface";
import axios from "axios";

export const getInstagramMiss = async (instagram: string): Promise<{ result?: (Miss | null), error?: string }> => {
    try {
        const response = await axios.get(`https://www.instagram.com/${instagram}/?__a=1`);
        console.log("response", response.data);
        return { result: null };
    } catch (error) {
        console.log("error", error);
        return { error: 'Failed to fetch Instagram data' };
    }
}