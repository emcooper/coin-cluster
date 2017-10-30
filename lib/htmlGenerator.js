module.exports = {generateOrderBookTables}
formatter = require('./formatter')

const tableHeaders = '<thead><tr><th scope="col"></th><th class="text-center" colspan="3" scope="col">Volume</th></tr><tr><th scope="col">Price (BTC)</th>'
                    + '<th scope="col">Bittrex</th>'
                    + '<th scope="col">Poloniex</th>'
                    + '<th scope="col">Total</th>'

function generateOrderBookTables(data){
  let bidTable = '<table class="table table-sm">'
                + tableHeaders
                + '<tbody>'
                + bidRows(data)
                + '</tbody></table>'

  let askTable = '<table class="table table-sm">'
                + tableHeaders
                + '<tbody>'
                + askRows(data)
                + '</tbody></table>'
  return [bidTable, askTable]
}

function askRows(data){
  rows = ""
  combined = formatter.combineData(data, "asks")
  Object.keys(combined).forEach(function(price){
    let bittrexVol = parseFloat(combined[price].bittrex)
    let poloniexVol = parseFloat(combined[price].poloniex)
    let total = bittrexVol + poloniexVol
    rows += '<tr class =' + askHighlighting(price, data) + '><th scope="row">' + price + '</th>'
          + '<td>' + bittrexVol + '</td>'
          + '<td>' + poloniexVol + '</td>'
          + '<td>' + total + '</td></tr>'
  })
  return rows
}

function bidRows(data){
  rows = ""
  combined = formatter.combineData(data, "bids")
  Object.keys(combined).forEach(function(price){
    let bittrexVol = parseFloat(combined[price].bittrex)
    let poloniexVol = parseFloat(combined[price].poloniex)
    let total = bittrexVol + poloniexVol
    rows += '<tr class =' + bidHighlighting(price, data) + '><th scope="row">' + price + '</th>'
          + '<td>' + bittrexVol + '</td>'
          + '<td>' + poloniexVol + '</td>'
          + '<td>' + total + '</td></tr>'
  })
  return rows
}

function askHighlighting(price, data){
  let maxBid = formatter.sortPrices(data, "bids")[0]
  if (price <= maxBid){return "bg-warning"}
}

function bidHighlighting(price, data){
  let minAsk = formatter.sortPrices(data, "asks")[0]
  if (price >= minAsk){return "bg-warning"}
}
