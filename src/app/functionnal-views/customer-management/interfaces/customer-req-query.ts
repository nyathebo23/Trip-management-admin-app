export interface CustomerReqQuery {
    pageSize: number,
    pageNumber: number,
    sortBy?: 'lastname' | 'firstname' | 'username' | 'dateBirth',
    sortDirection?: 'asc' | 'desc',
    searchTerm?: string
}