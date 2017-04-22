### express-proxy

Express.js server that can host static files and proxy API requests, with web socket and SSL support


##### Config

To configure the server modify `config.json`

```
{
    // port at which server will listen
    "port": 80, 
    
    // if set to true, an HTTPS server will be created
    "ssl": false, 
    
    // endpoint to proxy all the requests to
    "endpoint": "localhost", 
    
    // endpoint's port
    "endpointPort": 8080, 
    
     // if set to true, a secure connection will be established to the endpoint
    "endpointSSL": false,
    
    // if set to false, the certificates from the endpoint won't be verifyed
    "secureSSL": true 
    
    // if path string is specified, the server will response to all unknown 
    // requests with the specified file
    "respondWith": false | "/path/to/file/to/respond/with"  
}
```

##### Web Server
Drop your static web app files into the public folder

If server does not know with what to respond to a request, it will always respond with `public/index.html`.
This behaviour will be configurable in the next release.

If you're trying to create an HTTPS server, name your SSL key `cert.key` and your SSL certificate `cert.pem` and drop them in the root of the project. 

##### Changelog

###### V0.1.1

- Made "response with a specific file" feature configurable

##### TODO

- Test web socket proxy 
- Make `/api` prefix of the endpoint configurable
- Add support for other front-end web socket clients except socket.io