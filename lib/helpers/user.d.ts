import { Connection } from '@salesforce/core';
export declare function getUserInfo(connection: Connection, userName: string): Promise<UserInfo>;
export interface UserInfo {
    userName: string;
    emailAddress: string;
    id: string;
    firstName: string;
    lastName: string;
    Name: string;
}
