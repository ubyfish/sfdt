"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevHubDependecies = exports.getLatestPackageVersion = exports.getInstalledPackagesCmd = exports.getInstalledPackages = exports.getAllInstalledPackages = exports.updatePackage = exports.getPackageInfo = void 0;
const child_process = require('child_process');
/**
 *
 * @param connection - sfdx connection
 * @param pkgname - e.g. salesforce-global-core
 * @param version - the symantic version e.g. 1.1.0.1
 * @param pkgId - if provided it will just fetch info for the package
 * @param allBetas - if supplied then it will show the list of packages in that group - e.g. 1.1.0.1, 1.1.0.2,1.1.0.3 - otherwise just the specific version
 * @returns
 */
async function getPackageInfo(connection, pkgname, version, pkgId, allBetas) {
    let query = 'SELECT SubscriberPackageVersionId,MajorVersion,MinorVersion,PatchVersion,BuildNumber,Description,Name,Tag,CreatedDate,LastModifiedDate,ValidationSkipped,ReleaseVersion,IsReleased,CodeCoverage,HasPassedCodeCoverageCheck,Package2.Name FROM Package2Version ';
    if (pkgId) {
        query += ` WHERE SubscriberPackageVersionId = \'${pkgId}\'`;
    }
    else {
        const vers = version.split('.');
        if (allBetas) {
            //console.log('allBetas='+allBetas);
            query += ` WHERE Package2.Name = \'${pkgname}\' AND MajorVersion=${vers[0]} and MinorVersion=${vers[1]} and PatchVersion=${vers[2]} ORDER by BuildNumber desc`;
        }
        else {
            query += ` WHERE Package2.Name = \'${pkgname}\' AND MajorVersion=${vers[0]} and MinorVersion=${vers[1]} and PatchVersion=${vers[2]} and BuildNumber=${vers[3]}`;
        }
    }
    let response = await connection.tooling.query(query);
    let pkdDetails = [];
    //map to the interface
    if (response.records && response.records.length > 0) {
        response.records.forEach((record) => {
            const pkg = {};
            pkg.SubscriberPackageVersionId = record.SubscriberPackageVersionId;
            pkg.MajorVersion = record.MajorVersion;
            pkg.MinorVersion = record.MinorVersion;
            pkg.PatchVersion = record.PatchVersion;
            pkg.BuildNumber = record.BuildNumber;
            pkg.CodeCoverage = record.CodeCoverage ? record.CodeCoverage.apexCodeCoveragePercentage : 0;
            pkg.CodeCoverageCheckPassed = record.HasPassedCodeCoverageCheck;
            pkg.PackageVersionNumber = `${record.MajorVersion}.${record.MinorVersion}.${record.PatchVersion}.${record.BuildNumber}`;
            pkg.ValidationSkipped = record.ValidationSkipped;
            pkg.Name = record.Package2.Name;
            pkg.Tag = record.Tag;
            pkg.CreatedDate = record.CreatedDate;
            pkg.LastModifiedDate = record.LastModifiedDate;
            pkg.IsReleased = record.IsReleased;
            pkdDetails.push(pkg);
        });
    }
    return pkdDetails;
}
exports.getPackageInfo = getPackageInfo;
async function updatePackage(pkgId, tag, conn) {
    let getSFDXCommand = `sfdx force:package:version:update -p ${pkgId} -t ${tag} -v ${conn.getUsername()} --json`;
    console.log('update command : ' + getSFDXCommand);
    let result = child_process.execSync(getSFDXCommand, {
        encoding: 'utf8',
    });
    const resultObject = JSON.parse(result);
    console.log('scratchOrg response => ' + JSON.stringify(resultObject));
}
exports.updatePackage = updatePackage;
async function getAllInstalledPackages(conn) {
    let query = 'SELECT MinPackageVersionId,SubscriberPackageId,SubscriberPackageVersionId,SubscriberPackage.Name,SubscriberPackage.NamespacePrefix,SubscriberPackageVersion.IsOrgDependent,SubscriberPackageVersion.Package2ContainerOptions,SubscriberPackageVersion.MajorVersion,SubscriberPackageVersion.MinorVersion,SubscriberPackageVersion.PatchVersion,SubscriberPackageVersion.BuildNumber,SubscriberPackageVersion.IsSecurityReviewed FROM InstalledSubscriberPackage';
    let response = await conn.tooling.query(query);
    let pkdDetails = [];
    response.records.forEach((record) => {
        const pkg = {};
        pkg.SubscriberPackageVersionId = record.SubscriberPackageVersionId;
        pkg.MajorVersion = record.SubscriberPackageVersion.MajorVersion;
        pkg.MinorVersion = record.SubscriberPackageVersion.MinorVersion;
        pkg.PatchVersion = record.SubscriberPackageVersion.PatchVersion;
        pkg.BuildNumber = record.SubscriberPackageVersion.BuildNumber;
        pkg.PackageVersionNumber = `${record.SubscriberPackageVersion.MajorVersion}.${record.SubscriberPackageVersion.MinorVersion}.${record.SubscriberPackageVersion.PatchVersion}.${record.SubscriberPackageVersion.BuildNumber}`;
        pkg.Name = record.SubscriberPackage.Name;
        pkg.NameSpace = record.SubscriberPackage.NamespacePrefix;
        //pkg.Tag = record.SubscriberPackage.Tag;
        pkg.isOrgDependent = record.SubscriberPackageVersion.IsOrgDependent;
        pkg.isSecurityReviewed = record.SubscriberPackageVersion.IsSecurityReviewed;
        pkdDetails.push(pkg);
    });
    return pkdDetails;
}
exports.getAllInstalledPackages = getAllInstalledPackages;
async function getInstalledPackages(conn, filterPkgName, exactMatch) {
    let query = 'SELECT MinPackageVersionId,SubscriberPackageId,SubscriberPackageVersionId,SubscriberPackage.Name,SubscriberPackage.NamespacePrefix,SubscriberPackageVersion.IsOrgDependent,SubscriberPackageVersion.Package2ContainerOptions,SubscriberPackageVersion.MajorVersion,SubscriberPackageVersion.MinorVersion,SubscriberPackageVersion.PatchVersion,SubscriberPackageVersion.BuildNumber,SubscriberPackageVersion.IsSecurityReviewed FROM InstalledSubscriberPackage';
    let response = await conn.tooling.query(query);
    let pkdDetails = [];
    //map to the interface
    if (response.records && response.records.length > 0) {
        let filtered;
        if (filterPkgName) {
            filtered = response.records.filter((obj) => {
                let chk = obj.SubscriberPackage.Name;
                if (exactMatch) {
                    return obj.SubscriberPackage.Name === filterPkgName;
                }
                else {
                    return chk.includes(filterPkgName);
                }
            });
        }
        else {
            filtered = response.records;
        }
        filtered.forEach((record) => {
            const pkg = {};
            pkg.SubscriberPackageVersionId = record.SubscriberPackageVersionId;
            pkg.MajorVersion = record.SubscriberPackageVersion.MajorVersion;
            pkg.MinorVersion = record.SubscriberPackageVersion.MinorVersion;
            pkg.PatchVersion = record.SubscriberPackageVersion.PatchVersion;
            pkg.BuildNumber = record.SubscriberPackageVersion.BuildNumber;
            pkg.PackageVersionNumber = `${record.SubscriberPackageVersion.MajorVersion}.${record.SubscriberPackageVersion.MinorVersion}.${record.SubscriberPackageVersion.PatchVersion}.${record.SubscriberPackageVersion.BuildNumber}`;
            pkg.Name = record.SubscriberPackage.Name;
            pkg.NameSpace = record.SubscriberPackage.NamespacePrefix;
            //pkg.Tag = record.SubscriberPackage.Tag;
            pkg.isOrgDependent = record.SubscriberPackageVersion.IsOrgDependent;
            pkg.isSecurityReviewed = record.SubscriberPackageVersion.IsSecurityReviewed;
            pkdDetails.push(pkg);
        });
    }
    return pkdDetails;
}
exports.getInstalledPackages = getInstalledPackages;
//DEFUNCT use other method
async function getInstalledPackagesCmd(orgName, filterPkgName) {
    const orgUserName = orgName.getUsername();
    const installedPkgCmd = `sfdx force:package:installed:list -u ${orgUserName} --json`;
    let result = child_process.execSync(installedPkgCmd, {
        encoding: 'utf8',
    });
    const resultObject = JSON.parse(result);
    //console.log('installed pkg response => ' + JSON.stringify(resultObject));
    let pkdDetails = [];
    if (resultObject.status != 0) {
        throw new Error(`Failed to get installed pacakge infor. Error : ${resultObject.message}`);
    }
    //map to the interface
    if (resultObject.result && resultObject.result.length > 0) {
        if (filterPkgName) {
            result = resultObject.result.filter((obj) => {
                return String(obj.SubscriberPackage.Name).includes(filterPkgName);
                //return obj.SubscriberPackageName === filterPkgName;
            });
        }
        else {
            result = resultObject.result;
        }
        result.forEach((record) => {
            const pkg = {};
            pkg.SubscriberPackageVersionId = record.SubscriberPackageVersionId;
            pkg.PackageVersionNumber = record.SubscriberPackageVersionNumber;
            //pkg.PackageVersionNumber = record.SubscriberPackageVersionName;
            pkg.Name = record.SubscriberPackageName;
            pkg.NameSpace = record.SubscriberPackageNamespace;
            pkdDetails.push(pkg);
        });
    }
    return pkdDetails;
}
exports.getInstalledPackagesCmd = getInstalledPackagesCmd;
async function getLatestPackageVersion(connection, pkgname, releasedOnly) {
    let query = `SELECT Package2Id,SubscriberPackageVersionId,MajorVersion,MinorVersion,PatchVersion,BuildNumber,Description,Name,Tag,CreatedDate,LastModifiedDate,ValidationSkipped,ReleaseVersion,IsReleased,CodeCoverage,HasPassedCodeCoverageCheck,Package2.Name FROM Package2Version WHERE Package2.Name = \'${pkgname}\'`;
    if (releasedOnly) {
        query += ' AND IsReleased = true ';
    }
    query += 'ORDER By CreatedDate DESC';
    let response = await connection.tooling.query(query);
    let pkdDetails = [];
    //map to the interface
    if (response.records && response.records.length > 0) {
        response.records.forEach((record) => {
            const pkg = {};
            pkg.SubscriberPackageVersionId = record.SubscriberPackageVersionId;
            pkg.MajorVersion = record.MajorVersion;
            pkg.MinorVersion = record.MinorVersion;
            pkg.PatchVersion = record.PatchVersion;
            pkg.BuildNumber = record.BuildNumber;
            pkg.CodeCoverage = record.CodeCoverage ? record.CodeCoverage.apexCodeCoveragePercentage : 0;
            pkg.CodeCoverageCheckPassed = record.HasPassedCodeCoverageCheck;
            pkg.PackageVersionNumber = `${record.MajorVersion}.${record.MinorVersion}.${record.PatchVersion}.${record.BuildNumber}`;
            pkg.ValidationSkipped = record.ValidationSkipped;
            pkg.Name = record.Package2.Name;
            pkg.Tag = record.Tag;
            pkg.Package2Id = record.Package2Id;
            pkg.LastModifiedDate = record.LastModifiedDate;
            pkg.CreatedDate = record.CreatedDate;
            pkg.IsReleased = record.IsReleased;
            pkdDetails.push(pkg);
        });
    }
    return pkdDetails;
}
exports.getLatestPackageVersion = getLatestPackageVersion;
async function getDevHubDependecies(connection, pkgId) {
    let pkdDetails = [];
    //console.log('getting dependencies for ' + pkgId);
    let query = `SELECT Dependencies,Name FROM SubscriberPackageVersion WHERE Id=\'${pkgId}\'`;
    let response = await connection.tooling.query(query);
    if (response.records && response.records.length > 0) {
        response.records.forEach((record) => {
            for (const dep of record.Dependencies.ids) {
                const pkg = {};
                pkg.SubscriberPackageVersionId = dep.subscriberPackageVersionId;
                pkdDetails.push(pkg);
            }
        });
    }
    return pkdDetails;
}
exports.getDevHubDependecies = getDevHubDependecies;
//# sourceMappingURL=package.js.map