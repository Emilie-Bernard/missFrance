import { getNotionMiss } from "@/utils/notion";
import { Tables } from "@/components/missTables";
import { Miss } from "@/interfaces/missInterface";

const MissPage = async () => {
    const { result, error } = await getNotionMiss();

    if (!result || error) return <div>Pas de données</div>;
    return <div>
        <Tables miss={result as Miss[]} />
    </div>;
};

export default MissPage;
