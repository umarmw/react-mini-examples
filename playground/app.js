'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


const countries = [];

function getAllCountries(){
    for(let i=1; i<=25; i++){
        
    
    https.get("https://jsonmock.hackerrank.com/api/countries?page="+i, function (res){
        let json = '';
        let total_pages = 0;
        
        res.on('data', function (chunk){
            json += chunk;
        });
        res.on('end', function(){
            try {
                let result = JSON.parse(json);
                countries.push(result);
            } catch(e){
                console.log('Error in parsing')
            }
        })
    }).on('error', function(err){
        console.log('Err:', err);
    })
    }
}

const getTotalPages = (url, callback) => {
  https.get(url, res => {
    let data = ''

    res.on('data', chunk => data += chunk)

    res.on('end', () => {
      return callback(null, JSON.parse(data).total_pages)
    })
  }).on('error', err => {
    return callback(err, null)
  })
}

const getCountiesHelper = (urls, callback) => {
  let counties = new Array()
  let counter = 1

  urls.forEach(url => {
    https.get(url, res => {
      let data = ''

      res.on('data', chunk => data += chunk)

      res.on('end', () => {
        const cnty = JSON.parse(data).data

        cnty.forEach(country => counties.push(country))

        if (counter === urls.length) {
          return callback(null, counties)
        }
        counter++
      })
    }).on('error', err => {
      return callback(err, null)
    })
  })
}


async function getCountryName(code) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
    let CountryName;
    
    return new Promise(resolve => {
    
    const url = `https://jsonmock.hackerrank.com/api/countries?page=1`
    getTotalPages(url, (err, totalPages) => {
    if (err) {
      log('Error getting total number of available pages:', err)
    } else {
      const urls = new Array()
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        urls.push(`https://jsonmock.hackerrank.com/api/countries?page=${pageNumber}`)
      }
      getCountiesHelper(urls, (err, countries) => {
        if (err) {
          log('Error retrieving countries:', err)
        } else {
          countries.forEach(country => {
              if(country.alpha2Code == code){
                  console.log(country.name);
                  CountryName = country.name;
                  resolve(CountryName);
              }
          })
        }
      })
    }
  });
  
   });
  
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const code = readLine().trim();

  const name = await getCountryName(code);

  ws.write(`${name}\n`);

}
