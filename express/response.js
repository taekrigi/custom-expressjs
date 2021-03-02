const { Header, ContentType } = require('./Constants')

const response = (res) => {
  res.send = res.send || (text => {
    if (!res.getHeader(Header.ContentType)) {
      res.setHeader(Header.ContentType, ContentType.Html)
    }
    res.end(text);
  });

  res.json = res.json || (data => {
    res.setHeader(Header.ContentType, ContentType.Json)
    res.end(JSON.stringify(data))
  });

  res.status = res.status || (code => {
    res.statusCode = code;
    return res;
  })

  return res
}

module.exports = response;