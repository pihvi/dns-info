var dnsInfo = require('./dns-info')

dnsInfo('reaktor.fi').then(function(info) {
  console.log(require('util').inspect(info, false, null, true))
}).catch(function(e) {
  console.error(e)
})
