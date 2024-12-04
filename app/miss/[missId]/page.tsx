import { getNotionMissByRegion } from "@/utils/notion";
import { Miss } from "@/interfaces/missInterface";
import { getInstagramMiss } from "@/utils/instagram";

const MissPage = async ({ params }: { params: { missId: string } }) => {
    const { result: miss } = await getNotionMissByRegion(params.missId) as { result: Miss };
    const { result: instagramMiss } = await getInstagramMiss(miss.instagram);
    console.log(instagramMiss);
    if (!miss) {
        return <p>No data available</p>;
    }
    return (
        <div>
            <div>
                <h1>{miss.name}</h1>
                <p>Region: {miss.region}</p>
                <p>Age: {miss.age}</p>
                <p>Height: {miss.height}</p>
                <p>City: {miss.city}</p>
                <p>Instagram: {miss.instagram}</p>
            </div>
        </div>
    );
};

export default MissPage;