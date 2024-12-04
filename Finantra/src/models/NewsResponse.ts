import { News } from "./News";

export interface NewsResponse{
    content: News[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}