const fs = require('fs'),
    http = require('http'),
    https = require('https'),
    process = require('process'),
    express = require('express')

function initApp(config) {
    const {respondWith} = config
    const app = express()

    if (respondWith) {
        app.get('/*', (req, res) => {
            console.log(process.cwd())
            res.sendFile(process.cwd() + respondWith)
        })
    }

    return app
}

function handleRequest(req, res, proxy, app) {
    // TODO this is compatible only with socket.io, think about adding more compatibility options
    // TODO make api prefix configurable
    if (req.url.startsWith('/socket.io') || req.url.startsWith('/api')) {
        proxy.web(req, res)
    } else {
        app(req, res)
    }
}

function createHttpServer(proxy, app) {

    return http.createServer((req, res) => {
        handleRequest(req, res, proxy, app)
    })
}

function createHttpsServer(proxy, app) {

    return https.createServer(
        {
            key: fs.readFileSync('cert.key'),
            cert: fs.readFileSync('cert.pem')
        },
        (req, res) => {
            handleRequest(req, res, proxy, app)
        })
}

function createServer(config, proxy) {

    const app = initApp(config)
    const server = config.ssl ? createHttpsServer(proxy, app) : createHttpServer(proxy, app)

// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
    server.on('upgrade', function (req, socket, head) {
        proxy.ws(req, socket, head)
    })

    return server
}

module.exports = createServer