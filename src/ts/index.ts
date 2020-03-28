#!/usr/bin/env node

import {TaskNew } from './taskNew'
export const projectConfig = {
    configFile: "./gnawconfig.json"
};
 

function main() {

    var arg = process.argv[2];

    TaskNew.NewProject();

    // switch (arg) {
    //     case "new":
    //         newSite();
    //         if (process.argv[3] && process.argv[3] == "component")
    //             newComponent(process.argv[4]);
    //         break;
    //     default:
    //         buildSite();
    //         break;
    // }
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
 
