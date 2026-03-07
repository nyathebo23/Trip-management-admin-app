import { ROLE } from "../../utils/roles"

export interface IBusDriver {
    id: string,
    user: {
        firstname: string,
        lastname: string,
        username: string,
        role: ROLE
    }
}