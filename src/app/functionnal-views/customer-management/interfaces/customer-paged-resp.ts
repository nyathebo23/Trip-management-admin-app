import { Customer } from "./customer";

export interface CustomerPagedResp {
    items: Customer[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}