import { flags, SfdxCommand } from '@salesforce/command';
import { ScratchOrg } from "../../../helpers/scratchorg";
export default class NewScratch extends SfdxCommand {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
    }[];
    protected static flagsConfig: {
        email: flags.Discriminated<flags.Boolean<boolean>>;
        adminemail: flags.Discriminated<flags.String>;
        numberofdays: flags.Discriminated<flags.Number>;
        orgalias: flags.Discriminated<flags.String>;
        configpath: flags.Discriminated<flags.String>;
    };
    protected static requiresDevhubUsername: boolean;
    protected static requiresProject: boolean;
    protected static supportsUsername: boolean;
    run(): Promise<ScratchOrg>;
}
