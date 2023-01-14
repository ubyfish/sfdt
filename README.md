  <!-- toc -->
* [sfdt](#sfdt)
* [Setup](#setup)
* [Examples](#examples)
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->

# sfdt
salesforce package utils - for working with unlocked packages

## install

  sfdx plugins:install sfdt


# Setup

  yarn build

  yarn prepack

  sfdx plugins link

# Examples

  sfdx sfdt:up:info -v devhub -n sf-core -m 1.1.0.1 -b

  sfdx sfdt:release:report -v devhub -u sandbox1 --releaseplan ./examples/releasePlan.json

  sfdx sfdt:scratchorg:create -v devhub --email --numberofdays 1 --orgalias test1 -c ./examples/project-scratch-def.json --adminemail ubyfish@example.com --json

  sfdx sfdt:project:info -v devhub -u sandbox1

  sfdx sfdt:up:version:latest -v devhub -n sf-sales -s


<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdt
$ sfdx COMMAND
running command...
$ sfdx (--version)
sfdt/0.0.5 darwin-x64 node-v18.12.1
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

Gets the Package information for this project from the target Org. Useful for getting tag information

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
  Gets the Package information for this project from the target Org. Useful for getting tag information

EXAMPLES
  sfdt:project:info --targetdevhubusername devhub@org.com --targetusername QA1
```

_See code: [src/commands/sfdt/project/info.ts](https://github.com/ubyfish/sfdt/blob/v0.0.5/src/commands/sfdt/project/info.ts)_

## `sfdx sfdt:release:report [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generate some report info from a releasePlan.json definition. If you supply targetusername it checks the org if installed

```
USAGE
  $ sfdx sfdt:release:report [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -r, --releaseplan=<value>                                                         supply the location of a valid
                                                                                    releasePlan.json
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
  Generate some report info from a releasePlan.json definition. If you supply targetusername it checks the org if
  installed

EXAMPLES
  sfdt:release:report --targetdevhubusername PROD --targetusername QA1

  sfdt:release:report --targetdevhubusername PROD --releaseplan ../releasePlan.json
```

_See code: [src/commands/sfdt/release/report.ts](https://github.com/ubyfish/sfdt/blob/v0.0.5/src/commands/sfdt/release/report.ts)_

## `sfdx sfdt:scratchorg:create [-e] [-x <string>] [-d <number>] [-a <string>] [-c <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create new scratch org, configures previous or preview and email developer credentials

```
USAGE
  $ sfdx sfdt:scratchorg:create [-e] [-x <string>] [-d <number>] [-a <string>] [-c <string>] [-v <string>] [-u <string>]
    [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --orgalias=<value>                                                            Org alias
  -c, --configpath=<value>                                                          Scratch Org Definition file Path -
                                                                                    defaults to ./config/scratch-org-con
                                                                                    fig/project-scratch-def.json
  -d, --numberofdays=<value>                                                        number of days to keep the org
                                                                                    (defaults to 5)
  -e, --email                                                                       Email credenitals to users
                                                                                    (devhubuser)
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
  Create new scratch org, configures previous or preview and email developer credentials

EXAMPLES
  sfdt:scratchorg:create --targetdevhubusername devhub@org.com

  sfdt:scratchorg:create --targetdevhubusername devhub@org.com --email --numberofdays 1 --orgalias so1 --configpath=./config/project-scratch-def.json
```

_See code: [src/commands/sfdt/scratchorg/create.ts](https://github.com/ubyfish/sfdt/blob/v0.0.5/src/commands/sfdt/scratchorg/create.ts)_

## `sfdx sfdt:up:info [-n <string>] [-m <string>] [-b] [-o] [-i <string>] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Get the latest package version info

```
USAGE
  $ sfdx sfdt:up:info [-n <string>] [-m <string>] [-b] [-o] [-i <string>] [-v <string>] [--apiversion <string>]
    [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --allbetas                                                                    when supplied all beta versions of
                                                                                    the package version will be returned
                                                                                    - e.g. 1.1.0.1,1.1.0.2,1.1.0.2
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
  Get the latest package version info

EXAMPLES
  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com --versionnumber 1.28.0.1

  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com versionId 04txxxxxxxxxxx

  sfdt:up:info --name my-core-pkg --targetdevhubusername devhub@org.com --versionnumber 1.28.0.1 -b
```

_See code: [src/commands/sfdt/up/info.ts](https://github.com/ubyfish/sfdt/blob/v0.0.5/src/commands/sfdt/up/info.ts)_

## `sfdx sfdt:up:installed [-e -n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Table view of installed packages in an org. can be filtered by supplied name

```
USAGE
  $ sfdx sfdt:up:installed [-e -n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -e, --exactmatch                                                                  name of the package
  -n, --name=<value>                                                                name of the package
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Table view of installed packages in an org. can be filtered by supplied name

EXAMPLES
  sfdt:up:installed --targetusername devhub@org.com

  sfdt:up:installed --name my-core-pkg --targetusername devhub@org.com
```

_See code: [src/commands/sfdt/up/installed.ts](https://github.com/ubyfish/sfdt/blob/v0.0.5/src/commands/sfdt/up/installed.ts)_

## `sfdx sfdt:up:version:latest -n <string> [-r] [-s] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Get the latest package version info

```
USAGE
  $ sfdx sfdt:up:version:latest -n <string> [-r] [-s] [-v <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -n, --name=<value>                                                                (required) name of the package
  -r, --released                                                                    relased packaged only
  -s, --showversions                                                                Verbosly shows the versions in order
                                                                                    retrieved
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Get the latest package version info

EXAMPLES
  sfdt:up:version:latest --name my-core-pkg --targetdevhubusername devhub@org.com

  sfdt:up:version:latest --name my-core-pkg --targetdevhubusername devhub@org.com --released
```

_See code: [src/commands/sfdt/up/version/latest.ts](https://github.com/ubyfish/sfdt/blob/v0.0.5/src/commands/sfdt/up/version/latest.ts)_
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
