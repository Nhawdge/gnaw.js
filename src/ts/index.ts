#!/usr/bin/env node

import { TaskNew } from './taskNew'
import { TaskBuild } from './taskBuild'
import { Helpers } from './helpers';
export const projectConfig = {
    configFile: "./gnawconfig.json"
};

const fs = require('fs');
const readline = require('readline');

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {

    var args = process.argv.slice(2);
    console.log(args);

    switch (args[0]) {
        case "new":
            HandleNewArgs(args.slice(1));
        default:
            TaskBuild.BuildSite();
            break;
    }
}

function HandleNewArgs(args: string[]) {
    var typeArg = args.length ? args[0].toLowerCase() : "site";
    var nameArg = args.length > 1 ? args[1] : "";


    if (!nameArg) {
        rl.question(`New ${typeArg} name? `, (name: string) => {
            HandleNewArgs([typeArg, name]);
        });
    }
    else {
        if (!args.length || typeArg == "site") {
            TaskNew.NewProject();
        }
        if (typeArg == "component") {
            TaskNew.Component(nameArg)
        }
        if (typeArg == "page") {
            TaskNew.Page(nameArg)
        }
        if (typeArg == "template") {
            TaskNew.Template(nameArg)
        }
    }
}

function HelpScreen() {
    console.log('--- Gnaw.js ---')
    console.log(`build 

new
 site
 component
 page
 template
 
add
 page 
 `)
}

main() 
export interface ConfigFile {
    pages: Array<string>,
    templates: Array<string>,
    components: Array<string>,
    parentDir: string,
    outdir: string
}

