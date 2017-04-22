### express-proxy

Express.js server that can host static files and proxy API requests, with web socket and SSL support


##### Config

To configure the server modify `config.json`


###### Port

Port at which server will listen

In config.json: `"port": 80`

Env: `PORT=80`

Cli: `-p 80`


###### SSL

If set to true, an HTTPS server will be created

In config.json: `"ssl": true`

Env: `SSL=true`

Cli: `--ssl`


##### Endpoint

Endpoint to proxy all the requests to

In config.json: `"endpoint": "localhost:8080"`

Env: `SSL=localhost:8080`

Cli: `-e localhost:8080`


##### Endpoint SSL

If set to true, a secure connection will be established to the endpoint

In config.json: `"endpointSSL": false`

Env: `ENDPOINT_SSL=localhost:8080`

Cli: `--no-endpoint-ssl`

##### Secure SSL

if set to false, the certificates from the endpoint won't be verified

In config.json: `"secureSSL": true`

Env: `SECURE_SSL=true`

Cli: `--secure-ssl`


##### Respond with

if path string is specified, the server will response to all unknown requests with the specified file

In config.json: `"respondWith": false | "/path/to/file/to/respond/with"`

Env: `RESPOND_WITH=false | /path/to/file/to/respond/with`

Cli: `-r /path/to/file/to/respond/with` or `--no-r`


##### Web Server
Drop your static web app files into the public folder

If server does not know with what to respond to a request, it will always respond with `public/index.html`.
This behaviour will be configurable in the next release.

If you're trying to create an HTTPS server, name your SSL key `cert.key` and your SSL certificate `cert.pem` and drop them in the root of the project. 

##### Changelog

###### V0.1.2

- Added support for env variables and cli arguments
- Changed the way the endpoint is being configured

###### V0.1.1

- Made "response with a specific file" feature configurable

##### TODO

- Test web socket proxy 
- Make `/api` prefix of the endpoint configurable
- Add support for other front-end web socket clients except socket.io