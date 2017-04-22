const fs = require('fs')

const configReader = () => {
    try {
        return JSON.parse(fs.readFileSync('./config.json'))
    } catch (e) {
        return {
            "port": 80,
            "ssl": false,
            "endpoint": "localhost",
            "endpointPort": 80,
            "endpointSSL": false,
            "secureSSL": true,
            "respondWith": false
        }
    }
}

module.exports = configReader