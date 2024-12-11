import TestComponent from "@/components/TestComponent";
import { Test } from "@/interfaces/testInterface";
import { getNotionTest } from "@/utils/notion";


const MissPage = async () => {
    const { result, error } = await getNotionTest();

    if (!result || error) return <div>Pas de données</div>;
    return <div className="flex justify-center items-center w-4/5">
        <TestComponent test={result as Test[]} />
    </div>;
};

export default MissPage;
