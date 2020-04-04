import { projectConfig, ConfigFile } from ".";
import { TaskNew } from "./taskNew";

const fs = require('fs') ;
const readline = require('readline');

export class Helpers {
    static EnsureComponentsDir() {
        var dir = "./components";
        Helpers.EnsureDir(dir);
    }

    static EnsureDir(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    static CreateEmptyFile(file: string) {
        fs.closeSync(fs.openSync(file, 'w'));
    }

    static PromptForArg(promptText: string) {
        return promptText
    }

    static FileExists(file: string): boolean {
        return fs.existsSync(file)
    }

    static GetProjectConfig(): ConfigFile {
        if (!Helpers.FileExists(projectConfig.configFile)) {
            Helpers.CreateEmptyFile(projectConfig.configFile);
            fs.writeFileSync(projectConfig.configFile, JSON.stringify(TaskNew.EmptyConfig))
        }
        let projConfig = fs.readFileSync(projectConfig.configFile);
        return JSON.parse(projConfig);
    }

    static SaveProjectConfig(config: ConfigFile): void {
        fs.writeFileSync(projectConfig.configFile, JSON.stringify(config));
    }
}