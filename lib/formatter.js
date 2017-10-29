module.exports = {formatData, combineData}

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
