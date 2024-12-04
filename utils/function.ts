import { NotionMiss } from "@/interfaces/missInterface";

export const formatMissData = (data: NotionMiss[]) => {
    return data.map((item) => ({
        name: item.properties.name.title[0].plain_text,
        region: item.properties.region.rich_text[0].plain_text,
        age: item.properties.age.number,
        height: item.properties.height.rich_text[0].plain_text,
        city: item.properties.city.rich_text[0].plain_text,
        instagram: item.properties.instagram.rich_text[0].plain_text,
    }));
};