module.exports = {getOrders}
const requests = require('./requests')
const formatter = require('./formatter')

const bittrexUrl = 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both'
const poloniexUrl = 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH'
const exchangeUrls = ['https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both',
                      'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH']
let data = ['', '']

function getOrders(market){
  let urls = exchangeUrls.map(function(url){
    return url.replace('ETH', market);
  })
  Promise.all([requests.requestAsync(urls[0]), requests.requestAsync(urls[1])])
      .then(function(allData) {
        data = formatter.formatData(allData)
      })
      return data
}
