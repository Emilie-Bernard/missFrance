import { NotionMiss } from "@/interfaces/missInterface";
import { Answer, NotionTest } from "@/interfaces/testInterface";

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

export const formatTestData = (data: NotionTest[]) => {
    return data.map((item, index) => ({
        id: index,
        question: item.properties.question.title[0].plain_text,
        choices: item.properties.choices.rich_text[0].plain_text
            .replace(/[\{\}]/g, '')
            .split(',')
            .map((choice) => {
                const [key, value] = choice.split(':').map((part) => part.trim());
                return { [key]: value };
            }),
        answer: item.properties.answer.rich_text[0].plain_text,
    })).reverse();
};

export const countMark = (answers: Answer[]) => {
    return answers.reduce((acc, answer) => answer.choiceSelected === answer.answer ? acc + 1 : acc, 0);
}
