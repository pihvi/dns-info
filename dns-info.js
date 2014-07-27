var dns = require('native-dns')
var Promise = require('bluebird')

module.exports = function(domain) {
  return new Promise(function(resolve, reject) {
    var req = dns.Request({
      question: dns.Question({
        name: domain,
        type: 'SOA'
      }),
      server: {
        address: '8.8.8.8',
        port: 53,
        type: 'udp'
      },
      timeout: 2000
    })

    req.send()

    req.on('timeout', function() {
      reject('Timeout in fetching DNS info.')
    })

    req.on('message', function(err, res) {
      resolve(res.answer)
    })
  })
}
