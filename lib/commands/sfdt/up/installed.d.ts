import { flags, SfdxCommand } from '@salesforce/command';
import { Package2Info } from "../../../helpers/package";
export default class Installed extends SfdxCommand {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
    }[];
    protected static flagsConfig: {
        name: flags.Discriminated<flags.String>;
        exactmatch: flags.Discriminated<flags.Boolean<boolean>>;
    };
    protected static requiresUsername: boolean;
    protected static requiresProject: boolean;
    run(): Promise<Package2Info[]>;
}
