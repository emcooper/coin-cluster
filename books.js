module.exports = {makeCall}

var request = require('request');

let url1 = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"
let url2 = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"

var data = ""

function requestAsync(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, res, body) {
            if (err) { return reject(err); }
            return resolve(JSON.parse(body));
        });
    });
}

function makeCall(){
  Promise.all([requestAsync(url1), requestAsync(url2)])
      .then(function(allData) {
        // var poloniex = "Poloniex: " + allData[1]["bids"][0][0].toString()
        // var bittrex = "Bittrex: " + allData[0]["result"]["buy"][0]["Rate"].toString()
        // data = [poloniex, bittrex]
        formattedData = formatData(allData)
        data = generateOrderBooks(formattedData)
      });
  return JSON.stringify(data)
}

function formatData(dataCollection){
  result = {}
  dataCollection.forEach(function(data, index){
    if(index === 0){Object.assign(result, formatBittrex(data))}
    if(index === 1){Object.assign(result, formatPoloniex(data))}
  })
  return result
}

function formatBittrex(data){
  return {bittrex:
            {bids: data["result"]["buy"],
            asks: data["result"]["sell"]}
          }
}
