const httpProxy = require('http-proxy')

function createHttpProxy(config) {
    const endpoint = config.endpoint.split(':');

    return new httpProxy.createProxyServer({
        target: {
            host: endpoint[0],
            port: endpoint[1]
        }
    })
}

function createHttpsProxy(config) {
    const {endpoint, secureSSL} = config

    return new httpProxy.createProxyServer({
        target: 'https://' + endpoint,
        secure: secureSSL
    })
}

function createProxyServer(config) {
    const proxy = config.endpointSSL ? createHttpsProxy(config) : createHttpProxy(config)

    proxy.on('error', function (e, req, res) {
        console.log(e)
        res.statusCode = 500
        res.write('PROXY_ERR')
        res.end()
    })

    return proxy
}

module.exports = createProxyServer