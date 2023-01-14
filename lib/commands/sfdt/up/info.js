"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2022, ubyfish
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const os = require("os");
const command_1 = require("@salesforce/command");
const core_1 = require("@salesforce/core");
const package_1 = require("../../../helpers/package");
const table_1 = require("../../../renderer/table");
// Initialize Messages with the current plugin directory
core_1.Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core_1.Messages.loadMessages('sfdt', 'up.info');
class Info extends command_1.SfdxCommand {
    async run() {
        //const name = (this.flags.name || 'world') as string;
        // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
        const conn = this.hubOrg.getConnection();
        const pkgVersionid = this.flags.versionid;
        const orgDeps = this.flags.orgdeps;
        let pkgname = '';
        let pkgVersionNumber = '';
        let vers = [];
        let allBetaVersions = false;
        let progressMsg = '';
        if (pkgVersionid != null) {
            progressMsg += 'fetching with pacakge Id: ' + pkgVersionid;
        }
        else {
            pkgname = this.flags.name;
            pkgVersionNumber = this.flags.versionnumber;
            vers = pkgVersionNumber.split('.');
            allBetaVersions = this.flags.allbetas;
            //console.log('allBetaVersions='+allBetaVersions);
            this.validateVersionNumber(pkgname, vers);
            progressMsg = 'fetching with package name : ' + pkgname + ' and version: ' + pkgVersionNumber;
            if (allBetaVersions) {
                progressMsg += '. will fetch all beta versions';
            }
            this.ux.startSpinner(progressMsg);
        }
        let result = await (0, package_1.getPackageInfo)(conn, pkgname, pkgVersionNumber, pkgVersionid, allBetaVersions);
        //console.log(result);
        if (!result || result.length <= 0) {
            throw new core_1.SfError(messages.getMessage('errorNoOrgResults', [pkgname, pkgVersionNumber]));
        }
        this.ux.stopSpinner();
        //const latestPkg = result[0];
        let fields = ['SubscriberPackageVersionId', 'PackageVersionNumber', 'CodeCoverage', 'Tag', 'IsReleased', 'CreatedDate', 'ValidationSkipped'];
        this.ux.log('Version info');
        (0, table_1.logTable)(result, fields);
        if (orgDeps != null) {
            this.ux.log('Fetching Dependencies for : ' + result[0].PackageVersionNumber);
            let depResults = await (0, package_1.getDevHubDependecies)(conn, result[0].SubscriberPackageVersionId);
            if (!depResults || depResults.length <= 0) {
                throw new core_1.SfError(messages.getMessage('errorNoOrgResults', [pkgname, pkgVersionNumber]));
            }
            let pkgDepDetails = [];
            for (const pkg of depResults) {
                //console.log(pkg.SubscriberPackageVersionId);
                let depresult = await (0, package_1.getPackageInfo)(conn, null, null, pkg.SubscriberPackageVersionId, false);
                pkgDepDetails.push(...depresult);
            }
            this.ux.log('Dependencies');
            let depfields = ['Name', 'SubscriberPackageVersionId', 'PackageVersionNumber', 'CodeCoverage', 'IsReleased', 'CreatedDate'];
            (0, table_1.logTable)(pkgDepDetails, depfields);
        }
        return result;
    }
    validateVersionNumber(packageName, versionParts) {
        if (!(versionParts.length > 1)) {
            throw new core_1.SfError(`Invalid dependency version number ${versionParts.join('.')} for package ${packageName}. Valid format is 1.0.0.1 (or) 1.0.0.LATEST`);
        }
        else if (versionParts.length === 4 && versionParts[3] === 'NEXT') {
            throw new core_1.SfError(`Invalid dependency version number ${versionParts.join('.')} for package ${packageName}, NEXT is not allowed. Valid format is 1.0.0.1 (or) 1.0.0.LATEST`);
        }
    }
}
exports.default = Info;
Info.description = messages.getMessage('commandDescription');
Info.examples = messages.getMessage('examples').split(os.EOL);
Info.args = [{ name: 'file' }];
Info.flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({
        char: 'n',
        description: messages.getMessage('nameFlagDescription'), required: false
    }),
    versionnumber: command_1.flags.string({
        char: 'm',
        description: messages.getMessage('versionNumberFlagDescription')
    }),
    allbetas: command_1.flags.boolean({
        char: 'b',
        description: messages.getMessage('allBetasFlagDescription')
    }),
    orgdeps: command_1.flags.boolean({
        char: 'o',
        description: messages.getMessage('orgDepFlagDescription')
    }),
    versionid: command_1.flags.string({
        char: 'i',
        description: messages.getMessage('versionIdByFlagDescription')
    })
};
//protected static supportsDevhubUsername = true;
Info.requiresDevhubUsername = true;
Info.requiresProject = false;
//# sourceMappingURL=info.js.map