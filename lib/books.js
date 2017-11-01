module.exports = {getOrders}
const requests = require('./requests')
const formatter = require('./formatter')
const html = require('./htmlGenerator')

const bittrexUrl = 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both'
const poloniexUrl = 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH'
let data = ['', '']

function getOrders(){
  Promise.all([requests.requestAsync(bittrexUrl), requests.requestAsync(poloniexUrl)])
      .then(function(allData) {
        data = formatter.formatData(allData)
        // data = html.generateOrderBookTables(formattedData)
      });
      return JSON.stringify(data)
}
