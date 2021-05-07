import { Role } from "./role";

export class Account {
    id: string;
    userName: string;
    email: string;
    dateOfBirth: string;
    gender: number;
    status: string;
    lastActive: string;
    createDate: string;
    modifyDate: string;
    version: number;
    createBy: string;
    modifyBy: string;
    role : Role[];
}
