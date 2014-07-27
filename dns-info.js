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
  return Promise.reduce(allTypes, function(result, response) {
    if (response.answer.length) {
      var ANY = 255
      if (response.question[0].type != ANY) {
        var questionType = dns.consts.QTYPE_TO_NAME[response.question[0].type]
        result.byTypes.push({type: questionType, data: response.answer})
      } else {
        result.byAny = response.answer
      }
    }
    return result
  }, {byTypes: [], byAny: undefined})
}
