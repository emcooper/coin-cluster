module.exports = {getOrders}
requests = require('./requests')
formatter = require('./formatter')
html = require('./htmlGenerator')


let url1 = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"
let url2 = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"

let data = ["", ""]

function getOrders(){
  Promise.all([requests.requestAsync(url1), requests.requestAsync(url2)])
      .then(function(allData) {
        var lowerCaseData = JSON.stringify(allData).toLowerCase()
        var formattedData = formatter.formatData(JSON.parse(lowerCaseData))
        data = html.generateOrderBooks(formattedData)
      });
      return JSON.stringify(data)
}
