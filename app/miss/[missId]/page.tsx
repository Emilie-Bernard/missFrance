import { getNotionMissByRegion } from "@/utils/notion";
import { Miss } from "@/interfaces/missInterface";
import OneMissComponent from "@/components/OneMissComponent";

const MissPage = async ({ params }: { params: { missId: string } }) => {
    const missId = decodeURIComponent(params.missId);
    const { result: miss } = await getNotionMissByRegion(missId) as { result: Miss };
    if (!miss) {
        return <p>No data available</p>;
    }
    return (
        <OneMissComponent miss={miss} />
    );
};

export default MissPage;