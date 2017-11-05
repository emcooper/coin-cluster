module.exports = {formatData,
                  combineData,
                  formatBittrex,
                  formatPoloniex,
                  sortPrices,
                  downCase,
                  placeholderRowData,
                  askHighlighting,
                  bidHighlighting,
                  formatHitbtc}

function formatData(data){
  let lowerCaseData = downCase(data)
  let bittrexData = formatBittrex(lowerCaseData[0])
  let poloniexData = formatPoloniex(lowerCaseData[1])
  let hitbtcData = formatHitbtc(lowerCaseData[2])
  bids_data = combineData([bittrexData, poloniexData, hitbtcData], "bids")
  asks_data = combineData([bittrexData, poloniexData, hitbtcData], "asks")
  return [bids_data, asks_data]
}

function formatBittrex(data){
  return {name: 'bittrex',
          bids: data['result']['buy'].slice(0, 50),
          asks: data['result']['sell'].slice(0, 50)}
}

function formatPoloniex(data){
    let bids = data['bids'].map(function(bid){
      return {rate: bid[0],
              quantity: bid[1]}
    })
    let asks = data['asks'].map(function(bid){
      return {rate: bid[0],
              quantity: bid[1]}
    })
    return {name: 'poloniex',
            bids: bids,
            asks: asks}
}

function formatHitbtc(data){
  let bids = data['bid'].map(function(bid){
    return {rate: + bid.price,
            quantity: + bid.size}
  })
  let asks = data['ask'].map(function(bid){
    return {rate: + bid.price,
            quantity: + bid.size}
  })
  return {name: 'hitbtc',
          bids: bids,
          asks: asks}
}

function downCase(data){
  let lowerCaseData = JSON.stringify(data).toLowerCase()
  return JSON.parse(lowerCaseData)
}

function combineData(data, orderType){
  let rowData = placeholderRowData(data, orderType)
  data.forEach(function(exchange){
    exchange[orderType].forEach(function(order){
      rowData[order.rate]['volumes'][exchange.name] += order.quantity
      rowData[order.rate]['highlight'] = highlighting(order.rate, data, orderType)
    })
  })
  return rowData
}

function placeholderRowData(data, orderType){
  let placeholderData = {}
  let sortedPrices = sortPrices(data, orderType)
  sortedPrices.forEach(function(price){
    let volPlaceholder = {}
    data.forEach(function(exchange){ volPlaceholder[exchange.name] = 0 })
    placeholderData[price] = {'volumes': volPlaceholder,
                              'highlight': false}
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
  if(orderType === 'bids'){return prices.sort().reverse()}
  if(orderType === 'asks'){return prices.sort()}
}

function highlighting(price, data, orderType){
  if(orderType === 'asks'){return askHighlighting(price, data)}
  if(orderType === 'bids'){return bidHighlighting(price, data)}
}

function askHighlighting(price, data){
  let maxBid = sortPrices(data, 'bids')[0]
  if (price <= maxBid){return 'bg-warning'}
}

function bidHighlighting(price, data){
  let minAsk = sortPrices(data, 'asks')[0]
  if (price >= minAsk){return 'bg-warning'}
}
