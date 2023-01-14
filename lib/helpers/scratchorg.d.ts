import { Org } from '@salesforce/core';
export default class ScratchOrgUtils {
    private static getScratchOrgLoginURL;
    static createScratchOrg(adminEmail: string, config_file_path: string, durationDays: number, hubOrg: Org, issueEmail: boolean, orgAlias?: string): Promise<ScratchOrg>;
    static shareScratchOrgThroughEmail(emailId: string, scratchOrg: ScratchOrg, hubOrg: Org, projectName: string): Promise<void>;
}
export interface ScratchOrg {
    recordId?: string;
    orgId?: string;
    loginURL?: string;
    signupEmail?: string;
    username?: string;
    alias?: string;
    password?: string;
    isScriptExecuted?: boolean;
    expiryDate?: string;
    accessToken?: string;
    instanceURL?: string;
    status?: string;
    sfdxAuthUrl?: string;
}
