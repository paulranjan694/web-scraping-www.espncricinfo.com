const request = require("request");
const chalk = require("chalk");
const cheerio = require("cheerio");

const fs = require("fs");

const getAllMatches = require("./allMatches");


let link = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415";

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
    let ch = cheerio.load(html);
    let aTag = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com"+aTag;
    // console.log(completeLink);

    getAllMatches(completeLink);
}