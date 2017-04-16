### express-proxy

Express.js server that can host static files and proxy API requests, with web socket and SSL support


##### Config

To configure the server modify `config.json`

```
{
    "port": 80, // port at which server will listen
    "ssl": false, // if set to true, an HTTPS server will be created
    "endpoint": "localhost", // endpoint to proxy all the requests to
    "endpointPort": 80, // endpoint's port
    "endpointSSL": false, // if set to true, a secure connection will be established to the endpoint
    "secureSSL": true // if set to false, the certificates from the endpoint won't be verifyed
}
```

##### Web Server
Drop your static web app files into the public folder

If server does not know with what to respond to a request, it will always respond with `public/index.html`.
This behaviour will be configurable in the next release.

If you're trying to create an HTTPS server, name your SSL key `cert.key` and your SSL certificate `cert.pem` and drop them in the root of the project. 

##### TODO

- Test web socket proxy 
- Make `/api` prefix of the endpoint configurable
- Add support for other front-end web socket clients except socket.io
- Make option 'respond to any request with a specific file' optional
- Make path to the 'respond to any request with a specific file' file configurable