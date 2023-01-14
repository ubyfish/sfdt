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
const core_1 = require("@salesforce/core");
//import { getUserInfo } from "./user";
const child_process = require('child_process');
class ScratchOrgUtils {
    static async getScratchOrgLoginURL(hubOrg, username) {
        let conn = hubOrg.getConnection();
        let query = `SELECT Id, SignupUsername, LoginUrl FROM ScratchOrgInfo WHERE SignupUsername = '${username}'`;
        console.log('QUERY:' + query);
        const results = (await conn.query(query));
        console.log(`Login URL Fetched: ${JSON.stringify(results)}`);
        return results.records[0].LoginUrl;
    }
    static async createScratchOrg(adminEmail, config_file_path, durationDays, hubOrg, issueEmail, orgAlias) {
        console.log('Parameters: ' + adminEmail + ' ' + config_file_path + ' ' + durationDays);
        let getSFDXCommand = `sfdx force:org:create -f ${config_file_path} -d ${durationDays} -w 10 -v ${hubOrg.getUsername()}`;
        let orgName;
        if (orgAlias) {
            orgName = orgAlias;
        }
        else {
            orgName = 'SO1';
        }
        getSFDXCommand += ` --setalias=${orgName}`;
        if (adminEmail) {
            getSFDXCommand += ` adminEmail=${adminEmail}`;
        }
        getSFDXCommand += ' --json';
        console.log('created command : ' + getSFDXCommand);
        let result = child_process.execSync(getSFDXCommand, {
            encoding: 'utf8',
        });
        const resultObject = JSON.parse(result);
        console.log('scratchOrg response => ' + JSON.stringify(resultObject));
        //{"status":0,"result":{"orgId":"00D0C00000012BQUAY","username":"test-riroudcml6vt@example.com"}}
        let scratchOrg = {
            alias: orgName,
            orgId: resultObject.result.orgId,
            username: resultObject.result.username,
            signupEmail: adminEmail ? adminEmail : '',
        };
        //Get FrontDoor URL
        scratchOrg.loginURL = await this.getScratchOrgLoginURL(hubOrg, scratchOrg.username);
        //Generate Password
        let passwordCmd = `sfdx force:user:password:generate --targetusername ${scratchOrg.username} -v ${hubOrg.getUsername()} --json`;
        let passresult = child_process.execSync(passwordCmd, {
            encoding: 'utf8',
        });
        const passObject = JSON.parse(passresult);
        scratchOrg.password = passObject.result.password;
        //Get Sfdx Auth URL
        try {
            const authInfo = await core_1.AuthInfo.create({ username: scratchOrg.username });
            scratchOrg.sfdxAuthUrl = authInfo.getSfdxAuthUrl();
        }
        catch (error) {
            console.log(`Unable to fetch authURL for ${scratchOrg.username}. Only Scratch Orgs created from DevHub using authenticated using auth:sfdxurl or auth:web will have access token and enabled for autoLogin`);
        }
        if (!passObject.result.password) {
            throw new Error('Unable to setup password to scratch org');
        }
        else {
            console.log(`Password successfully set for ${scratchOrg.username}`);
        }
        return scratchOrg;
    }
    //from wade / dx@scale approach
    static async shareScratchOrgThroughEmail(emailId, scratchOrg, hubOrg, projectName) {
        let hubOrgUserName = hubOrg.getUsername();
        let body = `${hubOrgUserName} Requested a scratch org for project ${projectName}. Below is the info to login\n
The Login url for this org is : ${scratchOrg.loginURL}\n
Username: ${scratchOrg.username}\n
Password: ${scratchOrg.password}\n
Please use sfdx force:auth:web:login -r ${scratchOrg.loginURL} -a <alias>  command to authenticate against this Scratch org\n
Thanks!`;
        await hubOrg.getConnection().request({
            method: 'POST',
            url: '/services/data/v50.0/actions/standard/emailSimple',
            body: JSON.stringify({
                inputs: [
                    {
                        emailBody: body,
                        emailAddresses: emailId,
                        emailSubject: `${hubOrgUserName} created you a new Scratch Org`,
                        senderType: 'CurrentUser'
                    },
                ],
            }),
        });
        console.log(`Succesfully send email to ${emailId} for ${scratchOrg.username}`);
    }
}
exports.default = ScratchOrgUtils;
//# sourceMappingURL=scratchorg.js.map