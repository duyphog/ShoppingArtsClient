import { Role } from "./role";

export class Account {
    id: string;
    userName: string;
    email: string;
    dateOfBirth: string;
    gender: number;
    status: boolean;
    lastActive: string;
    createDate: Date;
    modifyDate: Date;
    version: number;
    createBy: string;
    modifyBy: string;
    roles : Role[];
}
