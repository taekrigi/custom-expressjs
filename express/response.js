const response = (res) => {

  res.send = res.send || (text => {
    if (!res.getHeader('Content-type')) {
      res.setHeader('Content-type', 'text/plain')
    }
    res.end(text);
  })

  res.json = res.json || (data => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  })

  return res
}

module.exports = response;