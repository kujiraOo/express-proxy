'use strict'

const config = require('./lib/config-reader')(),
    proxy = require('./lib/proxy')(config),
    server = require('./lib/server')(config, proxy),
    {port} = config

server.listen(port, () => {
    console.log('Express proxy listens at ' + port)
})