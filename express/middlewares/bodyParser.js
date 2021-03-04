const { Header, ContentType } = require('../Constants')

const bodyParser = () => (req, res, next) => {
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
      req.body = bodyString
        .split('Content-Disposition: form-data; name=')
        .slice(1)
        .reduce((acc, cur) => {
          const [key, value] = cur
            .replace(/-+\w+-*/gm, '')
            .split('\r\n')
            .filter(Boolean)
          acc[key.replace(/"/g, '')] = value
          return acc
        }, {})
    }

    next()
  })
}

module.exports = bodyParser
