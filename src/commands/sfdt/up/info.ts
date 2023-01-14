/*
 * Copyright (c) 2022, ubyfish
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import { getPackageInfo, Package2Info,getDevHubDependecies } from "../../../helpers/package";
import { logTable } from "../../../renderer/table";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdt', 'up.info');

export default class Info extends SfdxCommand {
  
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: 'n',
      description: messages.getMessage('nameFlagDescription'),required: false
    }),
    versionnumber: flags.string({
      char: 'm',
      description: messages.getMessage('versionNumberFlagDescription')
    }),
    allbetas: flags.boolean({
      char: 'b',
      description: messages.getMessage('allBetasFlagDescription')
    }),
    orgdeps: flags.boolean({
      char: 'o',
      description: messages.getMessage('orgDepFlagDescription')
    }),          
    versionid: flags.string({
      char: 'i', 
      description: messages.getMessage('versionIdByFlagDescription')})
  };

  //protected static supportsDevhubUsername = true;
  protected static requiresDevhubUsername = true;

  protected static requiresProject = false;

  public async run(): Promise<Package2Info[]> {
    //const name = (this.flags.name || 'world') as string;

    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.hubOrg.getConnection();
    const pkgVersionid = this.flags.versionid;
    const orgDeps = this.flags.orgdeps;
    let pkgname = '';
    let pkgVersionNumber = '';
    let vers = [];
    let allBetaVersions: boolean = false;
    let progressMsg = '';
    if (pkgVersionid != null) {
      progressMsg+='fetching with pacakge Id: ' + pkgVersionid;
    }else{
      pkgname = this.flags.name;
      pkgVersionNumber = this.flags.versionnumber;
      vers = pkgVersionNumber.split('.');
      allBetaVersions = this.flags.allbetas;
      //console.log('allBetaVersions='+allBetaVersions);
      this.validateVersionNumber(pkgname, vers);
      progressMsg = 'fetching with package name : ' + pkgname + ' and version: ' + pkgVersionNumber;
      if(allBetaVersions){
        progressMsg+='. will fetch all beta versions';
      }
      this.ux.startSpinner(progressMsg);

    }
    

    


    let result = await getPackageInfo(conn,pkgname,pkgVersionNumber,pkgVersionid,allBetaVersions);
    //console.log(result);
    if (!result || result.length <= 0) {
      throw new SfError(messages.getMessage('errorNoOrgResults', [pkgname,pkgVersionNumber]));
    }
    this.ux.stopSpinner();
    
    
    //const latestPkg = result[0];
    let fields = ['SubscriberPackageVersionId','PackageVersionNumber','CodeCoverage','Tag','IsReleased','CreatedDate','ValidationSkipped'];
    this.ux.log('Version info');
    logTable(result,fields);
    if (orgDeps != null) {
      this.ux.log('Fetching Dependencies for : ' + result[0].PackageVersionNumber);
      let depResults = await getDevHubDependecies(conn,result[0].SubscriberPackageVersionId);
      if (!depResults || depResults.length <= 0) {
        throw new SfError(messages.getMessage('errorNoOrgResults', [pkgname,pkgVersionNumber]));
      }
      let pkgDepDetails = [];
      for (const pkg of depResults) {
        //console.log(pkg.SubscriberPackageVersionId);
        let depresult = await getPackageInfo(conn,null,null,pkg.SubscriberPackageVersionId,false);
        pkgDepDetails.push(...depresult);
        
      }
      this.ux.log('Dependencies');
      let depfields = ['Name','SubscriberPackageVersionId','PackageVersionNumber','CodeCoverage','IsReleased','CreatedDate'];
      logTable(pkgDepDetails,depfields);
    }    
    return result;
  }

  private validateVersionNumber(packageName, versionParts) {
    if (!(versionParts.length > 1)) {
        throw new SfError(
            `Invalid dependency version number ${versionParts.join(
                '.'
            )} for package ${packageName}. Valid format is 1.0.0.1 (or) 1.0.0.LATEST`
        );
    } else if (versionParts.length === 4 && versionParts[3] === 'NEXT') {
        throw new SfError(
            `Invalid dependency version number ${versionParts.join(
                '.'
            )} for package ${packageName}, NEXT is not allowed. Valid format is 1.0.0.1 (or) 1.0.0.LATEST`
        );
    }
}


}
