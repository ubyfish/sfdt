import { flags, SfdxCommand } from '@salesforce/command';
import { ReleasePlan } from "../../../helpers/release";
export default class ReleaseReport extends SfdxCommand {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
    }[];
    protected static flagsConfig: {
        releaseplan: flags.Discriminated<flags.String>;
    };
    protected static requiresDevhubUsername: boolean;
    protected static supportsUsername: boolean;
    protected static requiresProject: boolean;
    run(): Promise<ReleasePlan>;
}
