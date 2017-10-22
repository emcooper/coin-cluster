module.exports = {makeCall}
var pry = require('pryjs');

var request = require('request');
let exchanges = [{name: "Bittrex",
                  url: "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"},
                 {name: "Poloniex",
                 url: "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"}];

 let url1 = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"
 let url2 = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"

let results = [1]
let bittrexResults = []
let poloniexResults = []

function requestAsync(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, res, body) {
            if (err) { return reject(err); }
            json = JSON.parse(body)
            return resolve(json);
        });

    });
}
var data = ""

function makeCall(){
  Promise.all([requestAsync(url1), requestAsync(url2)])
      .then(function(allData) {
        console.log(allData[1])
          data = allData[1]["asks"] + "hi"
      });
  return data
}
