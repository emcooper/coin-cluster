module.exports = {makeCall}

const request = require("request");
let exchanges = [{name: "Bittrex",
                  url: "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"},
                 {name: "Poloniex",
                 url: "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"}];

let results = []
let bittrexResults = []
let poloniexResults = []

function makeCall(){
  exchanges.forEach(function(exchange, index){
    request.get(exchange.url, (error, response, body) => {
      let json = JSON.parse(body);
      // if(index === 0){results = []}
      if (exchange.name === "Bittrex"){bittrexResults = json}
      if (exchange.name === "Poloniex"){poloniexResults = json}
    })
  })
  return generateTables(bittrexResults, poloniexResults)
}

function generateTables(bittrexResults, poloniexResults){
  console.log(bittrexResults.result)
  return bittrexResults.length
}
