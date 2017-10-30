const assert = require('chai').assert;
const formatter = require('../lib/formatter')

describe('formatting functionality', function() {
  context('formatBittrex function', function(){
    it("returns a correctly formatted object", function(){
      sampleResponse = {
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

  context('formatPoloniex function', function(){
    it("returns a correctly formatted object", function(){
      sampleResponse = {
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
      sampleResponse = {
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
})
