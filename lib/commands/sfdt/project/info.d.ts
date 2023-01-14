import { SfdxCommand } from '@salesforce/command';
import { Package2Info } from "../../../helpers/package";
export default class PkgInfo extends SfdxCommand {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
    }[];
    protected static flagsConfig: {};
    protected static requiresDevhubUsername: boolean;
    protected static requiresUsername: boolean;
    protected static requiresProject: boolean;
    run(): Promise<Package2Info[]>;
}
