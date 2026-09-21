import { IUser } from "../../../authentication/interfaces/iuser"

export interface Customer {
    id: string,
    user: IUser
    dateBirth: string
}