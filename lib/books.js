module.exports = {getOrders}
const requests = require('./requests')
const formatter = require('./formatter')

const exchangeUrls = ['https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both',
                      'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH',
                      'https://api.hitbtc.com/api/2/public/orderbook/ETHBTC?limit=50']
let data = ['', '']

function getOrders(market){
  let urls = exchangeUrls.map(function(url){
    return url.replace('ETH', market);
  })
  Promise.all([requests.requestAsync(urls[0]), requests.requestAsync(urls[1]), requests.requestAsync(urls[2])])
      .then(function(allData) {
        data = formatter.formatData(allData)
      })
      return data
}
