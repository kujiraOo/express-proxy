const fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    app = express()

app.use(express.static('./public'))

// TODO add option to config that will define the static resource to server on any other request
app.get('/*', (req, res) => {
    res.sendfile('public/index.html')
})

function handleRequest(req, res, proxy) {
    // TODO this is compatible only with socket.io, think about adding more compatibility options
    // TODO make api prefix configurable
    if (req.url.startsWith('/socket.io') || req.url.startsWith('/api')) {
        proxy.web(req, res)
    } else {
        app(req, res)
    }
}

function createHttpServer(config, proxy) {

    return http.createServer((req, res) => {
        handleRequest(req, res, proxy)
    })
}

function createHttpsServer(config, proxy) {

    return https.createServer(
        {
            key: fs.readFileSync('cert.key'),
            cert: fs.readFileSync('cert.pem')
        },
        (req, res) => {
            handleRequest(req, res, proxy)
        })
}

function createServer(config, proxy) {
    const server = config.ssl ? createHttpsServer(config, proxy) : createHttpServer(config, proxy)

// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
    server.on('upgrade', function (req, socket, head) {
        proxy.ws(req, socket, head)
    })

    return server
}

module.exports = createServer