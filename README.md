## Getting Started

To get started, right after donwloading and unzipping the code, you need to install 
Backendless CodeRunner dependencies. Run the following command from the root directory
of your Backendless CodeRunner project:

`npm i`

Now, it's time to add your custom Backendless Server logic in the generated stubs.

Backendless CodeRunner is powered by Node.js. Your custom server code files are Node.js modules
which can refer to each other and use other third-party dependencies (node modules). If you
downloaded the project from Backendless Console, you will notice it is a standard Node.js project.
Alternatively, you can start developing custom business logic from scratch and maintain the
project as a Node.js project.

You are free to install any npm dependencies you need. Just be aware that with the free tier of
Backendless you are limited to 5 MBytes of the deployment zip (the total size of the deployable
code and all its dependencies. The limit can be increased to 20 MB by purchasing a function pack
from the Backendless Marketplace.

There are no limitations on where to place your .JS files/code. It could be a single file with
multiple event handlers, timers and services placed at `somewhere/where/you/need/it/to/be/placed`
or it might be well-organized structure of files and folder, similar to the one you get after
generating the code/project in Backendless Console.

Make sure you configure your paths of where to find your custom business logic script files
in `coderunner.json`. See the `app/files` configuration section for details. By default,
CodeRunner will search recursively in the `app` folder. Backendless CodeRunner allows an array
of file paths or globbing patterns (via built-in [node-glob](https://github.com/isaacs/node-glob))
to be specified. Patterns are processed in the order they are declared, with the !-prefixed matches
excluding matched files from the result set. The result set does not contain any duplicates.

For example:

```
//You can specify single file
{app: {files: ['foo/this.js'] }}

//Or severall files
{app: {files: ['foo/this.js', 'foo/that.js'] }}

//Or you can generalize with a glob pattern:
{app: {files: ['foo/th*.js'] }}

//All files ending with .js in 'foo' directory and all of its subdirectories
{app: {files: ['foo/**/*.js'] }}

//All files ending with .js in 'foo' directory except for 'bar.js'
{app: { files: [ 'foo/*.js', '!foo/bar.js' ] }}

```

An exclusion pattern is especially useful when you reach the limit of the allowed deployment size.
Then you may tweak your filter patterns to reduce the amount of files being deployed.

After you think you are ready to test your business logic, you can run it in the `debug` mode.
The `debug` mode allows local execution of the event handlers, timers and service while being
connected to the Backendless servers in the cloud. To run the code in the `debug` mode, you can
use a predefined npm script `debug` from package.json. Run the following command to start
CodeRunner in the local debug mode:

```
npm run debug
```

When CodeRunner starts in the `debug` mode, it performs the following:

- loads any your business logic scripts found according to your `app.files` configuration
  option search pattern
- builds your business logic model and registers it in Backendless Cloud. (No actual files
  are deployed to the server in this mode).
- wait for events from Backendless about certain business logic execution
- when an event (task) arrives, it is executed and the results are sent back to the Backendless

In this mode you may use `console` printing to get some debug information or you can attach
your IDE Node.js debugger to be able to use breakpoints and variables inspection in the runtime.

To enable debugging with IDE, instead of using the `npm run debug` command, run the following
script from the Node.js Debug configuration in your IDE.
```
node_modules/.bin/coderunner
```

It is important to make sure the working directory of the started Node.js process is your project directory.


When you are ready to publish your business logic to production, run the following command:

```
npm run deploy
```

The command performs the following actions:
- loads your business logic scripts found according to the `app.files` configuration option search pattern;
- builds your business logic model and registers it in Backendless Cloud in the Production mode;
- generates a zip file containing your business logic scripts and any dependencies;
- deploys the zip to Backendless Cloud;

As a result of successful deployment, you should be able to see your business logic model in Backendless
Console in the `Business Logic` -> `Production` section.

If you receive an error reporting the size of the project is too big to deploy, run the `deploy` task 
with `--keep-zip` parameter, which will generate the `deploy.zip` file in your current working directory. 
You will be able  to investigate what is included and try to add some exclusion filters to the `app.files` 
configuration section.

To pass parameters to scripts executed with the `npm run` a special option `--` should be used to delimit
the scripts arguments:

```
npm run deploy -- --keep-zip
```