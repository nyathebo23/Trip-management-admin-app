import { ROLE } from "../../utils/roles";

export interface IUser {
    id: string,
    username: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    phoneNumber?: string,
    role: ROLE,
    enabled: boolean
}