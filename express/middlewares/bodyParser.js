const { Header, ContentType } = require('../Constants')

const bodyParsr = () => (req, res, next) => {
  const contentType = req.headers[Header.ContentType]

  const body = []

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  req.on('end', () => {
    const bodyString = Buffer.concat(body).toString()

    if (contentType.includes(ContentType.xxxForm)) {
      req.body = bodyString.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        acc[key] = value
        return acc
      }, {})
    } else if (contentType.includes(ContentType.Json)) {
      req.body = JSON.parse(bodyString)
    } else if (contentType.includes(ContentType.formData)) {
      // TODO
    }

    next()
  })
}

module.exports = bodyParsr
