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
const release_1 = require("../../../helpers/release");
const table_1 = require("../../../renderer/table");
//var colors = require('@colors/colors');
// Initialize Messages with the current plugin directory
core_1.Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core_1.Messages.loadMessages('sfdt', 'releasereport');
class ReleaseReport extends command_1.SfdxCommand {
    async run() {
        let conn = this.hubOrg.getConnection();
        let planFile = this.flags.releaseplan != null ? this.flags.releaseplan : 'releasePlan.json';
        let releasePlan = await (0, release_1.readRelaseJSON)(conn, planFile, this.org);
        if (releasePlan == null) {
            throw new core_1.SfError(messages.getMessage('errorNoOrgResults', [planFile]));
        }
        const summaryReport = {};
        summaryReport.releaseName = releasePlan.releaseName;
        summaryReport.postReleaseRunBook = releasePlan.postReleaseRunBook;
        summaryReport.preReleaseRunBook = releasePlan.preReleaseRunBook;
        summaryReport.plannedReleaseDate = releasePlan.plannedReleaseDate;
        let reportPkgs = [];
        releasePlan.packages.forEach(pkg => {
            const releaseItem = {};
            releaseItem.codeCoverage = pkg.detail.CodeCoverage;
            releaseItem.packageId = pkg.detail.SubscriberPackageVersionId;
            releaseItem.packageName = pkg.name;
            releaseItem.packageVersion = pkg.detail.PackageVersionNumber;
            releaseItem.skippedValidation = pkg.detail.ValidationSkipped;
            releaseItem.installedInTarget = pkg.installedInfo.installed;
            releaseItem.installedVersion = pkg.installedInfo.installedVersion;
            reportPkgs.push(releaseItem);
        });
        let plans = [];
        plans.push(summaryReport);
        let topFields = ['releaseName', 'plannedReleaseDate', 'preReleaseRunBook'];
        (0, table_1.logTable)(plans, topFields);
        let packageFields;
        if (this.org) {
            packageFields = ['packageName', 'packageVersion', 'codeCoverage', 'skippedValidation', 'installedInTarget', 'packageId'];
        }
        else {
            packageFields = ['packageName', 'packageVersion', 'codeCoverage', 'skippedValidation', 'packageId'];
        }
        (0, table_1.logTable)(reportPkgs, packageFields);
        return releasePlan;
    }
}
exports.default = ReleaseReport;
ReleaseReport.description = messages.getMessage('commandDescription');
ReleaseReport.examples = messages.getMessage('examples').split(os.EOL);
ReleaseReport.args = [{ name: 'file' }];
ReleaseReport.flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    releaseplan: command_1.flags.string({
        char: 'r',
        description: messages.getMessage('releaseplanFlagDescription')
    })
};
//protected static supportsDevhubUsername = true;
ReleaseReport.requiresDevhubUsername = true;
ReleaseReport.supportsUsername = true;
ReleaseReport.requiresProject = false;
//# sourceMappingURL=report.js.map