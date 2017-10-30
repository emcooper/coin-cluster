const assert = require('chai').assert;
const formatter = require('../lib/formatter')

describe('book functionality', function() {
  context('formatBittrex function', function(){
    it("returns a formatted object", function(){
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
    it("returns a formatted object", function(){
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
})
