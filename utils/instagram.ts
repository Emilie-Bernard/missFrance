import { Miss } from "@/interfaces/missInterface";
import axios from "axios";

export const getInstagramMiss = async (instagram: string): Promise<{ result?: (Miss | null), error?: string }> => {
    try {
        const response = await axios.get(`https://graph.instagram.com/${instagram}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`);
        console.log("response", response.data);
        
        const lastPicture = response.data.data[0];
        return { result: lastPicture ? { ...lastPicture } : null };
    } catch (error) {
        console.log("error", error);
        return { error: 'Failed to fetch Instagram data' };
    }
}