module.exports = {requestAsync}
const request = require('request')

function requestAsync(url) {
    return new Promise(function(resolve, reject) {
        request(url.url, function(err, res, body) {
            if (err) { return reject(err) }
            return resolve(JSON.parse(body))
        })
    })
}
