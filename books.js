module.exports = {makeCall, formatBittrex, formatPoloniex}

var request = require('request');

let url1 = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"
let url2 = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"

var data = ["", ""]

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
        var lowerCaseData = JSON.stringify(allData).toLowerCase()
        var formattedData = formatData(JSON.parse(lowerCaseData))
        // data = generateOrderBooks(formattedData)
        data = ["Bittrex: " + formattedData[0].bids[0].rate, "Poloniex: " + formattedData[1].bids[0].rate]
      });
      return JSON.stringify(data)
}

function generateOrderBooks(data){
  var bidTable = ''
}

function formatData(dataCollection){
  var bittrexData = formatBittrex(dataCollection[0])
  var poloniexData = formatPoloniex(dataCollection[1])
  return [bittrexData, poloniexData]
}

function formatBittrex(data){
  return {name: "Bittrex",
          bids: data["result"]["buy"],
          asks: data["result"]["sell"]}
}

function formatPoloniex(data){
    var bids = data["bids"].map(function(bid){
      return {rate: bid[0],
              quantity: bid[1]}
    })
    var asks = data["asks"].map(function(bid){
      return {rate: bid[0],
              quantity: bid[1]}
    })
    return {name: "Poloniex",
            bids: bids,
            asks: asks}
}
