const request = require("request");
const chalk = require("chalk");
const cheerio = require("cheerio");

const fs = require("fs");

function getAllMatches(link){
    request(link, cb);
}



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
    let ch = cheerio.load(html);
    let allATags = ch("a[data-hover=\"Scorecard\"]");
    console.log(allATags.length);

    for(let i=0;i<allATags.length;i++){
        let links = ch(allATags[i]).attr("href");
        let completeLink = "https://www.espncricinfo.com"+ links
        console.log(completeLink);
    }
   
}

module.exports = getAllMatches;