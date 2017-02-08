module.exports = function(age)
{
if(!age) {
  throw Error('Not a number');
}
if(typeof age !== 'number') {
    throw Error('Not a number');
}
  else {
let log4js = require('log4js');
let logger = log4js.getLogger();
const readline = require('readline');
const fs = require('fs');
let header = [];
let jsonData1 = [];
let jsonData2 = [];
let tempData1 = {};
let tempData2 = {};
let over = [];
let under = [];
let noArrest = [];
let i = 0;
let arrested = [];
let year = 0;
let type = 0;
let description = 0;
let arrest = 0;
for (i = 0; i <= 15; i = i + 1) {
    over[i] = 0;
    under[i] = 0;
    arrested[i] = 0;
    noArrest[i] = 0;
}
let isHeader = true;
/* creating interface */
const rl = readline.createInterface({

    input: fs.createReadStream('../inputdata/crimedata.csv')

});
rl.on('line', function(line) {
    let lineRecords = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (i = 0; i < lineRecords.length; i = i + 1) {
        if (isHeader) {
            header[i] = lineRecords[i];
            if (header[i] === 'Year') {
                year = i;
            }
            if (header[i] === 'Description') {
                description = i;
            }
            if (header[i] === 'Arrest') {
                arrest = i;
            }
            if (header[i] === 'Primary Type') {
                type = i;
            }
        }
    }

    if (lineRecords[type] === 'THEFT' && lineRecords[description] === 'OVER $500') {
        over[lineRecords[year] - 2001] = over[lineRecords[year] - 2001] + 1;
    } else if (lineRecords[type] === 'THEFT' && lineRecords[description] === '$500 AND UNDER') {
        under[lineRecords[year] - 2001] = under[lineRecords[year] - 2001] + 1;
    } else if (lineRecords[type] === 'ASSAULT' && lineRecords[arrest] === 'true') {
        arrested[lineRecords[year] - 2001] = arrested[lineRecords[year] - 2001] + 1;
    } else if (lineRecords[type] === 'ASSAULT' && lineRecords[arrest] === 'false') {
        noArrest[lineRecords[year] - 2001] = noArrest[lineRecords[year] - 2001] + 1;
    }

    isHeader = false;
});

rl.on('close', function() {
    for (i = 0; i <= 15; i = i + 1) {
        tempData1 = {};
        tempData1.Year = i + 2001;
        tempData1.Over$500 = over[i];
        tempData1.Under$500 = under[i];
        jsonData1.push(tempData1);
        tempData2 = {};
        tempData2.Year = i + 2001;
        tempData2.Arrested = arrested[i];
        tempData2.NotArrested = noArrest[i];
        jsonData2.push(tempData2);
    }
    /* getting json values */
    fs.writeFileSync('../outputdata/outputJsonRaji1.json', JSON.stringify(jsonData1), 'utf8');
    logger.debug('Writtten to file 1');
    fs.writeFileSync('../outputdata/outputJsonRaji2.json', JSON.stringify(jsonData2), 'utf8');
    logger.debug('Written to file 2');
  });
  return 'JSON written successfully';
}
}(2001);
