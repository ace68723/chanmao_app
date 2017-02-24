let getString = (key)=> {
    // let language = Configs.language;
    let languagePackage  = require("./String/en");
    // try {
    //     switch (language) {
    //         case "en":
    //             languagePackage = require("./string/en");
    //             break;
    //         case "in":
    //             languagePackage = require("./string/in");
    //             break;
    //     }
    // }
    // catch (e) { }
    return languagePackage[key];
};
module.exports = key=>getString(key);
