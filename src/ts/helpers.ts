
const fs = require('fs');
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

}