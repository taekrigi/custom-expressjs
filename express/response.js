const { Header, ContentType } = require('./Constants')

const response = (res) => {
  res.send = res.send || (text => {
    if (!res.getHeader(Header.ContentType)) {
      res.setHeader(Header.ContentType, ContentType.Text)
    }
    res.end(text);
  })

  res.json = res.json || (data => {
    res.setHeader(Header.ContentType, ContentType.Json)
    res.end(JSON.stringify(data))
  })

  return res
}

module.exports = response;