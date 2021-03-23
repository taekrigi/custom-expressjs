const http = require('http')
const middleware = require('./middleware')
const request = require('./request')
const response = require('./response')
const { HttpMethod } = require('./Constants')

const application = () => {
  const _middleware = middleware()

  const _server = http.createServer((req, res) => {
    _middleware.run(request(req), response(res))
  })

  const _requestMapping = (method) => (path, callback) => {
    callback._method = method
    use(path, callback)
  }

  const use = (pathOrFunc, callback) => {
    if (typeof pathOrFunc === 'function') {
      callback = pathOrFunc
    } else if (typeof pathOrFunc === 'string') {
      callback._path = pathOrFunc
    }

    _middleware.add(callback)
  }

  const listen = (port = 3000, callback) => {
    _server.listen(port)
    callback()
  }

  return {
    listen,
    use,
    get: _requestMapping(HttpMethod.GET),
    post: _requestMapping(HttpMethod.POST),
    put: _requestMapping(HttpMethod.PUT),
    delete: _requestMapping(HttpMethod.DELETE),
  }
}

application.bodyParser = require('./middlewares/bodyParser')
application.static = require('./middlewares/static')

module.exports = application
