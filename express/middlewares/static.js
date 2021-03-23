const path = require('path')
const fs = require('fs')

const mimeTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.eot': 'aplication/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt',
}

const static = (root = 'public') => (req, res, next) => {
  const ext = path.parse(req.url).ext

  const mimeType = mimeTypes[ext]

  if (!mimeType) {
    next()
    return
  }

  res.contentType = mimeType

  fs.readFile(`${root}${req.url}`, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.send('Not found')
    } else {
      res.statusCode = 200
      res.setHeader('Content-Type', mimeType)
      res.send(data)
    }
  })
}

module.exports = static
