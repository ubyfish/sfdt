"use strict";
/*
 * Copyright (c) 2022, ubyfish
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 * ------------------------------------------------------------------------------------------------------------
 * model interface and helper methods for packaging
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRelaseJSON = void 0;
const fs = require("fs-extra");
const package_1 = require("./package");
async function readRelaseJSON(devHubCon, planFile, targetOrg) {
    let releasePlanJSON;
    try {
        releasePlanJSON = JSON.parse(await fs.readFileSync(planFile, 'utf-8'));
    }
    catch (e) {
        throw new Error(`Cannot read releasePlan : ${planFile}`);
    }
    console.log(releasePlanJSON.releaseName);
    await hydrate(devHubCon, releasePlanJSON.packages);
    if (targetOrg) {
        await checkOrg(targetOrg, releasePlanJSON.packages);
    }
    return releasePlanJSON;
}
exports.readRelaseJSON = readRelaseJSON;
async function hydrate(conn, entries) {
    for (const pkg of entries) {
        let result = await (0, package_1.getPackageInfo)(conn, pkg.name, pkg.version, null, false);
        if (!result || result.length <= 0) {
            throw new Error(`no pacakge found for ${pkg.name} and version ${pkg.version}`);
        }
        pkg.detail = result[0];
    }
}
async function checkOrg(targetOrg, entries) {
    for (const pkg of entries) {
        let result = await (0, package_1.getInstalledPackages)(targetOrg.getConnection(), pkg.name);
        if (!result || result.length <= 0) {
            throw new Error(`no pacakge found for ${pkg.name} and version ${pkg.version}`);
        }
        const orgEntry = {};
        orgEntry.orgName = targetOrg.getUsername();
        orgEntry.installedVersion = result[0].PackageVersionNumber;
        if (pkg.detail.SubscriberPackageVersionId == result[0].SubscriberPackageVersionId) {
            orgEntry.installed = true;
        }
        else {
            orgEntry.installed = false;
        }
        pkg.installedInfo = orgEntry;
    }
}
//# sourceMappingURL=release.js.map