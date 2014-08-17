Fetch DNS info.

```javascript
dnsInfo('reaktor.fi').then(function(info) {
  console.log(info)
})
```

or

```javascript
dnsInfo({
  domain: 'reaktor.fi',
  server: {
    address: '8.8.8.8',
    port: 53,
    type: 'udp'
  },
  timeout: 2000
}).then(function(info) {
  console.log(info)
}).catch(function(e) {
  console.error(e)
})
```

should print something like

```javascript
{ domain: 'reaktor.fi',
  byTypes:
   [ { type: 'A',
       data: [ { ttl: 314, address: '176.58.116.179' } ] },
     { type: 'NS',
       data:
        [ { ttl: 14561, data: 'ns1.reaktor.fi' },
          { ttl: 14561, data: 'ns2.reaktor.fi' } ] },
     { type: 'SOA',
       data:
        [ { ttl: 1661,
            primary: 'ns1.reaktor.fi',
            admin: 'hostmaster.reaktor.fi',
            serial: 1405331251,
            refresh: 16384,
            retry: 2048,
            expiration: 1048576,
            minimum: 2560 } ] },
     { type: 'MX',
       data:
        [ { ttl: 3,
            priority: 10,
            exchange: 'neomx.reaktor.fi' } ] } ],
  byAny:
   [ { type: 'SOA',
       ttl: 2532,
       primary: 'ns1.reaktor.fi',
       admin: 'hostmaster.reaktor.fi',
       serial: 1405331251,
       refresh: 16384,
       retry: 2048,
       expiration: 1048576,
       minimum: 2560 },
     { type: 'NS',
       ttl: 21572,
       data: 'ns1.reaktor.fi' },
     { type: 'NS',
       ttl: 21572,
       data: 'ns2.reaktor.fi' },
     { type: 'MX',
       ttl: 572,
       priority: 10,
       exchange: 'neomx.reaktor.fi' },
     { type: 'A',
       ttl: 572,
       address: '176.58.116.179' } ] }
```
