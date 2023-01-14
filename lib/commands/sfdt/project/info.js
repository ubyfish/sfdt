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
const package_1 = require("../../../helpers/package");
const table_1 = require("../../../renderer/table");
// Initialize Messages with the current plugin directory
core_1.Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core_1.Messages.loadMessages('sfdt', 'project.info');
class PkgInfo extends command_1.SfdxCommand {
    async run() {
        //conts isJsonFormat = this.flags.isJsonFormat
        const projectJson = await this.project.retrieveSfProjectJson();
        const packages = await projectJson.getPackageDirectories();
        let pkgNames = [];
        packages.forEach((record) => {
            if (record.package) {
                this.ux.log('in scope ' + record.package);
                pkgNames.push(record.package);
            }
        });
        let fitleredList = [];
        let installedPkgs = await (0, package_1.getAllInstalledPackages)(this.org.getConnection());
        installedPkgs.forEach((pkg) => {
            let chk = pkg.Name;
            if (pkgNames.includes(chk)) {
                this.ux.log('adding ' + chk);
                fitleredList.push(pkg);
            }
        });
        if (!fitleredList || fitleredList.length <= 0) {
            throw new core_1.SfError(messages.getMessage('errorNoOrgResults', [this.org.getUsername()]));
        }
        let resultList = [];
        for (const pkg of fitleredList) {
            let result = await (0, package_1.getPackageInfo)(this.hubOrg.getConnection(), null, null, pkg.SubscriberPackageVersionId, false);
            if (!result || result.length > 1) {
                throw new core_1.SfError(messages.getMessage('errorManyOrgResults', [this.org.getUsername()]));
            }
            this.ux.log('found package : ' + result[0].Name + ', Tag : ' + result[0].Tag + ', SubscriberPackageVersionId ' + result[0].SubscriberPackageVersionId);
            resultList.push(result[0]);
        }
        let columns = ["Name", "NameSpace", "SubscriberPackageVersionId", "PackageVersionNumber", "isSecurityReviewed", "Tag"];
        let op = (0, table_1.prepareTable)(resultList, columns);
        this.ux.log(op);
        return resultList;
    }
}
exports.default = PkgInfo;
PkgInfo.description = messages.getMessage('commandDescription');
PkgInfo.examples = messages.getMessage('examples').split(os.EOL);
PkgInfo.args = [{ name: 'file' }];
PkgInfo.flagsConfig = {};
PkgInfo.requiresDevhubUsername = true;
PkgInfo.requiresUsername = true;
PkgInfo.requiresProject = true;
//# sourceMappingURL=info.js.map