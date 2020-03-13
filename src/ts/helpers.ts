
const fs = require('fs');
const readline = require('readline');

export class Helpers {
    static ensureComponentsDir() {
        var dir = "./components";
        Helpers.ensureDir(dir);
    }

    static ensureDocsDir() {
        var dir = './docs';
        Helpers.ensureDir(dir);
    }

    static ensureDir(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    static createEmptyFile(file: string) {
        fs.closeSync(fs.openSync(file, 'w'));
    }

}