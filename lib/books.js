module.exports = {getOrders}
requests = require('./requests')
formatter = require('./formatter')
html = require('./htmlGenerator')


let bittrexUrl = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"
let poloniexUrl = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"

let data = ["", ""]

function getOrders(){
  Promise.all([requests.requestAsync(bittrexUrl), requests.requestAsync(poloniexUrl)])
      .then(function(allData) {
        let formattedData = formatter.formatData(allData)
        data = html.generateOrderBookTables(formattedData)
      });
      return JSON.stringify(data)
}
