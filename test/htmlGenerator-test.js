const assert = require('chai').assert;
const html = require('../lib/htmlGenerator')

describe("htmlGenerator functionality", function(){
  context("generateRows function", function(){
    it("returns string of html rows for given order type", function(){
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

      let bidResult = html.generateRows(sampleData, "bids")
      let askResult = html.generateRows(sampleData, "asks")

      assert.isString(bidResult)
      assert.include(bidResult, "<tr")
      assert.include(bidResult, ".05")
      assert.include(bidResult, ".06")
      assert.notInclude(bidResult, ".01")

      assert.isString(askResult)
      assert.include(askResult, "<tr")
      assert.include(askResult, ".01")
      assert.include(askResult, ".02")
      assert.notInclude(askResult, ".06")
    })
  })
})
