import { Connection, Org } from '@salesforce/core';
/**
 *
 * @param connection - sfdx connection
 * @param pkgname - e.g. salesforce-global-core
 * @param version - the symantic version e.g. 1.1.0.1
 * @param pkgId - if provided it will just fetch info for the package
 * @param allBetas - if supplied then it will show the list of packages in that group - e.g. 1.1.0.1, 1.1.0.2,1.1.0.3 - otherwise just the specific version
 * @returns
 */
export declare function getPackageInfo(connection: Connection, pkgname: string, version: string, pkgId: string, allBetas: boolean): Promise<Package2Info[]>;
export declare function updatePackage(pkgId: string, tag: string, conn: Connection): Promise<void>;
export declare function getAllInstalledPackages(conn: Connection): Promise<Package2Info[]>;
export declare function getInstalledPackages(conn: Connection, filterPkgName: string, exactMatch?: boolean): Promise<Package2Info[]>;
export declare function getInstalledPackagesCmd(orgName: Org, filterPkgName: string): Promise<Package2Info[]>;
export declare function getLatestPackageVersion(connection: Connection, pkgname: string, releasedOnly: boolean): Promise<Package2Info[]>;
export declare function getDevHubDependecies(connection: Connection, pkgId: string): Promise<Package2Info[]>;
export interface Package2Info {
    SubscriberPackageVersionId: string;
    PackageVersionNumber: string;
    Package2Id: string;
    MajorVersion: number;
    MinorVersion: number;
    PatchVersion: number;
    BuildNumber: number;
    Description: string;
    ValidationSkipped: boolean;
    Name: string;
    Tag: string;
    CreatedDate: Date;
    LastModifiedDate: Date;
    IsReleased: Boolean;
    CodeCoverage: number;
    CodeCoverageCheckPassed: boolean;
    NameSpace: string;
    Type: string;
    isOrgDependent: boolean;
    isSecurityReviewed: boolean;
}
