const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');


// let link = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-new-zealand-final-1144530/full-scorecard";

function getMatch(link){
    request(link, cb);
}

function cb(error, response, html){
    if( error == null && response.statusCode === 200){
        parseData(html);
    }else if(response.statusCode === 400){
        console.log(chalk.red("Page Not Found!"));
    }else{
        console.log(chalk.red("Error : ",error));
    }
}

function parseData(html){
    let ch = cheerio.load(html);

    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // let teamsName = ch(".card.content-block.match-scorecard-table .Collapsible h5");
    // console.log(bothInnings.length);
    
    for(let i=0;i<bothInnings.length;i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName); 
        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr")
        for(let j=0;j<allTrs.length;j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length>1){
                let batsman = ch(allTds[0]).find("a").text();
                let runs = ch(allTds[2]).text();
                let balls = ch(allTds[3]).text();
                let fours = ch(allTds[5]).text();
                let sixes = ch(allTds[6]).text();
                let strikeRates = ch(allTds[7]).text();

                console.log(`Batsman = ${batsman} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRates}`);
            }
        }
      
    }
    console.log("*************************************************************************************************************************************");
    // fs.writeFileSync("./F_bothMatch.html", ch(bothInnings[0]).html);
    // fs.writeFileSync("./S_bothMatch.html", bothInnings[1]);
}

module.exports = getMatch;