var dnsInfo = require('./dns-info')

dnsInfo('reaktor.fi').then(function(info) {
  console.log(require('util').inspect(info, false, null, true))
})

dnsInfo({
  domain: 'reaktor.fi',
  server: {
    address: '8.8.8.8',
    port: 53,
    type: 'udp'
  },
  timeout: 2000
}).then(function(info) {
  console.log(require('util').inspect(info, false, null, true))
}).catch(function(e) {
  console.error(e)
})
