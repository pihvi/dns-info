var dnsInfo = require('./dns-info')

dnsInfo('valio.fi').then(function(info) {
  info.forEach(function(type) {
    console.log(type)
  })
}).catch(function(e) {
  console.error(e)
})
