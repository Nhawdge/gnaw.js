import { Helpers } from "./helpers";
import { projectConfig, ConfigFile, rl } from './index';

const fs = require('fs');

export class TaskNew {
    static NewProject() {

        if (!Helpers.FileExists(projectConfig.configFile)) {
            Helpers.CreateEmptyFile(projectConfig.configFile);
            fs.writeFileSync(projectConfig.configFile, JSON.stringify(TaskNew.EmptyConfig))
        }
        let projConfig = fs.readFileSync(projectConfig.configFile);
        console.log("Has File")
        let projJson = JSON.parse(projConfig) as ConfigFile;

        var components = projJson.components;
        if (components) {
            console.warn("No components Defined -- type `gnaw new component [name]`")
        }
        Helpers.EnsureDir(projJson.outdir)
    }

    static Component(name: string) {

        var config = Helpers.GetProjectConfig();

        var filePath = `${config.parentDir}templates`
        Helpers.EnsureDir(filePath);

        filePath += "/" + name + ".html";

        console.log(filePath);
        config.components.push(name);
        Helpers.SaveProjectConfig(config);
        Helpers.CreateEmptyFile(filePath);

    }

    static Template(name: string) {
        var config = Helpers.GetProjectConfig();

        var filePath = `${config.parentDir}templates`;
        Helpers.EnsureDir(filePath);
        filePath += "/" + name + ".html";

        console.log(filePath);
        config.templates.push(name);
        Helpers.SaveProjectConfig(config);
        Helpers.CreateEmptyFile(filePath);
    }

    static Page(name: string, template?: string) {
        var config = Helpers.GetProjectConfig();

        if (!template) {
            rl.question(`Templates Available: \n ${config.templates}\nNew Page from Template?\n`,
                (templateName: string) => {
                    TaskNew.Page(name, templateName);
                });
        }
        else {
            Helpers.EnsureDir(`${config.parentDir}templates/`);

            var FromfilePath = `${config.parentDir}templates/${template}.html`;
            var ToFilePath = `${config.parentDir}/${name}.html`;

            config.pages.push(name);
            Helpers.SaveProjectConfig(config);

            if (template) {
                fs.copyFileSync(FromfilePath, ToFilePath);
            }
            else {
                Helpers.CreateEmptyFile(ToFilePath);
            }
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
