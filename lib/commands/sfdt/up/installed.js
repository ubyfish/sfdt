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
const messages = core_1.Messages.loadMessages('sfdt', 'up.installed');
class Installed extends command_1.SfdxCommand {
    async run() {
        this.ux.log(`querying installed packages for ${this.org.getUsername()}`);
        const packageName = this.flags.name;
        const exact = this.flags.exactmatch;
        if (packageName) {
            if (exact) {
                this.ux.log(`will filter exactly for ${packageName}`);
            }
            else {
                this.ux.log(`will filter for like ${packageName}`);
            }
        }
        this.ux.startSpinner('processing....');
        let result = await (0, package_1.getInstalledPackages)(this.org.getConnection(), packageName, exact);
        //console.log(result);
        if (!result || result.length <= 0) {
            throw new core_1.SfError(messages.getMessage('errorNoOrgResults', [this.org.getUsername()]));
        }
        this.ux.stopSpinner();
        let columns = ["Name", "NameSpace", "SubscriberPackageVersionId", "PackageVersionNumber", "isSecurityReviewed"];
        let op = (0, table_1.prepareTable)(result, columns);
        this.ux.log(op);
        return result;
    }
}
exports.default = Installed;
Installed.description = messages.getMessage('commandDescription');
Installed.examples = messages.getMessage('examples').split(os.EOL);
Installed.args = [{ name: 'file' }];
Installed.flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({
        char: 'n',
        description: messages.getMessage('nameFlagDescription'), required: false
    }),
    exactmatch: command_1.flags.boolean({
        char: 'e',
        description: messages.getMessage('nameFlagDescription'), required: false,
        dependsOn: ['name'],
    })
};
Installed.requiresUsername = true;
Installed.requiresProject = false;
//# sourceMappingURL=installed.js.map