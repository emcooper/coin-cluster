module.exports = {generateOrderBooks}
formatter = require('./formatter')


const tableHeaders = '<thead><tr><th scope="col">Price (BTC)</th>'
                    + '<th scope="col">Bittrex</th>'
                    + '<th scope="col">Poloniex</th>'
                    + '<th scope="col">Total</th>'

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
  combined = formatter.combineData(data, "asks")
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
  combined = formatter.combineData(data, "bids")
  Object.keys(combined).forEach(function(price){
    let bittrexVol = parseFloat(combined[price].bittrex)
    let poloniexVol = parseFloat(combined[price].poloniex)
    let total = bittrexVol + poloniexVol
    rows += '<tr><th scope="row">' + price + '</th>'
          + '<td>' + bittrexVol + '</td>'
          + '<td>' + poloniexVol + '</td>'
          + '<td>' + total + '</td>'
  })
  return rows
}
