export interface IAgencyAgent {
    id: string,
    user: {
        firstname: string,
        lastname: string,
        username: string,
        role: string
    },
    agencyId: string,
}