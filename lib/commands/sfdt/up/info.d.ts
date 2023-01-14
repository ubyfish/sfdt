import { flags, SfdxCommand } from '@salesforce/command';
import { Package2Info } from "../../../helpers/package";
export default class Info extends SfdxCommand {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
    }[];
    protected static flagsConfig: {
        name: flags.Discriminated<flags.String>;
        versionnumber: flags.Discriminated<flags.String>;
        allbetas: flags.Discriminated<flags.Boolean<boolean>>;
        orgdeps: flags.Discriminated<flags.Boolean<boolean>>;
        versionid: flags.Discriminated<flags.String>;
    };
    protected static requiresDevhubUsername: boolean;
    protected static requiresProject: boolean;
    run(): Promise<Package2Info[]>;
    private validateVersionNumber;
}
