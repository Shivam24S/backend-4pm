
// file system core module  which is  
// const fs = require("fs");
import fs from "fs";

fs.writeFileSync("new.txt", "new text added");


const data = fs.readFileSync("new.txt", "utf-8");


console.log("data", data);


// more core modules 

// http




