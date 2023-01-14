"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const os = require("os");
const command_1 = require("@salesforce/command");
const core_1 = require("@salesforce/core");
const package_1 = require("../../../../helpers/package");
const table_1 = require("../../../../renderer/table");
// Initialize Messages with the current plugin directory
core_1.Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core_1.Messages.loadMessages('sfdt', 'up.version.latest');
class Latest extends command_1.SfdxCommand {
    async run() {
        //const name = (this.flags.name || 'world') as string;
        // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
        const conn = this.hubOrg.getConnection();
        const pkgname = this.flags.name;
        const shoversions = this.flags.showversions;
        this.ux.log('Fetching Latest package version for : ' + pkgname);
        let result = await (0, package_1.getLatestPackageVersion)(conn, pkgname, this.flags.released);
        //console.log(result);
        if (!result || result.length <= 0) {
            throw new core_1.SfError(messages.getMessage('errorNoOrgResults', [pkgname]));
        }
        let latestPackage = result[0];
        let fields = ['PackageVersionNumber', 'CreatedDate', 'LastModifiedDate', 'SubscriberPackageVersionId', 'CodeCoverage', 'Tag', 'IsReleased'];
        if (shoversions) {
            (0, table_1.logTable)(result, fields);
            this.ux.log('--------------------------------------------------');
        }
        this.ux.log('Latest version : ' + latestPackage.PackageVersionNumber + ', Id = ' + latestPackage.SubscriberPackageVersionId);
        return latestPackage;
    }
}
exports.default = Latest;
Latest.description = messages.getMessage('commandDescription');
Latest.examples = messages.getMessage('examples').split(os.EOL);
Latest.args = [{ name: 'file' }];
Latest.flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({
        char: 'n',
        description: messages.getMessage('nameFlagDescription'), required: true
    }),
    released: command_1.flags.boolean({
        char: 'r',
        description: messages.getMessage('releasedFlagDescription'), required: false
    }),
    showversions: command_1.flags.boolean({
        char: 's',
        description: messages.getMessage('showVersionsFlagDescription'), required: false
    })
    // orderby: flags.string({
    //   char: 'o', 
    //   description: messages.getMessage('orderByFlagDescription'), 
    //   options: ['Version','CreatedDate'], default: 'CreatedDate', required: false})
};
Latest.requiresDevhubUsername = true;
Latest.requiresProject = false;
//# sourceMappingURL=latest.js.map