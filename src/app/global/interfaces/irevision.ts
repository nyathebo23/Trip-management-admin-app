import { IUser } from "../../authentication/interfaces/iuser";

export enum RevisionType {
    CREATE,
    UPDATE,
    DELETE
}

export interface IRevision {
    dateTime: Date;
    revisionType: RevisionType;
    user?: IUser;
}