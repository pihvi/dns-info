var dns = require('native-dns')

module.exports = function(domain) {
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
    timeout: 5000
  })

  req.send()

  req.on('timeout', function() {
    console.log('Timeout in making request')
  })

  req.on('message', function(err, res) {
    console.log(res.answer)
  })
}
