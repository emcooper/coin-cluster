module.exports = {makeCall}
requests = require('./requests')

const request = require('request');
const tableHeaders = '<thead><tr><th scope="col">Price (BTC)</th>'
                    + '<th scope="col">Bittrex</th>'
                    + '<th scope="col">Poloniex</th>'
                    + '<th scope="col">Total</th>'


let url1 = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both"
let url2 = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH"

let data = ["", ""]

function makeCall(){
  Promise.all([requests.requestAsync(url1), requests.requestAsync(url2)])
      .then(function(allData) {
        var lowerCaseData = JSON.stringify(allData).toLowerCase()
        var formattedData = formatData(JSON.parse(lowerCaseData))
        data = generateOrderBooks(formattedData)
      });
      return JSON.stringify(data)
}

function generateOrderBooks(data){
  var bidTable = '<table class="table table-sm">'
                + tableHeaders
                + '<tbody>'
                + bidRows(data)
                + '</tbody></table>'

  var askTable = '<table class="table table-sm">'
                + tableHeaders
                + '<tbody>'
                + askRows(data)
                + '</tbody></table>'
  return [bidTable, askTable]
}

function askRows(data){
  rows = ""
  combined = combineData(data, "asks")
  Object.keys(combined).forEach(function(price){
    let bittrexVol = parseFloat(combined[price].bittrex)
    let poloniexVol = parseFloat(combined[price].poloniex)
    rows += '<tr><th scope="row">' + price + '</th>'
          + '<td>' + bittrexVol + '</td>'
          + '<td>' + poloniexVol + '</td>'
          + '<td>' + bittrexVol + poloniexVol + '</td>'
  })
  return rows
}

function bidRows(data){
  rows = ""
  combined = combineData(data, "bids")
  Object.keys(combined).forEach(function(price){
    let bittrexVol = parseFloat(combined[price].bittrex)
    let poloniexVol = parseFloat(combined[price].poloniex)
    rows += '<tr><th scope="row">' + price + '</th>'
          + '<td>' + bittrexVol + '</td>'
          + '<td>' + poloniexVol + '</td>'
          + '<td>' + bittrexVol + poloniexVol + '</td>'
  })
  return rows
}

function combineData(data, orderType){
  let prices = []
  data.forEach(function(exchange){
    exchange[orderType].forEach(function(order){
      prices.push(order.rate)
    })
  })
  let rowData = {}
  let sortedPrices = null
  if(orderType === "bids"){sortedPrices = prices.sort().reverse()}
  if(orderType === "asks"){sortedPrices = prices.sort()}
  sortedPrices.forEach(function(price){
    rowData[price] = {"bittrex": 0, "poloniex": 0}
  })
  data.forEach(function(exchange){
    exchange[orderType].forEach(function(order){
      rowData[order.rate][exchange.name] += order.quantity
    })
  })
  return rowData
}



function formatData(dataCollection){
  var bittrexData = formatBittrex(dataCollection[0])
  var poloniexData = formatPoloniex(dataCollection[1])
  return [bittrexData, poloniexData]
}

function formatBittrex(data){
  return {name: "bittrex",
          bids: data["result"]["buy"].slice(0, 50),
          asks: data["result"]["sell"].slice(0, 50)}
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
    return {name: "poloniex",
            bids: bids,
            asks: asks}
}
