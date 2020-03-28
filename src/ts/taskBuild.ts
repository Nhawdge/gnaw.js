import { Helpers } from "./helpers";

const fs = require('fs');
const readline = require('readline');

export class Build {
    static buildSite() {
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

        Helpers.EnsureDocsDir();

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

}
