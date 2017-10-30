const assert = require("chai").assert;
const formatter = require('../lib/formatter')

describe("formatting functionality", function() {
  context("formatBittrex function", function(){
    it("returns a correctly formatted object", function(){
      let sampleResponse = {
        "success": true,
        "message": "",
        "result": {
            "buy": [
                {
                    "quantity": 2,
                    "rate": .05
                }],
                "sell": [
                    {
                        "quantity": 4,
                        "rate": .06
                    }]
                  }
      }
      let result = formatter.formatBittrex(sampleResponse)
      assert.isObject(result)
      assert.equal(result.name, "bittrex")
      assert.isArray(result.bids)
      assert.isArray(result.asks)
      assert.equal(result.asks[0].quantity, 4)
      assert.equal(result.bids[0].rate, .05)
    })
  })

  context("formatPoloniex function", function(){
    it("returns a correctly formatted object", function(){
      let sampleResponse = {
          "asks": [
              [
                  ".04",
                  3
              ]
          ],
          "bids": [
              [
                  ".07",
                  4
              ]
          ],
          "isFrozen": "0",
          "seq": 423840089
      }
      let result = formatter.formatPoloniex(sampleResponse)
      assert.isObject(result)
      assert.equal(result.name, "poloniex")
      assert.isArray(result.bids)
      assert.isArray(result.asks)
      assert.equal(result.asks[0].quantity, 3)
      assert.equal(result.bids[0].rate, .07)
    })
  })

  context ("downCase function", function(){
    it("converts json response to lower case object", function(){
      let sampleResponse = {
        "success": true,
        "message": "",
        "result": {
            "buy": [
                {
                    "Quantity": 2,
                    "Rate": .05
                }],
                "sell": [
                    {
                        "Quantity": 4,
                        "Rate": .06
                    }]
                  }
      }
      let result = formatter.downCase(sampleResponse)
      assert.isObject(result)
      assert.equal(result["result"]["buy"][0]["quantity"], 2)
      assert.isUndefined(result["result"]["buy"][0]["Quantity"])
      assert.equal(result["result"]["sell"][0]["rate"], .06)
      assert.isUndefined(result["result"]["sell"][0]["Rate"])
    })
  })

  context ("placeholderRowData function", function(){
    it("returns object for each price point with 0 volume placeholders", function(){
      let sampleData = [{ name: "poloniex",
                          bids:
                           [ {quantity: 4, rate:  .05},
                             {quantity: 23, rate: .07},],
                           asks:
                           [ {quantity: 5, rate: .02},
                             {quantity: 6, rate: .03},]},
                       { name: "bittrex",
                           bids:
                            [ {quantity: 5, rate: 0.06},
                              {quantity: 44, rate: 0.04},],
                            asks:
                            [ {quantity: 2, rate: 0.04},
                              {quantity: 8, rate: 0.01},]}]

      let bidResult = formatter.placeholderRowData(sampleData, "bids")
      let askResult = formatter.placeholderRowData(sampleData, "asks")

      assert.isObject(bidResult)
      assert.deepEqual(Object.keys(bidResult), [ "0.07", "0.06", "0.05", "0.04" ])
      assert.equal(bidResult["0.07"]["poloniex"], 0)
      assert.equal(bidResult["0.07"]["bittrex"], 0)
      assert.equal(bidResult["0.04"]["poloniex"], 0)
      assert.equal(bidResult["0.04"]["bittrex"], 0)

      assert.isObject(askResult)
      assert.deepEqual(Object.keys(askResult), [ "0.01", "0.02", "0.03", "0.04" ])
      assert.equal(askResult["0.01"]["poloniex"], 0)
      assert.equal(askResult["0.01"]["bittrex"], 0)
      assert.equal(askResult["0.04"]["poloniex"], 0)
      assert.equal(askResult["0.04"]["bittrex"], 0)
    })
  })

  context ("sortPrices function", function(){
    it("sorts prices in ascending order for asks; descending order for bids", function(){
      let sampleData = [{ name: "poloniex",
                          bids:
                           [ {quantity: 4, rate:  .05},
                             {quantity: 23, rate: .07},],
                           asks:
                           [ {quantity: 5, rate: .02},
                             {quantity: 6, rate: .03},]},
                       { name: "bittrex",
                           bids:
                            [ {quantity: 5, rate: 0.06},
                              {quantity: 44, rate: 0.04},],
                            asks:
                            [ {quantity: 2, rate: 0.04},
                              {quantity: 8, rate: 0.01},]}]

      let bidResult = formatter.sortPrices(sampleData, "bids")
      let askResult = formatter.sortPrices(sampleData, "asks")

      assert.deepEqual(bidResult, [ 0.07, 0.06, 0.05, 0.04 ])
      assert.deepEqual(askResult, [ 0.01, 0.02, 0.03, 0.04 ])
    })
  })
})
