import { ITravel } from "./travel";

export interface TravelsPagedResp {
    items: ITravel[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}