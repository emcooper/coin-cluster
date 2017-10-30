module.exports = {formatData,
                  combineData,
                  formatBittrex,
                  formatPoloniex,
                  sortPrices,
                  downCase,
                  placeholderRowData}

function formatData(data){
  lowerCaseData = downCase(data)
  let bittrexData = formatBittrex(lowerCaseData[0])
  let poloniexData = formatPoloniex(lowerCaseData[1])
  return [bittrexData, poloniexData]
}

function formatBittrex(data){
  return {name: "bittrex",
          bids: data["result"]["buy"].slice(0, 50),
          asks: data["result"]["sell"].slice(0, 50)}
}

function formatPoloniex(data){
    let bids = data["bids"].map(function(bid){
      return {rate: bid[0],
              quantity: bid[1]}
    })
    let asks = data["asks"].map(function(bid){
      return {rate: bid[0],
              quantity: bid[1]}
    })
    return {name: "poloniex",
            bids: bids,
            asks: asks}
}

function downCase(data){
  lowerCaseData = JSON.stringify(data).toLowerCase()
  return JSON.parse(lowerCaseData)
}

function combineData(data, orderType){
  let rowData = placeholderRowData(data, orderType)
  data.forEach(function(exchange){
    exchange[orderType].forEach(function(order){
      rowData[order.rate][exchange.name] += order.quantity
    })
  })
  return rowData
}

function placeholderRowData(data, orderType){
  let placeholderData = {}
  let sortedPrices = sortPrices(data, orderType)
  sortedPrices.forEach(function(price){
    placeholderData[price] = {"bittrex": 0, "poloniex": 0}
  })
  return placeholderData
}

function sortPrices(data, orderType){
  let prices = []
  data.forEach(function(exchange){
    exchange[orderType].forEach(function(order){
      prices.push(order.rate)
    })
  })
  if(orderType === "bids"){return prices.sort().reverse()}
  if(orderType === "asks"){return prices.sort()}
}
