import { RichTextItemResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Miss {
    name: string;
    region: string;
    age: number;
    height: string;
    city: string;
    instagram: string;
}

export interface NotionMissProperties {
    name: { title: RichTextItemResponse[];}
    region: { rich_text: RichTextItemResponse[];}
    age: { number: number; }
    height: { rich_text: RichTextItemResponse[];}
    city: { rich_text: RichTextItemResponse[];}
    instagram: { rich_text: RichTextItemResponse[];}
}

export interface NotionMiss extends Omit<PageObjectResponse, 'properties'> {
    properties: NotionMissProperties;
  }

  export interface MissWithGrade {
    name: string;
    region: string;
    age: number;
    height: string;
    city: string;
    instagram: string;
    elegance: number;
    beauty: number;
    eloquence: number;
    finalNote: number;
}
