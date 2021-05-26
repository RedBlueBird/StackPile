const fs = require("fs");
const path = require("path");
const util = require("util");

const dir = path.join(__dirname, "country.json");

let raw = fs.readFileSync(dir);
let country = JSON.parse(raw);

// for (let i = 0; i < country.length; i++){
    // country[i].label = country[i].name;
    // country[i].value = country[i].name;
    // delete country[i].name;
// }

// let data = JSON.stringify(country);
// fs.writeFileSync(dir, data);

console.log(util.inspect(country, {showHidden: false, depth: null, maxArrayLength:null}));