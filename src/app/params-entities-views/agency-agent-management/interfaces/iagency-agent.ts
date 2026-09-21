import { IUser } from "../../../authentication/interfaces/iuser";

export interface IAgencyAgent {
    id: string,
    user: IUser,
    agencyId: string,
}