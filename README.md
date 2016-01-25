# hapi-ams-sdk

Hapi plugin for Microsoft Azure Media Services REST API, based on node-ams-sdk project, but wrapped in an Hapi plugin with Channels support


## Usage


```

npm i --save hapi-ams-sdk

```

You initialize the service by providing a configuration object

```
var HapiAmsSdk  = require('hapi-ams-sdk')

var configObj = {
  client_id: "",
  client_secret: ""
}

var serviceConfig = require('../path/to/config') || configObj

...

// Register Azure Media Services REST API wrapper plugin

server.register({
  register: HapiAmsSdk,
  options: serviceConfig
}, (err) => {
  if (err) {
    console.log(err)
    throw err
  }

  // You can always access the amsService in your Hapi project
  var amsService = server.plugins['hapi-ams-sdk'].amsService
  var data = ''
  amsService.listChannels()
   .on('data', (d) => {
     data += d
     console.log(d)
   })
   .on('error', (e) => {
     console.log(e)
   })
   .on('end', () => {
     console.log(data)
     // var jsonData = JSON.parse(data)
   })
})

```

## Azure Media Services Resources Provided


### Channels
-------------

####listChannels([cb])

Takes an optional callback. Will list all channels - streaming if no cb.

####getChannel(channelId, [cb])

Requires a channelId like ''nb:chid:UUID:2c30f424-ab90-40c6-ba41-52a993e9d393''. Will return all information for a channel. Will stream if optional callback is not provided.