var dns = require('native-dns')
var Promise = require('bluebird')

module.exports = function(domain) {
  var allTypes = Object.keys(dns.consts.NAME_TO_QTYPE).map(function(type) {
    return new Promise(function(resolve, reject) {
      dns.Request({
        question: dns.Question({
          name: domain,
          type: type
        }),
        server: {
          address: '8.8.8.8',
          port: 53,
          type: 'udp'
        },
        timeout: 2000
      }).on('timeout', function() {
        reject('Timeout in fetching DNS info.')
      }).on('message', function(err, res) {
        resolve(err || res)
      }).send()
    })
  })
  return Promise.all(allTypes).filter(function(res) {
    return res.answer.length > 0
  }).map(function(res) {
    var questionType = dns.consts.QTYPE_TO_NAME[res.question[0].type]
    return {type: questionType, data: res.answer}
  })
}
