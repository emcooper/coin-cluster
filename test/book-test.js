var assert = require('chai').assert;
const books = require('../books')

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
      result = books.formatBittrex(sampleResponse)
      assert.isObject(result)
      assert.equal(result.name, "Bittrex")
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
      result = books.formatPoloniex(sampleResponse)
      assert.isObject(result)
      assert.equal(result.name, "Poloniex")
      assert.isArray(result.bids)
      assert.isArray(result.asks)
      assert.equal(result.asks[0].quantity, 3)
      assert.equal(result.bids[0].rate, .07)
    })
  })
})
