const request = require("request");
const chalk = require("chalk");

const fs = require("fs");

let link = "https://www.espncricinfo.com/series/icc-world-test-championship-2019-2021-1195334";

request(link, cb);

function cb(error, response, html){
    if(error == null && response.statusCode == 200){
       parseData(html);
    }else if(response.statusCode == 400){
        console.log(chalk.red("Page not found!!"));
    }else{
        console.log(chalk.red("Error : ",error));
    }
}

function parseData(html){
    
}