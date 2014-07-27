var dnsInfo = require('./dns-info')

dnsInfo('reaktor.fi').then(function(info) {
  console.log(info)
}).catch(function(e) {
  console.error(e)
})
