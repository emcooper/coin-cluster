// const assert = require('chai').assert;
// const html = require('../lib/htmlGenerator')
//
// const sampleData = [{ name: 'poloniex',
//                     bids:
//                      [ {quantity: 4, rate:  .05},
//                        {quantity: 23, rate: .07}],
//                      asks:
//                      [ {quantity: 5, rate: .02},
//                        {quantity: 6, rate: .03}]},
//                  { name: 'bittrex',
//                      bids:
//                       [ {quantity: 5, rate: 0.06},
//                         {quantity: 44, rate: 0.04}],
//                       asks:
//                       [ {quantity: 2, rate: 0.04},
//                         {quantity: 8, rate: 0.01}]}]
//
// describe('htmlGenerator functionality', function(){
//   context('generateRows function', function(){
//     it('returns string of html rows for given order type', function(){
//       let bidResult = html.generateRows(sampleData, 'bids')
//       let askResult = html.generateRows(sampleData, 'asks')
//
//       assert.isString(bidResult)
//       assert.include(bidResult, '<tr class=bg-warning><th scope="row">0.07</th><td>0</td><td>23</td><td>23</td></tr>')
//       assert.notInclude(bidResult, '.01')
//
//       assert.isString(askResult)
//       assert.include(askResult, '<tr class=bg-warning><th scope="row">0.01</th><td>8</td><td>0</td><td>8</td></tr>')
//       assert.notInclude(askResult, '.06')
//     })
//   })
//
//   context('askHighlighting function', function(){
//     it('returns bg-warning class if there is overlap', function(){
//       let overlapResult = html.askHighlighting(.06, sampleData)
//
//       assert.equal(overlapResult, 'bg-warning')
//     })
//     it('id undefined if there is no overlap', function(){
//       let noOverlapResult = html.askHighlighting(.08, sampleData)
//
//       assert.isUndefined(noOverlapResult)
//     })
//   })
//
//   context('bidHighlighting function', function(){
//     it('returns bg-warning class if there is overlap', function(){
//       let overlapResult = html.bidHighlighting(.06, sampleData)
//
//       assert.equal(overlapResult, 'bg-warning')
//     })
//     it('id undefined if there is no overlap', function(){
//       let noOverlapResult = html.bidHighlighting(.005, sampleData)
//
//       assert.isUndefined(noOverlapResult)
//     })
//   })
// })
