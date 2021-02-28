const middleware = () => {
  const _middlewares = []

  const add = callback => {
    _middlewares.push(callback)
  }

  const run = (req, res) => {
    _run(req, res)(0)
  }

  const _run = (req, res) => {
    return i => {
      if (i < 0 || i >= _middlewares.length) return
      const currentMW = _middlewares[i]
      const nextMW = _middlewares[i + 1] || null

      if (currentMW._path) {
        const pathMatched = req.url === currentMW._path && 
              req.method.toUpperCase() === currentMW._method || 'GET';
        return pathMatched ? currentMW(res, res, nextMW) : _run(req, res)(i + 1);
      }

      currentMW(req, res, nextMW);
    }
  }

  return {
    add,
    run
  }
}

module.exports = middleware