import { Connection, Org } from '@salesforce/core';
import { Package2Info } from "./package";
export declare function readRelaseJSON(devHubCon: Connection, planFile: string, targetOrg: Org): Promise<ReleasePlan>;
export interface ReleasePlan {
    releaseName: string;
    plannedReleaseDate: string;
    releasePackage: boolean;
    preReleaseRunBook: string;
    postReleaseRunBook: string;
    packages: ReleasePlanEntry[];
}
export interface ReleasePlanEntry {
    name: string;
    version: string;
    squence: number;
    detail: Package2Info;
    installedInfo: OrgEntry;
}
export interface OrgEntry {
    orgName: string;
    installed: boolean;
    installedVersion: string;
}
