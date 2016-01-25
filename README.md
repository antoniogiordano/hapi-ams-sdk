# hapi-ams-sdk

Hapi plugin for Microsoft Azure Media Services REST API


## Usage


```
//Eventually...

npm i --save hapi-ams-sdk

```

You initialize the service by providing a configuration object

```
var AzureService  = require('hapi-ams-sdk')

var configObj = {
  client_id: "",
  client_secret: ""
}

var serviceConfig = require('../path/to/config') || configObj

var amsService = new AzureService(serviceConfig)

```

## Azure Media Services Resources Provided


### Channels
-------------

####listChannels([cb])

Takes an optional callback. Will list all channels - streaming if no cb.

####getChannel(channelId, [cb])

Requires a channelId like ''nb:chid:UUID:2c30f424-ab90-40c6-ba41-52a993e9d393''. Will return all information for a channel. Will stream if optional callback is not provided.