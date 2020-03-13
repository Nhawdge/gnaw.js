#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

import { Helpers } from "./helpers";
import { cpus } from "os";

function main() {

    var arg = process.argv[2];

    //gnaw new component  [name]
    switch (arg) {
        case "new":
            newSite();
            if (process.argv[3] && process.argv[3] == "component")
                newComponent(process.argv[4]);
            break;
        default:
            buildSite();
            break;
    }
}

main()

function buildSite() {
    let packageJsonFile = fs.readFileSync('package.json');
    let packageJson = JSON.parse(packageJsonFile);

    if (!packageJson)
        throw "Missing `package.json` -- Run `npm init`";
    if (!packageJson.main)
        throw "No entry point configured";

    // var entry = fs.readFileSync(packageJson.main);

    var components = packageJson.gnaw ? packageJson.gnaw.components as Array<string> : null;
    if (!components) {
        console.warn("No components Defined -- type `gnaw new component [name]`")
    }

    Helpers.ensureDocsDir();

    var rd = readline.createInterface({
        input: fs.createReadStream(packageJson.main),
        console: false
    });

    fs.writeFileSync('./docs/index.html', '');

    rd.on('line', function (line: string) {
        if (components) {
            var cleanLine = line.match(/gnaw-(\w*)\b/i);
            if (cleanLine && components.includes(cleanLine.length > 1 ? cleanLine[1] : "")) {
                var component = "./components/" + cleanLine[1] + ".html"
                let componentHtml = fs.readFileSync(component);

                fs.appendFileSync("./docs/index.html", componentHtml);
            }
            else {

                fs.appendFileSync("./docs/index.html", line);
            }

        }
    });
}

function newSite() {
    let packageJsonFile = fs.readFileSync('package.json');
    let packageJson = JSON.parse(packageJsonFile);


    if (!packageJson)
        throw "Missing `package.json` -- Run `npm init`";
    if (!packageJson.main)
        throw "No entry point configured";

    var entry = fs.readFileSync(packageJson.main);
    if (!entry) {
        console.log("Creating new entry point");
        fs.closeSync(fs.openSync(entry, 'w'));
    }
    var components = packageJson.gnaw.components
    if (components) {
        console.warn("No components Defined -- type `gnaw new component [name]`")
    }

    Helpers.ensureDocsDir();


}

function newComponent(name?: string) {
    Helpers.ensureComponentsDir();

    if (name) {
        Helpers.createEmptyFile("./components/" + name + ".html");
        updatePackageJson(name);

    }
    else {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('New component name? ', (name: string) => {
            Helpers.createEmptyFile("./components/" + name + ".html");
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

