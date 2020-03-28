import { Helpers } from "./helpers";
import { projectConfig } from './index';

const fs = require('fs');
const readline = require('readline');

export class TaskNew {
    static NewProject() {

        if (!Helpers.FileExists(projectConfig.configFile)) {
            Helpers.CreateEmptyFile(projectConfig.configFile);
            fs.writeFileSync(projectConfig.configFile, JSON.stringify(TaskNew.EmptyConfig))

            
        }
        let projConfig = fs.readFileSync(projectConfig.configFile);
        console.log("Has File")
        let projJson = JSON.parse(projConfig) as ConfigFile;

        var components = projJson.components
        if (components) {
            console.warn("No components Defined -- type `gnaw new component [name]`")
        }
        Helpers.EnsureDir(projJson.outdir)
    }

    NewComponent(name?: string) {
        Helpers.EnsureComponentsDir();

        if (name) {
            Helpers.CreateEmptyFile("./components/" + name + ".html");
            updatePackageJson(name);

        }
        else {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('New component name? ', (name: string) => {
                Helpers.CreateEmptyFile("./components/" + name + ".html");
                updatePackageJson(name);


                rl.close();
            });
        }
        function updatePackageJson(name: string) {
            let packageJsonFile = fs.readFileSync('package.json');
            let packageJson = JSON.parse(packageJsonFile);
            packageJson.gnaw.components.push(name);
            fs.writeFileSync("./package.json", JSON.stringify(packageJson));
        }

    }
    static EmptyConfig = {
        pages: [],
        templates: [],
        components: [],
        parentDir: "./src/",
        outdir: "./"
    }
}

interface ConfigFile {
    pages: Array<string>,
    templates: Array<string>,
    components: Array<string>,
    parentDir: string,

    outdir: string
}