var dns = require('native-dns')
var Promise = require('bluebird')
var _ = require('lodash')

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
        var data = response.answer.map(function(entry) {
          return _(entry).omit('type', 'name', 'class').value()
        })
        result.byTypes.push({type: questionType, data: data})
      } else {
        result.byAny = response.answer.map(function(entry) {
          entry.type = dns.consts.QTYPE_TO_NAME[entry.type]
          return _(entry).omit('name', 'class').value()
        })
      }
    }
    return result
  }, {domain: domain, byTypes: [], byAny: undefined})
}
