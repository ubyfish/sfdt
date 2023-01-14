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
const scratchorg_1 = require("../../../helpers/scratchorg");
const user_1 = require("../../../helpers/user");
// Initialize Messages with the current plugin directory
core_1.Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core_1.Messages.loadMessages('sfdt', 'scratchorg.create');
class NewScratch extends command_1.SfdxCommand {
    //protected static requiresUsername = true;
    async run() {
        const sendEmail = this.flags.email;
        let adminEmail = this.flags.adminemail;
        let durationDays = this.flags.numberofdays;
        const orgAlias = this.flags.orgalias;
        let configPath = this.flags.configpath;
        const devhubUserName = this.hubOrg.getUsername();
        if (adminEmail == null) {
            let userInfo = await (0, user_1.getUserInfo)(this.hubOrg.getConnection(), devhubUserName);
            adminEmail = userInfo.emailAddress;
        }
        console.log('devHubUser : ' + devhubUserName + ', userInfo -> ' + adminEmail);
        const defaultPkg = await this.project.getDefaultPackage();
        console.log('defaultPkg => ' + defaultPkg.package);
        if (durationDays == null) {
            durationDays = 5;
        }
        if (configPath == null) {
            configPath = './config/scratch-org-config/project-scratch-def.json';
        }
        let scratchOrg = await scratchorg_1.default.createScratchOrg(adminEmail, configPath, durationDays, this.hubOrg, sendEmail, orgAlias);
        //--TESTING--
        // let scratchOrg: ScratchOrg = {
        //     "alias": "pin3",
        //     "orgId": "00D0C0000001PFqUAM",
        //     "username": "test-tvczwuobaqzv@example.com",
        //     "signupEmail": "test-example@yoyo.com",
        //     "loginURL": "https://power-customization-1604-dev-ed.my.salesforce.com/",
        //     "password": "&T9ztdkbumzsj",
        //     "sfdxAuthUrl": "force://PlatformCLI::5Aep861fPbvNTL_1vvx1uRJzz11bxIA3MMY4Tn_sIkkC8wfm8dpix6Uj1f2kjF_VMOa0E5IONtijqjShz_n84KJ@power-customization-1604-dev-ed.my.salesforce.com"
        // };
        if (sendEmail) {
            //--TESTING--
            //ScratchOrgUtils.shareScratchOrgThroughEmail('test-example@yoyo.com',scratchOrg,this.hubOrg,defaultPkg.name);
            scratchorg_1.default.shareScratchOrgThroughEmail(adminEmail, scratchOrg, this.hubOrg, defaultPkg.name);
        }
        return scratchOrg;
    }
}
exports.default = NewScratch;
NewScratch.description = messages.getMessage('commandDescription');
NewScratch.examples = messages.getMessage('examples').split(os.EOL);
NewScratch.args = [{ name: 'file' }];
NewScratch.flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    email: command_1.flags.boolean({
        char: 'e',
        description: messages.getMessage('emailFlagDescription')
    }),
    adminemail: command_1.flags.string({
        char: 'x',
        description: messages.getMessage('adminEmailFlagDescription')
    }),
    numberofdays: command_1.flags.number({
        char: 'd',
        description: messages.getMessage('numberOfDaysFlagDescription')
    }),
    orgalias: command_1.flags.string({
        char: 'a',
        description: messages.getMessage('orgAliasFlagDescription')
    }),
    configpath: command_1.flags.string({
        char: 'c',
        description: messages.getMessage('configFlagDescription')
    })
};
//protected static supportsDevhubUsername = true;
NewScratch.requiresDevhubUsername = true;
NewScratch.requiresProject = true;
NewScratch.supportsUsername = true;
//# sourceMappingURL=create.js.map