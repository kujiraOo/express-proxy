const fs = require('fs'),
    process = require('process'),
    minimist = require('minimist')

const defaultConfig = {
    "port": 80,
    "ssl": false,
    "endpoint": "localhost:8080",
    "endpointSSL": false,
    "secureSSL": true,
    "respondWith": false
}

function assignEnvVars(config) {
    const {PORT, SSL, ENDPOINT, ENDPOINT_SSL, SECURE_SSL, RESPOND_WITH} =  process.env
    console.log(PORT, SSL, ENDPOINT, ENDPOINT_SSL, SECURE_SSL, RESPOND_WITH)

    config.port = Number.parseInt(PORT) || config.port
    config.ssl = SSL ? SSL === 'true' || SSL === true : config.ssl
    config.endpoint = ENDPOINT || config.endpoint
    config.endpointSSL = ENDPOINT_SSL ? ENDPOINT_SSL === 'true' || ENDPOINT_SSL === true : config.endpointSSL
    config.secureSSL = SECURE_SSL ? SECURE_SSL === 'true' || ENDPOINT_SSL === true : config.secureSSL
    config.respondWith = RESPOND_WITH ? RESPOND_WITH === 'false' ? false : RESPOND_WITH : config.respondWith
}

function assignCLIParams(config) {
    const argv = minimist(process.argv)
    const {p, e, r} = argv

    config.port = Number.parseInt(p) || config.port
    config.ssl = isDefined(argv.ssl) ? argv.ssl : config.ssl
    config.endpoint = e || config.endpoint
    config.endpointSSL = isDefined(argv['endpoint-ssl']) ? argv['endpoint-ssl'] : config.endpointSSL
    config.secureSSL = isDefined(argv['secure-ssl']) ? argv['secure-ssl'] : config.secureSSL
    config.respondWith = isDefined(r) ? r : config.respondWith
}

function isDefined(val) {
    return val !== null && val !== undefined
}

const configReader = () => {
    let config = Object.assign({}, defaultConfig)

    try {
        config = Object.assign(JSON.parse(fs.readFileSync('./config.json')))
    } catch (e) {
        console.log(e)
    }

    assignEnvVars(config)
    assignCLIParams(config)

    console.log(config)

    return config
}

module.exports = configReader