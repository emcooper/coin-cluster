module.exports = {requestAsync}
const request = require('request')

function requestAsync(exchange) {
    return new Promise(function(resolve, reject) {
        request(exchange.url, function(err, res, body) {
            if (err) { return reject(err) }

            return resolve(Object.assign(JSON.parse(body), {name: exchange.name}))
        })
    })
}
