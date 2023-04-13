  
  [![NPM](https://img.shields.io/npm/v/sfdt.svg)](https://www.npmjs.com/package/sfdt) ![npm (tag)](https://img.shields.io/npm/v/sfdt/beta)

  <!-- toc -->
* [sfdt](#sfdt)
* [Setup](#setup)
* [Examples](#examples)
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->

# sfdt

salesforce devops tools - for working with salesforce unlocked packages via sfdx cli

## install
```
  sfdx plugins:install sfdt
```

# Setup
```
  yarn build

  yarn prepack

  sfdx plugins link
```
# Examples
```
  sfdx sfdt:up:info -v devhub -n sf-core -m 1.1.0.1 -b

  sfdx sfdt:release:report -v devhub -u sandbox1 --releaseplan ./examples/releasePlan.json

  sfdx sfdt:scratchorg:create -v devhub --email --numberofdays 1 --orgalias test1 -c ./examples/project-scratch-def.json --adminemail ubyfish@example.com --json

  sfdx sfdt:project:info -v devhub -u sandbox1

  sfdx sfdt:up:version:latest -v devhub -n sf-sales -s
```

<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdt
$ sfdx COMMAND
running command...
$ sfdx (--version)
sfdt/0.0.1 darwin-x64 node-v18.12.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx sfdt:project:info [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdtprojectinfo--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdt:release:report [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdtreleasereport--r-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdt:scratchorg:create [-e] [-x <string>] [-d <number>] [-a <string>] [-c <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdtscratchorgcreate--e--x-string--d-number--a-string--c-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdt:up:info [-n <string>] [-m <string>] [-b] [-o] [-i <string>] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdtupinfo--n-string--m-string--b--o--i-string--v-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdt:up:installed [-e -n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdtupinstalled--e--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdt:up:version:latest -n <string> [-r] [-s] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdtupversionlatest--n-string--r--s--v-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfdt:project:info [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows you to check / fetch info about the packages in a project and what version info is in the target org

```
USAGE
  $ sfdx sfdt:project:info [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Allows you to check / fetch info about the packages in a project and what version info is in the target org

EXAMPLES
  sfdt:project:info --targetdevhubusername devhub@org.com --targetusername QA1
```

_See code: [src/commands/sfdt/project/info.ts](https://github.com/ubyfish/sfdt/blob/v0.0.1/src/commands/sfdt/project/info.ts)_

## `sfdx sfdt:release:report [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generate some report info from a releasePlan.json definition. If you supply targetusername, the report checks if the release packages are installed in the target org

```
USAGE
  $ sfdx sfdt:release:report [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -r, --releaseplan=<value>                                                         The location of a valid
                                                                                    releasePlan.json (see example for
                                                                                    format). It not supplied, it looks
                                                                                    for it in the running directory
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Generate some report info from a releasePlan.json definition. If you supply targetusername, the report checks if the
  release packages are installed in the target org

EXAMPLES
  sfdt:release:report --targetdevhubusername PROD --targetusername QA1

  sfdt:release:report --targetdevhubusername PROD --releaseplan ../releasePlan.json
```

_See code: [src/commands/sfdt/release/report.ts](https://github.com/ubyfish/sfdt/blob/v0.0.1/src/commands/sfdt/release/report.ts)_

## `sfdx sfdt:scratchorg:create [-e] [-x <string>] [-d <number>] [-a <string>] [-c <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create new scratch org, assigning admin email and issuing login and email with developer credentials

```
USAGE
  $ sfdx sfdt:scratchorg:create [-e] [-x <string>] [-d <number>] [-a <string>] [-c <string>] [-v <string>] [-u <string>]
    [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --orgalias=<value>                                                            Usful if running locally - the org
                                                                                    alias
  -c, --configpath=<value>                                                          Scratch Org Definition file Path -
                                                                                    defaults to ./config/scratch-org-con
                                                                                    fig/project-scratch-def.json
  -d, --numberofdays=<value>                                                        number of days to keep the org
                                                                                    (defaults to 5)
  -e, --email                                                                       Issue an Email with new org info to
                                                                                    the adminemail user
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  -x, --adminemail=<value>                                                          Email address to set as admin -
                                                                                    otherwise derived from the devHub
                                                                                    user email
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Create new scratch org, assigning admin email and issuing login and email with developer credentials

EXAMPLES
  sfdt:scratchorg:create --targetdevhubusername devhub@org.com

  sfdt:scratchorg:create --targetdevhubusername devhub@org.com --email --numberofdays 1 --orgalias so1 --configpath=./config/project-scratch-def.json

  sfdt:scratchorg:create --targetdevhubusername devhub@org.com --email --adminemail ubyadmin@example.com --numberofdays 1 --orgalias so1 --configpath=./config/project-scratch-def.json
```

_See code: [src/commands/sfdt/scratchorg/create.ts](https://github.com/ubyfish/sfdt/blob/v0.0.1/src/commands/sfdt/scratchorg/create.ts)_

## `sfdx sfdt:up:info [-n <string>] [-m <string>] [-b] [-o] [-i <string>] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Get the unlocked package info but id, version or the list of beta versions

```
USAGE
  $ sfdx sfdt:up:info [-n <string>] [-m <string>] [-b] [-o] [-i <string>] [-v <string>] [--apiversion <string>]
    [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --allbetas                                                                    based on symantic versioing, when
                                                                                    supplied all beta versions will be
                                                                                    returned for the supplied version -
                                                                                    e.g. 1.1.0.1,1.1.0.2,1.1.0.2
  -i, --versionid=<value>                                                           package version id 04t....
  -m, --versionnumber=<value>                                                       pacakge version number e.g. 1.1.1.1
  -n, --name=<value>                                                                name of the package
  -o, --orgdeps                                                                     show the dev hub dependency versions
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Get the unlocked package info but id, version or the list of beta versions

EXAMPLES
  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com --versionnumber 1.28.0.1

  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com -m 1.28.0.1 -o

  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com --versionId 04txxxxxxxxxxx

  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com -m 1.28.0.1 -b
```

_See code: [src/commands/sfdt/up/info.ts](https://github.com/ubyfish/sfdt/blob/v0.0.1/src/commands/sfdt/up/info.ts)_

## `sfdx sfdt:up:installed [-e -n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Table view of installed packages in an org. Can be filtered by supplied name

```
USAGE
  $ sfdx sfdt:up:installed [-e -n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -e, --exactmatch                                                                  exactly match the mame supplied
  -n, --name=<value>                                                                name (or partial name) to filter
                                                                                    resulsts by
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Table view of installed packages in an org. Can be filtered by supplied name

EXAMPLES
  sfdt:up:installed --targetusername devhub@org.com

  sfdt:up:installed --name sf-core --targetusername devhub@org.com

  sfdt:up:installed --name sf-core --exactmatch --targetusername devhub@org.com
```

_See code: [src/commands/sfdt/up/installed.ts](https://github.com/ubyfish/sfdt/blob/v0.0.1/src/commands/sfdt/up/installed.ts)_

## `sfdx sfdt:up:version:latest -n <string> [-r] [-s] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Get the latest unlocked package version info

```
USAGE
  $ sfdx sfdt:up:version:latest -n <string> [-r] [-s] [-v <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -n, --name=<value>                                                                (required) Name of the package
  -r, --released                                                                    Filter and show Promoted/Relased
                                                                                    packaged only
  -s, --showversions                                                                Verbosly shows the package versions
                                                                                    in order retrieved
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Get the latest unlocked package version info

EXAMPLES
  sfdt:up:version:latest --name sf-core --targetdevhubusername devhub@org.com

  sfdt:up:version:latest --name sf-core --targetdevhubusername devhub@org.com

  sfdt:up:version:latest --name sf-core --targetdevhubusername devhub@org.com --showversions
```

_See code: [src/commands/sfdt/up/version/latest.ts](https://github.com/ubyfish/sfdt/blob/v0.0.1/src/commands/sfdt/up/version/latest.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
