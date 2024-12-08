import { RichTextItemResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Test {
    id: number;
    question: string;
    choices: { [key: string]: string }[];
    answer: string;
}

export interface Answer {
    questionId: string;
    choiceSelected: string;
    answer: string;
}

export interface NotionTestProperties {
    question: { title: RichTextItemResponse[];}
    choices: { rich_text: RichTextItemResponse[];}
    answer: { rich_text: RichTextItemResponse[];}
}

export interface NotionTest extends Omit<PageObjectResponse, 'properties'> {
    properties: NotionTestProperties;
  }