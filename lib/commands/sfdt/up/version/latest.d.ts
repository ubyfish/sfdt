import { flags, SfdxCommand } from '@salesforce/command';
import { Package2Info } from "../../../../helpers/package";
export default class Latest extends SfdxCommand {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
    }[];
    protected static flagsConfig: {
        name: flags.Discriminated<flags.String>;
        released: flags.Discriminated<flags.Boolean<boolean>>;
        showversions: flags.Discriminated<flags.Boolean<boolean>>;
    };
    protected static requiresDevhubUsername: boolean;
    protected static requiresProject: boolean;
    run(): Promise<Package2Info>;
}
