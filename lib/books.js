module.exports = {getOrders}
const requests = require('./requests')
const formatter = require('./formatter')

const exchanges = [{name: 'bittrex', url: 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both'},
                    {name: 'poloniex', url: 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH'},
                    {name: 'hitbtc', url: 'https://api.hitbtc.com/api/2/public/orderbook/ETHBTC?limit=50'}]
let data = ['', '']

function getOrders(market){
  urls = updateUrls(market)
  Promise.all([requests.requestAsync(urls[0]), requests.requestAsync(urls[1]), requests.requestAsync(urls[2])])
      .then(function(allData) {
        data = formatter.formatData(allData)
      })
      return data
}

function updateUrls(market){
  let urls = JSON.stringify(exchanges).replace(/ETH/g, market)
  return JSON.parse(urls)
}
