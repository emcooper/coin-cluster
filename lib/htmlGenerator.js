module.exports = {generateOrderBookTables,
                  generateRows}
formatter = require('./formatter')

const tableHeaders = '<thead><tr><th scope="col"></th><th class="text-center" colspan="3" scope="col">Volume</th></tr><tr><th scope="col">Price (BTC)</th>'
                    + '<th scope="col">Bittrex</th>'
                    + '<th scope="col">Poloniex</th>'
                    + '<th scope="col">Total</th>'

function generateOrderBookTables(data){
  let bidTable = '<table class="table table-sm">'
                + tableHeaders
                + '<tbody>'
                + generateRows(data, "bids")
                + '</tbody></table>'

  let askTable = '<table class="table table-sm">'
                + tableHeaders
                + '<tbody>'
                + generateRows(data, "asks")
                + '</tbody></table>'
  return [bidTable, askTable]
}

function generateRows(data, orderType){
  let rows = ""
  let combined = formatter.combineData(data, orderType)
  Object.keys(combined).forEach(function(price){
    let bittrexVol = parseFloat(combined[price].bittrex)
    let poloniexVol = parseFloat(combined[price].poloniex)
    let total = bittrexVol + poloniexVol
    rows += '<tr class =' + highlighting(price, data, orderType) + '><th scope="row">' + price + '</th>'
          + '<td>' + bittrexVol + '</td>'
          + '<td>' + poloniexVol + '</td>'
          + '<td>' + total + '</td></tr>'
  })
  return rows
}

function highlighting(price, data, orderType){
  if(orderType === "asks"){return askHighlighting(price, data)}
  if(orderType === "bids"){return bidHighlighting(price, data)}
}

function askHighlighting(price, data){
  let maxBid = formatter.sortPrices(data, "bids")[0]
  if (price <= maxBid){return "bg-warning"}
}

function bidHighlighting(price, data){
  let minAsk = formatter.sortPrices(data, "asks")[0]
  if (price >= minAsk){return "bg-warning"}
}
