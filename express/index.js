const http = require('http');
const middleware = require('./middleware')
const request = require('./request')
const response = require('./response')

const application = () => {
  const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  }

  const _middleware = middleware();

  const _server = http.createServer((req, res) => {
    _middleware.run(request(req), response(res));
  });

  const use = (pathOrFunc, callback) => {
     if (callback) callback._path = pathOrFunc
    _middleware.add(callback)
  }

  const get = (path, callback) => {
    callback._method = HttpMethod.GET;
    use(path, callback)
  }

  const post = (path, callback) => {
    callback._method = HttpMethod.POST;
    use(path, callback)
  }

  const listen = (port = 3000, callback) => {
    _server.listen(port);
    callback()
  }

  return {
    listen,
    get,
    post
  }
}

module.exports = application;