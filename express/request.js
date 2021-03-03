const { Header } = require('./Constants')

const request = (req) => {
  req.path = req.url.split('?')[0]
  req.query = (() => {
    const query = req.path.split('/')[1]
    return (
      query &&
      query.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        acc[key] = value
        return acc
      }, {})
    )
  })()

  req.params = null

  req.body = null

  return req
}

module.exports = request
