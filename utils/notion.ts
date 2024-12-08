import { Miss, NotionMiss } from "@/interfaces/missInterface";
import { Test, NotionTest } from "@/interfaces/testInterface";
import { Client } from "@notionhq/client";
import { formatMissData, formatTestData } from "./function";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

export const getNotionMiss = async (): Promise<{ result?: (Miss | null)[], error?: string }> => {
    try {
        const responses = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_MISS_ID as string,
            sorts: [
                {
                    property: 'region',
                    direction: 'ascending',
                },
            ],
        })

        const result = responses.results as unknown as NotionMiss[];
        const formattedMiss = formatMissData(result);
        return { result: formattedMiss };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch questions from Notion' };
    }
}

export const getNotionMissByRegion = async (region: string): Promise<{ result?: (Miss | null), error?: string }> => {
    try {
        const responses = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_MISS_ID as string,
            filter: {
                property: 'region',
                rich_text: {
                    equals: region,
                },
            },
        })

        const result = responses.results as unknown as NotionMiss[];
        const formattedMiss = formatMissData(result);
        return { result: formattedMiss[0] };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch questions from Notion' };
    }
}

export const getNotionTest = async (): Promise<{ result?: (Test[] | null), error?: string }> => {
    try {
        const responses = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_TEST_ID as string,
        })

        const result = responses.results as unknown as NotionTest[];
        const formattedTest = formatTestData(result);
        return { result: formattedTest };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch questions from Notion' };
    }
}
